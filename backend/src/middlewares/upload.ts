import multer from "multer";
import crypto from "node:crypto";

const upload = multer({

    // storage type
  storage: multer.diskStorage({
    // storage destination
    destination: "./src/uploads",

    // filename
    filename: (req, file, cb) => {
      cb(null, `${crypto.randomUUID()}-${file.originalname}`);
    },
  }),

    //   limit file size to 100mb
  limits: {
    fileSize: 100 * 1024 * 1024,
  },

    //   check for only csv/xlsx files
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "text/csv",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only CSV and XLSX files are allowed"));
    }

    cb(null, true);
  },
});

export default upload;