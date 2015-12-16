
module.exports = function(context) {
	var fs = require('fs');
	var path = require('path');

	var rootDir = process.cwd();
	var src = path.join(__dirname, 'build-extras.gradle');
	var dest = path.join(rootDir, 'platforms/android/build-extras.gradle');

	fs.createReadStream(src).pipe(fs.createWriteStream(dest));

}