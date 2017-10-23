const app = require('express')();
const helmet = require('helmet');
const fs = require('fs');
const https = require('https');

// Body parser
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(helmet());
app.disable('x-powered-by');
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// Setup HTTPS
const httpsPort = 3443;
const options = {
  key: fs.readFileSync("./key.pem", "utf8"),
  cert: fs.readFileSync("./cert.pem", "utf8")
};

console.log("KEY: ", options.key)
console.log("CERT: ", options.cert)

var secureServer = https.createServer(options, app).listen(httpsPort, () => {
    console.log(">> CentraliZr listening at port "+httpsPort);
});


// Hooks
app.get('/get_struct', (req, res) => {
    console.log("work")
    const requested = req.query.struct;
    const struct = datastructs.filter(val => {
        if(val.id == requested){
            return val;
        }
    });
    res.send(struct);
});

app.post('/fetch_structs', (req, res) => {
    
    
});


app.post('/login', (req, res) => {
    
    const user = req.body.user;
    const pw = req.body.pw;
    console.log("received: ", user, pw)
    if(credentials.user === user && credentials.pw === pw){

        res.send({"response":"Logged in"});
    }
});

const credentials = {
    user: "Zerok",
    pw: "123asd"
}

const datastructs = [
    {
        id: 1,
        name: "Ejercicio",
        description: "Set de datos para seguir tu avance en el ejercicio.",
        datasets: [
            repetitions = {
                type: "number",
                varName: "Repeticiones por serie",
                minVal: 0,
                maxVal: 100
            },
            exercise = {
                type: "text",
                varName: "Ejercicio"
            },
            series = {
                type: "number",
                varName: "Series realizadas",
                minVal: 0,
                maxVal: 10
            }
        ]   
    }
]