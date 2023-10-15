const http = require("http");
const fs = require("fs");
var requests=require("requests");
const homefile = fs.readFileSync("home.html","utf-8");

const replace=(tempfile, originFile) => {
    let temprature=tempfile.replace("{%temp%}",originFile.main.temp);
    temprature=temprature.replace("{%temp_min%}",originFile.main.temp_min);
    temprature=temprature.replace("{%temp_max%}",originFile.main.temp_max);
    temprature=temprature.replace("{%City%}",originFile.name);
    temprature=temprature.replace("{%Country%}",originFile.sys.country);
    temprature = temprature.replace("{%tempstatus%}", originFile.weather[0].main);
    return temprature;
};


const server=http.createServer((req,res)=>{
    if(req.url = "/")
    {
                    requests('https://api.openweathermap.org/data/2.5/weather?q=Mumbai&appid={API_KEY}&units=metric')
            .on('data', (chunk) => {
                console.log(chunk);
            const objData = JSON.parse(chunk);
            const arryObj=[objData];
            //console.log(arryObj[0].main.temp);
            const realtimeData=arryObj.map((val) => replace(homefile,val)).join(" ");
            //console.log(realtimeData);
            res.write(realtimeData);
            })
            .on('end', (err) => {
            if (err) return console.log('connection closed due to errors', err);
            res.end();
            console.log('end');
            });
        
    }
    else{

    }
})
server.listen(8000);
