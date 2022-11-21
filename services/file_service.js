let { writeFile } = require('fs');

/**
 * 
 * @param {*} filePath : where to save the file
 * @param {*} data : file data
 * @param {*} dataType :data type
 * @returns 
 */
async function writeFileToDisk(filePath, data, dataType) {
  return new Promise((res, rej) => { 
    writeFile(filePath, data, dataType, (err) => {
      if(err) {
        return rej(err);;
      }
      res();
    });
  });
}

module.exports = {
  writeFileToDisk,
}