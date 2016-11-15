const fs = require('fs');
const mustache = require('mustache');
const searchItunes = require('searchitunes');
const argv = require('minimist')(process.argv.slice(2));

const opts = argv;

// Query the itunes API
searchItunes(opts, (err, data) => {
  if (err) throw err;
  // When quering the API with ID, we get a singular result object instead of a results array
  const result = data.results ? data.results[0] : data;

  // Use first result to render template
  const template = fs.readFile('test.mustache', (err, data) => {
    if (err) throw err;
    const template = data.toString();
    console.log(result.trackViewUrl);
    const output = mustache.render(template, result);
    console.log(output);
  });
})
