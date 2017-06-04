
var moment = require('./module/moment');
var writeExcel = require('../routes/jsGetData/formExcel');
var moveExcel = require('../routes/jsGetData/moveExcelFileDowload');
var LinkMongodb = require('./module/linkMongodb');
var mongodbInfor = {
	'host': '192.168.1.139',
	'port':  '27017',
	'database': 'monitorperhour'

};
var connectDb = new LinkMongodb(mongodbInfor);
var db = connectDb.connect();
var monitor_per_hour_schema = require('./module/monitor_per_hour_schema');
var monitorPerHour = db.model('perHours', monitor_per_hour_schema.monitorPerHourSchema);

// console.log(db);


function getResultByFindDate(objDate, res, response, download){
	    
	var dt = {
		t0: String(objDate.date0),
		t1: String(objDate.date1),
	};
	var conditions = {date:{$gte: new Date(dt.t0), $lte: new Date(dt.t1)}};
	monitorPerHour.find(conditions).sort({date: 1}).exec( function(err, data){
		if(err){
	 		console.log(err);
		} else {
  		    var str1 = " ";
		    var strArr = new Array();
		    var dateArray = new Array();
		    var regUserArray = new Array();
		    var repUserArray = new Array();
		    var fiRUserArray = new Array();
		    var loanUserArray = new Array();
		    var loanAmountArray = new Array();
		    var loanRepayArray  = new Array();
           
            // query data normally.
		    if(!download) {
		        var resultJson = {};
           
		        for(var i=0;i<data.length; i++) {
			       var arr0 = moment(data[i].date).format("YYYY-MM-DD HH:mm:ss");
			       dateArray.push(arr0);
			       regUserArray.push(data[i].registerUser);
			       repUserArray.push(data[i].repeateLoanUser);
			       fiRUserArray.push(data[i].firstLoanUser);
			       loanUserArray.push(data[i].lentUser);
			       loanAmountArray.push(data[i].loanAmount);
			       loanRepayArray.push(data[i].repayment);
			       strArr[i] = "<tr id='appendTd'>" + 
			    		 "<td align=center>" + arr0   + "</td>" + 
			    		 "<td align=center>" + data[i].registerUser + "</td>" +
			    		 "<td align=center>" + data[i].repeateLoanUser + "</td>" +
			    		 "<td align=center>" + data[i].firstLoanUser + "</td>" +
			    		 "<td align=center>" + data[i].lentUser + "</td>" +
			    		 "<td align=center>" + data[i].loanAmount + "</td>" +
			    		 "<td align=center>" + data[i].repayment + "</td>" +                                
			    	       "</tr>"
    
			       str1 = str1 + String(strArr[i]);
		        }
    
		        var resultJson = {
		                formData: str1,
		                picDate:  dateArray,
		                picReg:   regUserArray,
		                picRep:   repUserArray,
		                picFir:   fiRUserArray,
		                picLoa:   loanUserArray,
		                picLom:   loanAmountArray,
		                picRey:   loanRepayArray
		         }

		        var resultJson = JSON.stringify(resultJson);
		        console.log(resultJson);
		        response(resultJson, res);
		    }

            // excute download and write excel data, move excel file to ../public/download
		    if(download){
		    	var resultArray = [];
		     	var titleArray = ["小时粒度", "注册用户", "重复申请用户", "首次申请用户", "放款用户","放款总额","还款总额"];
		        var name = moment(new Date()).format("YYYY-MM-DD_HH:mm:ss");

		        resultArray.push(titleArray);
		     	for(var j=0; j<data.length;j++){
		     		var changeArr = [];
		     		var changArr0 = moment(data[j].date).format("YYYY-MM-DD HH:mm:ss");
		     		changeArr.push(changArr0);
		     		changeArr.push(data[j].registerUser);
		     		changeArr.push(data[j].repeateLoanUser);
		     		changeArr.push(data[j].firstLoanUser);
		     		changeArr.push(data[j].lentUser);
		     		changeArr.push(data[j].loanAmount);
		     		changeArr.push(data[j].repayment);
		     		resultArray.push(changeArr);
		     	}
			    var sheetName = "缺钱么性能数据" + name;
		     	writeExcel.writeExcel(resultArray, name, sheetName);

		     	/*
		     	 *move excel file to ../public/download,please notice the excel file generated in the path to excute
		     	 *the process path.
		     	 *
		     	 */
		     	var source_file = process.cwd() + "/" +  name+".xlsx";
		     	var current_path_arr = String(__dirname).split('/mongoose', 1);
		     	var dest_file = current_path_arr[0] + "/public/download" + "/" + name + ".xlsx";
		     	moveExcel.moveExcelFile(source_file, dest_file);
		     	response("/download" + "/" + name + ".xlsx", res);
		     }
		     // console.log(dt);
		}
	
	});
};

exports.getResultByFindDate = getResultByFindDate;
