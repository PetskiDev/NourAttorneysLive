import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "8MB", maxFileCount: 10 } })
    // Add auth here if needed via .middleware
    .onUploadComplete(async ({ file }) => {
      // file.url is the public URL served via utfs.io
      return {
        url: file.ufsUrl,
        key: file.key,
        name: file.name,
        size: file.size,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;


