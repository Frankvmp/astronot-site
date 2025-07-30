// src/helpers/images.mjs
import imageType from "image-type";
import crypto from "crypto";
import fs from "fs";

const IMAGE_PATH = `src/images/posts`;

// This function is now browser-safe
export async function postImageImport(imageFileName) {
  if (!imageFileName) {
    console.warn("No image file name provided, skipping import.");
    return;
  }
  // Re-implement path.parse using browser-safe string manipulation
  const lastDotIndex = imageFileName.lastIndexOf('.');
  const lastSlashIndex = imageFileName.lastIndexOf('/');
  const name = imageFileName.substring(lastSlashIndex + 1, lastDotIndex);
  const ext = imageFileName.substring(lastDotIndex);

  if (!name) {
    console.warn("No image, skipping", imageFileName);
    return;
  }

  switch (ext) {
    case ".webp":
      return await import(`../images/posts/${name}.webp`);
    case ".jpg":
      return await import(`../images/posts/${name}.jpg`);
    case ".png":
      return await import(`../images/posts/${name}.png`);
    case ".svg":
      return await import(`../images/posts/${name}.svg`);
    case ".gif":
      return await import(`../images/posts/${name}.gif`);
    case ".avif":
      return await import(`../images/posts/${name}.avif`);
    case ".jpeg":
      return await import(`../images/posts/${name}.jpeg`);
    case ".bmp":
      return await import(`../images/posts/${name}.bmp`);
    default:
      return await import(`../images/posts/${name}.jpg`);
  }
}

// These functions are server-side only and are not imported by components
export function hashString(data) {
  const hash = crypto.createHash("sha256");
  hash.update(data);
  return hash.digest("hex");
}

export async function downloadImage(
  imageUrl,
  {
    isCover = false,
  },
) {
  const response = await fetch(imageUrl);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const { ext, mime } = await imageType(buffer);

  const fileHash = hashString(imageUrl);
  const fileName = `${process.cwd()}/${IMAGE_PATH}/${fileHash}${isCover ? "-cover" : ""
    }.${ext}`;
  console.info("Hashed Filename:", fileName);

  fs.writeFileSync(fileName, buffer);
  console.info(`Image downloaded to ${fileName}`, mime);

  return fileName;
}