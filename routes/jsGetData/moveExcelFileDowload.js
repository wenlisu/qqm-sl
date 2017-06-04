// it uses in the same partion for moving file.

var fs = require('fs');

function moveExcelFile(source_file, dest_file) {
	
	if(fs.existsSync(source_file)){
	  console.log(source_file + " exists");
	} else {
	  console.log(source_file + " doesn't exists");
	}
	fs.renameSync(source_file, dest_file);
	if(fs.existsSync(dest_file)){
	  console.log(dest_file + " exists");
	  console.log("success to moveExcelFile")
	} else {
	  console.log(dest_file + " doesn't exists");
	  console.log("failed to moveExcelFile");
	}
}

exports.moveExcelFile = moveExcelFile;
