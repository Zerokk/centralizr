// External imports
const app = require('express')();
const fs = require('fs');
// Internal imports
const StructDAO = require('./src/DAOs/StructDAO').StructDAO;
const RegistryDAO = require('./src/DAOs/RegistryDAO').RegistryDAO;
const KeyManager = require('./src/utils/KeyManager').KeyManager;
const ServerManager = require('./src/utils/ServerManager').ServerManager;
// Global declarations
const server = new ServerManager(false, 3443).createServer(app);

// Routing
app.get('/', (req, res) => {
    res.sendFile(__dirname+"/welcome.html");
    
});

app.post('/login', (req, res) => {
    logConnection(req);
    const user = req.body.user;
    const pw = req.body.pw;
    console.log("received: ", user, pw)
    if(credentials.user === user && credentials.pw === pw){
        if(req.body.origin == 'navigator'){
            res.redirect("/getstructs?origin=navigator&sessionKey="+KeyManager.genSessionKey());
        }else if(req.body.origin == 'ionic'){
            res.send({key: KeyManager.genSessionKey()});
        }
        
    }
});

app.get('/getstructs', (req, res) => {
   const sessionKey = req.query.sessionKey;
   const origin = req.query.origin;

   if(sessionKey != null && KeyManager.checkSessionKey(sessionKey)){
        KeyManager.reset();
        const structDAO = new StructDAO();
        if(origin == "navigator"){
            let responseString = "<ol>";
            structDAO.fetchAll().then( data => {     
                data.map( (val,index) => {
                    const key = KeyManager.genKey(val);  // generamos y metemos las claves en el html
                    responseString += "<a href=getStruct?key="+key+"><li> - "+val.name+"   =>   "+val.description+"</li></a>"
                });
                responseString += "</ol>";
                KeyManager.emitKeys();  // emitimos las claves y hacemos que sólo se puedan usar durante un tiempo
                res.send(responseString);
            });

        }else if(origin == "ionic"){
            structDAO.fetchAll().then( data => {     
                data.map( (val,index) => {
                    val.datasets = null;
                    val.key =  KeyManager.genKey(val);  // generamos y metemos las claves en el html
                });
                KeyManager.emitKeys();  // emitimos las claves y hacemos que sólo se puedan usar durante un tiempo
                res.send(data);
            });
        }
    }
});

app.get('/getstruct', (req, res) => {
    let key = req.query.key;
    const structId = KeyManager.check(key);
    if(structId){
        KeyManager.reset();
        const structDAO = new StructDAO();
        const registryDAO = new RegistryDAO();
        structDAO.getStruct(structId)
            .then(struct => {
                registryDAO.fetchForStruct(structId, 0).then( registries => {
                    if(registries){
                        res.send({struct: struct, data: registries});
                    }else{
                        res.send({struct: struct, data: "empty"});
                    }
                }).catch( err => {
                    res.send({struct: struct, err: err});    
                });
            }).catch( err => res.send({err: err}));

    }else{ // nos han enviado una clave inválida
        res.send("ERROR: Has enviado una clave incorrecta");
    }
 
 });
/*   TODO

 app.get("/getregistries", (req, res) => {
    let struct = req.query.struct;
    let page = req.query.page | 0;


 });
*/
 app.post("/insertregistry", (req, res) => {

     const structId =  req.body.id;
     const results = req.body.results;
     const isValid = validate(structId, results).then( isValid => {
        if(isValid==true){
            const registryDAO = new RegistryDAO();
            console.log("Inserting...")
            registryDAO.insert(structId, results).then( r => {
                if(r == true){
                    res.send('{"status":"success"}');
                }
            });
         }
     });
 });

  function validate(structId, results){
      return new Promise( (resolve, reject) => { 
        const structDAO = new StructDAO();
        structDAO.getStruct(structId).then ( struct => {
                let count = 0;
                struct.datasets.map(dataset => {
                    let value = results[dataset.varName];
                        switch(dataset.type){
                            case "number":
                                if(!isNaN(value)) count++;
                            case "text":
                                if(isNaN(value)) count++;
                        }
                });
        
                if(count == struct.datasets.length){
                    resolve(true)
                }else{
                    resolve(false);
                }
        
        }).catch(err => console.log("ERR: ", err));
    });
 }


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
