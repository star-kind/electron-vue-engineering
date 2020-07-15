/* User DAO */

/**
 * { es6 }
 *
 * @type       {Function}
 */
// var DataBaseConn = require('./../base/DataBaseConn.js');

/**
 * es5
 *
 * @type       {Function}
 */
var Conn = require('./../base/dbConn.js');

// sqlites数据库地址
var file = "./../../../database/moveAndRename.db";

// links the database
var links = new Conn.databaseCon(file);

/**
 * Connects a db.{for es6}
 */
// function connectDB() {
//     var dbc = new DataBaseConn(file);
//     console.dir(dbc)
// }
// connectDB();

/**
 * { function_description }
 */
var linksDB = function() {
    // var links = new Conn.databaseCon(file);
    console.dir(links)
    console.info(links.toString())
}
// linksDB();

/**
 * Gets all user.
 */
const getAllUser = () => {
    var querySql = "SELECT ";
    querySql += "id,username,phone,email,password,salt "
    querySql += "FROM t_user";
    querySql += ";";

    links.findAll(querySql).then(result => {
        console.log('接受resolved的结果:')
        console.dir(JSON.stringify(result));
    })
    links.closeConnect()
}
getAllUser();

/**
 * 貌似无效
 *
 * @param      {<type>}  data    The data
 */
var dataDeal = function(data) {
    for (let i in data) {
        console.log(data[i]);
    }
}