const helmet = require('helmet');
const spdy = require('spdy');
const https = require('https');
const force_https = require('express-force-https');
const bodyParser = require('body-parser');
const fs = require('fs');

class ServerManager{

    constructor(){}

    createServer(app){
        // Body parser
        
        app.use(bodyParser.json()); // support json encoded bodies
        app.use(force_https);
        app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

        // Security configs
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
        key: fs.readFileSync("./certificates/key.pem", "utf8"),
        cert: fs.readFileSync("./certificates/cert.pem", "utf8")
        };

        const secureServer = spdy.createServer(options, app);
        secureServer.listen(httpsPort, () => {
            console.log(">> CentraliZr listening at port "+httpsPort);
        });
    }
}

exports.ServerManager = ServerManager;