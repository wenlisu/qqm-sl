var xlsx = require('node-xlsx');
var fs = require('fs');


function writeExcel(dataArray, excelName, sheetName) {
	var name = excelName + ".xlsx"
	var buffer = xlsx.build([{name: sheetName, data: dataArray}]);
	fs.writeFileSync(name, buffer, 'binary');
}

exports.writeExcel = writeExcel;
