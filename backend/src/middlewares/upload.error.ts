import multer from "multer";
import type { Request, Response, NextFunction } from "express";

export const uploadError = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Any Multer-generated error
  if (err instanceof multer.MulterError) {
    console.error("[MULTER ERROR]", {
      code: err.code,
      message: err.message,
      field: err.field,
      path: req.path,
      method: req.method,
    });

    switch (err.code) {
        case "LIMIT_FILE_SIZE":
        // File size error
        return res.status(413).json({
          message: "File size cannot exceed 100 MB",
        });

        case "LIMIT_UNEXPECTED_FILE":
        // File type error
        return res.status(400).json({
          message: "Unexpected file field",
        });

      default:
        // Any other MulterError that we haven't explicitly handled
        return res.status(400).json({
          message: "File upload failed",
        });
    }
  }

  // Errors created by our own fileFilter, etc.
  if (err instanceof Error) {
    console.error("[UPLOAD ERROR]", {
      message: err.message,
      stack: err.stack,
      path: req.path,
      method: req.method,
    });

    return res.status(400).json({
      message: err.message,
    });
  }

  next(err);
};