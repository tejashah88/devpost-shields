// Source: Modified from ChatGPT on 10/15/2024

const fs = require('fs');
const archiver = require('archiver');

// ALERT: Certain RANDOM filenames (for some reason???) will cause an infinite loop.
// Make sure to press Ctrl+C to prevent your hard drive from overflowing.
const fileName = 'aws-lambda.zip';
const output = fs.createWriteStream(fileName);
const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level.
});

output.on('close', function() {
  console.log(archive.pointer() + ' total bytes');
  console.log(`Created ${fileName}`);
});

archive.on('error', function(err) {
  throw err;
});

// Pipe archive data to the output file
archive.pipe(output);

// Append files from current directory, including node_modules
archive.directory('./', false);

// Finalize the archive
archive.finalize();
