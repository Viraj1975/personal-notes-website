import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        const uploadPath = path.join(process.cwd(),"public","temp");
        cb(null, uploadPath);
    },
    filename: (req,file,cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null,file.fieldname + "-" + uniqueSuffix + ext);
    }
});

export const upload = multer({storage});
