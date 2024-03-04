const request = require('request');
const fs = require('fs');

function fetcher(url, filePath, callback) {
  const options = {
    url: url,
    encoding: null,
  };

  request.get(options, (error, response, body) => {
    if (error) {
      callback(`error making request: ${error.message}`)
      return;
    }

    const stats = `${response.headers['content-length']} bytes`


    fs.writeFile(filePath, body, (err) => {
      if (err) {
        callback(`Error writing to file: ${err.message}`)
        return;
      }

    callback(null, `Downloaded and saved ${stats} to ${filePath}`);
    });
  });
};

const [, , url, filePath] = process.argv;

// Check if both URL and file path are provided
if (!url || !filePath) {
  console.error('Usage: node fetcher.js <URL> <file-path>');
} else {
  // Call the fetcher function with the provided URL and file path
  fetcher(url, filePath, (err, result) => {
    if (err) {
      console.error('Error:', err);
    } else {
      console.log(result);
    }
  });
}

