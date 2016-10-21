var express = require('express')
var app = express();

//app.enable('trust proxy')

app.get('/whoami', function(request,response){
    var ip = (request.headers["X-Forwarded-For"] ||
            request.headers["x-forwarded-for"] ||
            '').split(',')[0] ||
           request.client.remoteAddress;
    
    var language =request.headers["accept-language"]
    if(language){
        language = language.split(',')[0]
    } else {
        language = "";
    }
    
    var system = request.headers["user-agent"];
    
    if(system){
        system = system.split('(')[1].split(')')[0]
    } else {
        system = "";
    }
    
    response.send(JSON.stringify({ipaddress:ip , language: language , 'system' : system}))
    //response.send(JSON.stringify(request.headers))
})

app.listen(3000, function(){
    console.log('listen port 3000')
})