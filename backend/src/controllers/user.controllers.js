import asyncHandler from "../utils/asyncHandler.js";
import APIResponse from "../utils/APIResponse.js";
import APIError from "../utils/APIError.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {uploadOnCloudinary} from "../utils/cloudinary.js";

// REGISTER
const registerUser = asyncHandler(async (req,res) => {
    const {fullName,email,username,password} = req.body;

    if(!fullName || !email || !username || !password){
        throw new APIError(400, "All fields are required.");
    }

    const existingUser = await User.findOne({
        $or: [{email},{username}],
    });

    if(existingUser){
        throw new APIError(409, "User with email or username already exists.");
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const newUser = await User.create({
        fullName,
        email,
        username,
        password: hashedPassword,
    });

    const {password: _,...userData} = newUser.toObject();

    return res
        .status(201)
        .json(new APIResponse(201,userData,"User registered successfully."));
});

// LOGIN
const loginUser = asyncHandler(async (req,res) => {
    const {usernameOrEmail,password} = req.body;

    if(!usernameOrEmail || !password){
        throw new APIError(400, "All fields are required.");
    }

    const user = await User.findOne({
        $or: [{email: usernameOrEmail},{username: usernameOrEmail}],
    });

    if(!user){
        throw new APIError(404, "User not found.");
    }

    const isPasswordValid = await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
        throw new APIError(401,"Invalid credentials.");
    }

    const accessToken = jwt.sign(
        {userId: user._id},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "15m"}
    );

    const refreshToken = jwt.sign(
        {userId: user._id},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: "7d"}
    );

    user.refreshToken = refreshToken;
    await user.save({validateBeforeSave: false});

    const {password: _,refreshToken: __,...userData} = user.toObject();

    res
    .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json(
        new APIResponse(200,{user: userData,accessToken},"Login successful.")
    );
});

// LOGOUT
const logoutUser = asyncHandler(async (req,res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {$unset: {refreshToken: 1}},
        {new: true}
    );

    res.clearCookie("refreshToken");
    return res
        .status(200)
        .json(new APIResponse(200,null,"User logged out successfully."));
});

// REFRESH TOKEN
const refreshAccessToken = asyncHandler(async (req,res) => {
    const incomingToken = req.cookies.refreshToken;

    if(!incomingToken){
        throw new APIError(401, "Refresh token missing.");
    }

    const decoded = jwt.verify(incomingToken,process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(decoded.userId);
    if(!user || user.refreshToken!==incomingToken){
        throw new APIError(401, "Invalid refresh token.");
    }

    const accessToken = jwt.sign(
        {userId: user._id},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "15m"}
    );

    return res
        .status(200)
        .json(new APIResponse(200,{accessToken},"Access token refreshed."));
});

// CURRENT USER
const getCurrentUser = asyncHandler(async (req,res) => {
    const user = await User.findById(req.user._id).select("-password -refreshToken");
    return res
        .status(200)
        .json(new APIResponse(200,user,"Current user fetched."));
});

// UPDATE AVATAR
const updateAvatar = asyncHandler(async (req,res) => {
    const avatarPath = req.files?.avatar?.[0]?.path;
    if(!avatarPath){
        throw new APIError(400,"Avatar file is required.");
    }

    const avatar = await uploadOnCloudinary(avatarPath);
    if(!avatar?.url){
        throw new APIError(400,"Failed to upload avatar.");
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {avatar: avatar.url},
        {new: true}
    ).select("-password -refreshToken");

    return res
        .status(200)
        .json(new APIResponse(200,user,"Avatar updated successfully."));
});

// EXPORT
export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    getCurrentUser,
    updateAvatar,
};
