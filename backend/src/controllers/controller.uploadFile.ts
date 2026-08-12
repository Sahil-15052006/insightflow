import type { Request, Response } from "express";
import {uploadfile} from "../services/services.dataset.js";
import { DatasetFileType,DatasetStatus } from "../../generated/prisma/enums.js";

export const uploadFile = async(req: Request, res: Response) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({
      message: "No file uploaded",
    });
  }

  console.log(file);

  const fileType:DatasetFileType = file.mimetype=="text/csv" ? DatasetFileType.CSV : DatasetFileType.XLSX;

  const uploadedFile = await uploadfile(file.filename,file.originalname,fileType);

  return res.status(201).json({
    fileId:uploadedFile,
    message: "File uploaded successfully",
  });
};