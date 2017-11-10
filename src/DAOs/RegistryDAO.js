const DBHelper = require('../db/DBHelper').DBHelper;
const Registry = require('../entities/Registry').Registry;

class RegistryDAO {

    constructor(){
        this.dbHelper = new DBHelper();
    }

    fetchForStruct(structId, page){
        return new Promise((resolve, reject) => {
            this.dbHelper.connect().then(conn => {
                    conn.collection(structId+"_regs").find()
                    .skip(page*20)
                    .limit(20).toArray( (err,data) => {
                        if (!err){
                            this.dbHelper.closeConn();
                            resolve(data);  
                        }else{
                            console.log(">> RegistryDAO (fetchForStruct) ERROR => ", err);
                            this.dbHelper.closeConn();
                            reject(err);
                        }
                    })
            })
        })
    }

    insert(structId, registry){
        return new Promise((resolve, reject) => {
            this.dbHelper.connect().then(conn => {
                conn.collection(structId+"_regs").insertOne(registry, (err, res) => {
                    if (err){
                        console.log("ERROR", err)
                        reject(err);
                    }
                    console.log(">> registro insertado", res);
                    this.dbHelper.closeConn();
                    resolve(true);
                });
            })
        })
    }
}

exports.RegistryDAO = RegistryDAO;