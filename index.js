const fs = require('fs');
const mustache = require('mustache');
const searchItunes = require('searchitunes');
const argv = require('minimist')(process.argv.slice(2));

const opts = argv;

// Query the itunes API
searchItunes(opts, (err, data) => {
  if (err) throw err;
  const result = data.results[0];

  // Use first result to render template
  const template = fs.readFile('test.mustache', (err, data) => {
    if (err) throw err;
    const template = data.toString();
    console.log(result.trackViewUrl);
    const output = mustache.render(template, result);
    console.log(output);
  });
})
