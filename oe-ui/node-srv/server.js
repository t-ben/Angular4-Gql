// Trying to keep it in one file
const fs = require('fs');
const path = require('path');

const envVars = {
  render: async (vars, indexFile) => {
    const file = await envVars.loadHtml(indexFile);

    return file.replace('</title>', '</title>' + envVars.renderVars(vars));
  },
  renderVars: (vars) => {

    // Trim only variables starting with NG_
    Object
      .keys(vars)
      .filter(item => item.match(/^NG_/) === null)
      .forEach((key) => {
        delete vars[key];
      });

    return '<script type="text/javascript">var platform = { getEnvVars: function() { return ' + JSON.stringify(vars) + ' } };</script>';
  },
  loadHtml: (indexFile) => new Promise((resolve, reject) => {
    fs.readFile(path.resolve(indexFile), 'utf8', (err, content) => {
      if(err)
        reject(err);
      else
        resolve(content);
    })
  }),
};
// End of logic

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  envVars
    .render(process.env, __dirname + '/index.html')
    .then((result) => {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(result);
    })
    .catch((err) => {
      res.writeHead(500);
      res.end(err);
    });
});

app.use(express.static(__dirname + '/'));

app.listen(process.env.PORT || '3000');
