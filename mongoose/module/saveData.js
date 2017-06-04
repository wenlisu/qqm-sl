
var mongoose = require('mongoose');
var monitor_per_hour_schema = require('./monitor_per_hour_schema');
    mongoose.connect('mongodb://192.168.2.166/monitorperhour');
var db = mongoose.connection;

// var timeout_ms = 1000*30; // 60*5 second

db.on('error', console.error.bind(console, 'connection error:'));

monitorPerHour = db.model('perHours', monitor_per_hour_schema.monitorPerHourSchema);

// var monitor_line_data = ["2016-07-20 02:00:00", 1232, 562, 502, 1002, 90021, 8888892 ];

function save(monitor_line_data){
    var monitor_ob = {
    	date: monitor_line_data[0],
        registerUser: monitor_line_data[1],
        repeateLoanUser: monitor_line_data[2],
        firstLoanUser: monitor_line_data[3],
        lentUser: monitor_line_data[4],
        loanAmount: monitor_line_data[5],
        repayment: monitor_line_data[6]
    }
    
    
    var entity = new monitorPerHour({
    	date: monitor_ob.date,
    	registerUser: monitor_ob.registerUser,
        repeateLoanUser: monitor_ob.repeateLoanUser,
        firstLoanUser: monitor_ob.firstLoanUser,
        lentUser: monitor_ob.lentUser,
        loanAmount: monitor_ob.loanAmount,
        repayment: monitor_ob.repayment
    });
    
    findOne(monitorPerHour, monitor_ob.date, entity);
    
    // monitorPerHour.create(entity, function(error, doc){
    // 	if (error) {
    // 		console.log(error);
    // 	} else {
    // 		console.log('save ok');
    // 		console.log(doc);
    // 	}
    // 	// db.close();
    //     // setTimeout(function() {
    //     //    db.close();
    //     // }, timeout_ms);

    // });
};


function findOne(model, date_str, entity){
    var criteria = {date: new Date(date_str)};
    var fields = {date: 1, registerUser: 1, repeateLoanUser: 1, firstLoanUser: 1, lentUser: 1};
    var options = {};
    model.findOne(criteria, fields, options, function(error, data) {
            if(data == null) {
                model.create(entity, function(error, doc) {
                   if (error) {
                       console.log(error);
                   } else {
                       console.log('save ok');
                       console.log(doc);
                   }

                 });        
            } else if(data.registerUser != entity.registerUser || data.repeateLoanUser != entity.repeateLoanUser || data.firstLoanUser != entity.firstLoanUser || data.lentUser != entity.lentUser) {
                var conditions = {date : new Date(date_str)};
                var update     = {$set : {repayment: entity.repayment, loanAmount: entity.loanAmount, lentUser: entity.lentUser, firstLoanUser: entity.firstLoanUser, repeateLoanUser: entity.repeateLoanUser, registerUser: entity.registerUser}};
                var options    = {_id : true};
                model.update(conditions, update, options, function(error){
                    if(error){
                        console.log(error);
                    } else {
                        console.log('update ok!');
                        console.log(data);
                    }
                });
            } else if(error) {
                console.log("error: " + date_str);
            }
//	    console.log(data);
    });
};

exports.save = save;
