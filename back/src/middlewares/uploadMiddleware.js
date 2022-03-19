import { multer } from "multer";

async function uploadMiddleware(req, res, next) {
  let storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "../../images");
    },
    filename: (req, file, callback) => {
      callback(null, file.originalname + Date.now());
    },
  });

  let upload = multer({ storage: storage }).single("file");

  module.exports = upload;

  next();
}
