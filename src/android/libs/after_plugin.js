
module.exports = function(context) {
	var fs = require('fs');
	var path = require('path');
	var lazy = require("lazy");

	var rootDir = process.cwd();
	var src = path.join(__dirname, 'settings.gradle');
	var dest = path.join(rootDir, 'platforms/android/settings.gradle');

	fs.createReadStream(src).pipe(fs.createWriteStream(dest));

	var line_number = 1;
	var buildFile = path.join(rootDir, 'platforms/android/build.gradle');
 	new lazy(fs.createReadStream(buildFile))
     	.lines
     	.forEach(function(line){
         	if (line.toString().indexOf('// SUB-PROJECT DEPENDENCIES END') > -1) {
				var data = fs.readFileSync(buildFile).toString().split("\n");
				data.splice(line_number + 0, 0, "    compile project(':dconnect-device-plugin-sdk')");
				data.splice(line_number + 1, 0, "    compile project(':dconnect-server-nano-httpd')");

				data.splice(line_number - 8, 0, "    }");
				data.splice(line_number - 8, 0, "        exclude 'META-INF/notice.txt'");
				data.splice(line_number - 8, 0, "        exclude 'META-INF/NOTICE.txt'");
				data.splice(line_number - 8, 0, "        exclude 'META-INF/NOTICE'");
				data.splice(line_number - 8, 0, "    packagingOptions {");

				var text = data.join("\n");
				fs.writeFile(buildFile, text);
         	}
         	line_number++;
     	}
 	);
}