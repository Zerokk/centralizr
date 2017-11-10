const DBHelper = require('../db/DBHelper').DBHelper;
const ObjectID = require('mongodb').ObjectID;
class StructDAO {

    constructor(){
        this.dbHelper = new DBHelper();
    }

    fetchAll(){
        return new Promise((resolve, reject) => {
            this.dbHelper.connect().then(conn => {
                    conn.collection("structs").find().toArray( (err,data) => {
                        if (!err){
                            this.dbHelper.closeConn();
                            resolve(data);  
                        }else{
                            console.log(">> StructDAO (fetchAll) ERROR => ", err);
                            this.dbHelper.closeConn();
                            reject(err);
                        }
                    })
            })
        })
    }

    getStruct(id){
        return new Promise((resolve, reject) => {
            this.dbHelper.connect().then(conn => {
                
                    const objId = new ObjectID(id);
                    conn.collection("structs").findOne({_id: objId}).then( (data,err) => {
                        if (!err){
                            this.dbHelper.closeConn();
                            resolve(data);  
                        }else{
                            console.log(">> StructDAO (fetchAll) ERROR => ", err);
                            this.dbHelper.closeConn();
                            reject(err);
                        }
                    }).catch( err => console.log("ERROR: ", err))
            })
        })
    }

    insert(struct){
        this.dbHelper.connect().then(conn => {
            conn.collection("structs").insertOne(struct, (err, res) => {
                if (err) throw err;
                console.log(">> struct insertado");
                this.dbHelper.closeConn();
              });
    })
    }
}

exports.StructDAO = StructDAO;