var http = require('http');
var num = 0;
var info = {"secret": "This isn't a thing", "other": "other"};
http.createServer((request, response) => {
  if(request.method === "POST"){
    let body = [];
    request.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      num += 1;
      body = Buffer.concat(body).toString();
      body = JSON.parse(body);
      if(body.password === "secretPassword"){
        response.end(JSON.stringify({"sequentialId": num.toString(), "secretInfo": info}));
      } else {
        response.end(JSON.stringify({"sequentialId": num.toString(), "secretInfo": "Incorrect Passcode"}));
      }
    });
  }
}).listen(8080);
