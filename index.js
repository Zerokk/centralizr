// External imports
const app = require('express')();
const fs = require('fs');
// Internal imports
const StructDAO = require('./src/DAOs/StructDAO').StructDAO;
const KeyManager = require('./src/utils/KeyManager').KeyManager;
const ServerManager = require('./src/utils/ServerManager').ServerManager;
// Global declarations
const server = new ServerManager().createServer(app);

// Hooks
app.get('/', (req, res) => {
    res.sendFile(__dirname+"/welcome.html");
    
});

app.post('/login', (req, res) => {
    logConnection(req);
    const user = req.body.user;
    const pw = req.body.pw;
    console.log("received: ", user, pw)
    if(credentials.user === user && credentials.pw === pw){
        res.redirect("/getstructs?sessionkey="+KeyManager.genSessionKey());
    }
});



app.get('/getstructs', (req, res) => {
   const sessionKey = req.query.sessionkey;
   if(sessionKey != null && KeyManager.checkSessionKey(sessionKey)){
        KeyManager.reset();
        console.log("value: ", req.params.asd)
        const structDAO = new StructDAO();
        const timestamp = new Date().timestamp;
        let responseString = "<ol>";
        structDAO.fetchAll().then( data => {
            console.log("DATA: ", data);
            data.map( (val,index) => {
                const key = KeyManager.genKey(val);  // generamos y metemos las claves en el html
                responseString += "<a href=getStruct?key="+key+"><li> - "+val.name+"   =>   "+val.description+"</li></a>"
            });
            responseString += "</ol>";
            KeyManager.emitKeys();  // emitimos las claves y hacemos que sólo se puedan usar durante un tiempo
            res.send(responseString);
        });
   }
});

app.get('/getstruct', (req, res) => {
    let key = req.query.key;
    let found = false;
    const structId = KeyManager.check(key);
    if(structId){
        KeyManager.reset();
        const structDAO = new StructDAO();
        structDAO.getStruct(structId)
            .then(struct => {
                res.send(struct);
            });

    }else{ // nos han enviado una clave inválida
        res.send("ERROR: Has enviado una clave incorrecta");
    }
 
 });
/*   TODO

 app.get("/getregistries", (req, res) => {
    let struct = req.query.struct;
    let page = req.query.page | 0;


 });

 app.get("/insertregistry", (req, res) => {
    let reg = req.query.registry;
   
    

 });

*/
function logConnection(req){
    const ip = req.ip;
    const ips = req.ips;
    const wasXhr = req.xhr;
    let logString = ">> ["+new Date().toLocaleDateString()+"] => IP: +"+ip+" // ";
    if(wasXhr){
        logString += "Ajax/XMLHttpRequest";
    }else{
        logString += "Normal HTTP request";
    }
    logString += "\n";
    fs.appendFile(__dirname+"/logs/connection_logs.txt", logString);
}



const credentials = {
    user: "Zerok",
    pw: "123asd"
}
