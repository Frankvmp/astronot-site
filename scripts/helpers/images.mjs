// src/helpers/images.mjs

import imageType from "image-type";
import crypto from "crypto";
import fs from "fs";

const IMAGE_PATH = `src/images/posts`;

export function hashString(data) {
  const hash = crypto.createHash("sha256");
  hash.update(data);
  return hash.digest("hex");
}

export async function downloadImage(
  imageUrl,
  {
    isCover = false, // Notion Cover image, displays at top of posts
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