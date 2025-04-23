import {Router} from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverImage
} from "../controllers/user.controller.js";

import {upload} from "../middlewares/multer.middleware.js";
import {veriftyJWT} from "../middlewares/auth.middleware.js";

const router = Router();

// to Register a new user
router.route("/register").post(
    upload.fields([
        {name: "avatar",maxCount: 1},
        {name: "coverImage",maxCount: 1}
    ]),
    registerUser
);

// for Login & Logout
router.route("/login").post(loginUser);
router.route("/logout").post(veriftyJWT, logoutUser);

// Token operations
router.route("/refresh-token").post(refreshAccessToken);

// User profile operations
router.route("/current-user").get(veriftyJWT,getCurrentUser);
router.route("/change-password").post(veriftyJWT,changeCurrentPassword);
router.route("/update-account").patch(veriftyJWT,updateAccountDetails);
router.route("/avatar").patch(veriftyJWT,upload.single("avatar"),updateUserAvatar);
router.route("/cover-image").patch(veriftyJWT,upload.single("coverImage"),updateUserCoverImage);

export default router;
