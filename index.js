const fs = require('fs');
const request = require('request');
const mustache = require('mustache');
const argv = require('minimist')(process.argv.slice(2));

// TODO: Add support for command line arguments
const opts = {
  qs: {
    term: 'instagram',
    country: 'il',
    limit: '1',
    entity: 'software'
  }
}

let getJSON = new Promise((resolve, reject) => {
  request.get('https://itunes.apple.com/search', opts, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      // TODO: Make it work with multiple results
      const results = JSON.parse(body).results[0];
      resolve(results);
    }
    else reject('API request failed.');
  });
});

getJSON.then(results => {
  const template = fs.readFile('test.mustache', (err, data) => {
    if (err) throw err;
    const template = data.toString();
    console.log(results.trackViewUrl);
    const output = mustache.render(template, results);
    console.log(output);
  });
}).catch(err => console.log(err));


