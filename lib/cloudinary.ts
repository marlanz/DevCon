import { v2 as cloudinary } from "cloudinary";

export async function uploadToCloudinary(file: File, folder = "DevEvent") {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const result = await new Promise<{ secure_url: string }>(
    (resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ resource_type: "image", folder }, (error, result) => {
          if (error) return reject(error);
          resolve(result as { secure_url: string });
        })
        .end(buffer);
    },
  );

  return result.secure_url;
}
