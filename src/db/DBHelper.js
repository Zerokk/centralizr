const MongoClient = require('mongodb').MongoClient


// 
// DB DATA  =>   Atlas: https://cloud.mongodb.com/v2/59f0d7c3d383ad4cb988c967#clusters
// Email: zerok123@gmail.com
// PW: punto, seguido de la pw decente
class DBHelper {

    constructor(){
        this.MONGO_PW = "ybQlW3QCayC20lxA";
        this.MONGO_URL = "mongodb://zerok:"+this.MONGO_PW+"@cluster0-shard-00-00-qmozr.mongodb.net:27017,cluster0-shard-00-01-qmozr.mongodb.net:27017,cluster0-shard-00-02-qmozr.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin"
        this.connection = null;
    }


 connect(){
    console.log("# DBHelper -> connect()");
    return new Promise((resolve, reject) => {
        MongoClient.connect(this.MONGO_URL, (err, connection) => {
            if(!err){
                console.log("# DBHelper -> retrieving connection");
                this.connection = connection;
                resolve(connection);
            }else{
                console.log(">> DBHelper (Connect) Err => ", err);
                this.connection = connection;
                reject(err);
            }
        });
   });
 }

 closeConn(){
    if(this.connection){
        try{
            this.connection.close();
        }catch(err){
            console.log(">> DBHelper (closeConn) Err => ", err);
        }
    }else{
        console.log(">> DBHelper (closeConn) INFO => no connection open to be closed.");
    }
 }


/* Nota: el struct ya está insertado, pero dejo el código para recordar cómo es. Falta por hacer para pedir structs.
MongoClient.connect(mongoURL, (err, db) => {
    if (err) throw err;
    var myobj = { name: "Company Inc", address: "Highway 37" };
    db.collection("structs").insertOne(datastructs[0], (err, res) => {
      if (err) throw err;
      console.log("struct insertado");
      db.close();
    });
})
*/
}

exports.DBHelper = DBHelper;