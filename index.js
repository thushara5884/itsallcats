//mapbox/blend is severly outdated, better move to a maintained alternative library
//but in this project i will use mapbox/blend since it was the library originally used

var argv = require("minimist")(process.argv.slice(2));
let { join } = require("path");
require("dotenv").config();
const catImageService = require("./services/cat_image_sevice");
const fileService = require("./services/file_service");

let {
  text1 = "Hi",
  text2 = "You",
  width = 400,
  height = 500,
  color = "Pink",
  size = 100,
} = argv;

async function mergeAndSaveImage() {
  console.log("Fetching images in parallel...");
  try {
    const catImages = await catImageService.fetchCatImages(text1, text2, width, height, color, size);
    console.log("Successfully fetched images. merging..");
    const mergedImage = await catImageService.mergeImages(catImages, width, height);
    console.log("Merge complete. Writing to disk");
    const savePath = join(process.cwd(), process.env.SAVE_FILE_NAME);
    await fileService.writeFileToDisk(savePath, mergedImage, "binary");
    console.log(`Saved File at ${savePath}!`);
  } catch (err) {
    console.log("Error occured!", err.message);
  }
}

// root function
mergeAndSaveImage();
