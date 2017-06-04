function responseData(data, res) {
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write(data);
            res.end();
}

exports.responseData = responseData;
