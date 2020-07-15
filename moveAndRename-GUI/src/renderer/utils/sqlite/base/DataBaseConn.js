var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();

/**
 * es6写法
 * 
 * This class describes a data base connection.
 *
 * @class      DataBaseConn (name)
 */
class DataBaseConn {
    /**
     * Constructs a new instance.
     *
     * @param      {<type>}  dataBaseAddress  The data base address
     */
    constructor(dataBaseAddress) {
        this.db = new sqlite3.Database(dataBaseAddress);

        //判断是否存在
        this.exist = fs.existsSync(dataBaseAddress);

        if (!this.exist) {
            console.log("[此数据库不存在]...[正在创建数据库文件]...");
            fs.openSync(dataBaseAddress, 'w'); //w: write
        } else {
            console.log("[成功连接数据库]...");
        }
    }

}

module.exports = DataBaseConn;