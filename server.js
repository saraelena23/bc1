/*
	server branch
*/
var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
	var parseUrl = url.parse(request.url);
	
	if (request.method === 'GET' && parseUrl.pathname === '/listings'){
		response.writeHead(200, { 'Content-Type': 'application/json' });
		response.write(listingData);
		response.end();
	}
	
	else{
		response.writeHead(404, { 'Content-Type': 'text/plain' });
		response.write('Bad gateway error');
		response.end();
	}



  /*
    Your request handler should send listingData in the JSON format if a GET request 
    is sent to the '/listings' path. Otherwise, it should send a 404 error. 

    HINT: explore the request object and its properties 
    http://stackoverflow.com/questions/17251553/nodejs-request-object-documentation
   */
};

fs.readFile('listings.json', 'utf8', function(err, data) {
	listingData=data;
	var server = http.createServer(requestHandler);//create server
	server.listen(port); //puts it in 8080
	console.log("server listening on: http://localhost:8080");
  /*
    This callback function should save the data in the listingData variable, 
    then start the server. 
   */
});
