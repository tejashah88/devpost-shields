'use strict';

const fs = require('fs');

function getLogo(file, base64) {
  return new Promise((resolve, reject) => {
    fs.readFile(
      file,
      (err, buf) => {
        if (err)
          return reject(err);

        return resolve(base64 ? buf.toString('base64') : buf);
      }
    );
  });
}

function getLogoSync(file, base64) {
  const buf = fs.readFileSync(file);
  return base64 ? buf.toString('base64') : buf;
}

module.exports = {
  getLogo,
  getLogoSync
};