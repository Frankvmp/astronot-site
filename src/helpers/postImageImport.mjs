// src/helpers/postImageImport.mjs

// IMPORTANT: This bit is required to allow dynamic importing of images via Astro & Vite
// postImageImport allows dynamically import images from local filesystem via Vite with variable names
export async function postImageImport(imageFileName) {
  // Image paths must be relative, and end with file extension to work in Vite build process
  // See https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#meta
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

  // NOTE: The path is now relative to this file's location in src/helpers/
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