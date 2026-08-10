import { Router } from "express";
import upload from "../middlewares/upload.js";
import { uploadError } from "../middlewares/upload.error.js";
import { uploadFile } from "../controllers/controller.uploadFile.js";

const router = Router();

router.post(
  "/upload",
  upload.single("file"),
  uploadError,
  uploadFile
);

export default router;