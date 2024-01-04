const fs = require('fs-extra');
const path = require('path');
const execSync = require('child_process').execSync;

function moveFile(source, destination) {
  fs.move(source, destination, { overwrite: true }, (err) => {
    if (err) return console.error(err);
    console.log(`Moved ${path.basename(source)} to ${destination}`);
  });
}

function main() {
  // Run the CRA build script
  execSync('craco build', { stdio: 'inherit' });

  // Define source and destination paths
  const buildDir = path.join(__dirname, '..', 'build', 'static');
  const widgetDir = path.join(__dirname, '..', 'widget');
  const jsSource = path.join(buildDir, 'js', 'index.js');
  const cssSource = path.join(buildDir, 'css', 'index.css');
  const jsDestination = path.join(widgetDir, 'index.js');
  const cssDestination = path.join(widgetDir, 'index.css');

  // Ensure widget directory exists
  fs.ensureDirSync(widgetDir);

  // Move the index.js and index.css files
  moveFile(jsSource, jsDestination);
  moveFile(cssSource, cssDestination);
}

main();
