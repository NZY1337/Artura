// src/middlewares/uploadMiddleware.ts
import multer from "multer";

export const uploadMiddleware = multer({
    storage: multer.memoryStorage(), limits: {
        fileSize: 10 * 1024 * 1024, // 10 MB per file
    },
});


