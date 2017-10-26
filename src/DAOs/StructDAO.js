const DBHelper = require('../db/DBHelper').DBHelper;

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
                    conn.collection("structs").findOne({id: id}, (err,data) => {
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