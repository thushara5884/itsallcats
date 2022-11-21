let blend = require('@mapbox/blend');
const axios = require("./axios_service");

/**
 * 
 * @param {*} text1 : superimpose text into image 1
 * @param {*} text2 : superimpose text into image 2
 * @param {*} width : width of the image
 * @param {*} height : height of the image
 * @param {*} color : color of the image
 * @param {*} size : size of the image
 * @returns array of 2 images
 */
async function fetchCatImages(text1, text2, width = 400, height = 500, color, size) {
  const httpConfig = { responseType:"arraybuffer", headers: { 'Content-Type': 'imgae/jpeg'}};
  const image1 = axios.get(`/cat/says/${text1}?width=${width}&height=${height}&color=${color}&s=${size}`, httpConfig);
  const image2 = axios.get(`/cat/says/${text2}?width=${width}&height=${height}&color=${color}&s=${size}`, httpConfig);

  const images = await Promise.all([image1, image2]);
  return images.map(i => i.data);
}

/**
 * 
 * @param {*} images : array of images to merge
 * @param {*} width : width of image
 * @param {*} height : height of image
 * @returns promise
 */
async function mergeImages(images, width, height) {
  // Buffer() is deprecated, so used Buffer.alloc
  const imageConfig = images.map((imageBody, i) => ({ buffer: new Buffer.from(imageBody), x: i * width, y: 0 }));
  return new Promise((res, rej) => {
    blend(imageConfig, 
      { width: width * images.length, height: height, format: 'jpeg', }, 
      (err, data) => {
          if (err) { console.log(images[0]); console.log(images[1]); return rej(err); }
          res(data);
      });
  });
}

module.exports = {
  fetchCatImages,
  mergeImages,
}