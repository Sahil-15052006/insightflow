import type { Request, Response } from "express";

export const uploadFile = (req: Request, res: Response) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({
      message: "No file uploaded",
    });
  }

  console.log(file);

  return res.status(201).json({
    message: "File uploaded successfully",
    file: {
      filename: file.filename,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      path: file.path,
    },
  });
};