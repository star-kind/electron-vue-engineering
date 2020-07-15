/* es5写法 */

var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();

/**
 * { function_description }
 *
 * @param      {<type>}  fileUrl  The file url
 */
function databaseCon(fileUrl) {
    this.db = new sqlite3.Database(fileUrl);
    this.exist = fs.existsSync(fileUrl);

    if (!this.exist) {
        console.log("Creating db file...[正在创建数据库文件]...");
        fs.openSync(fileUrl, 'w'); //w: write
    } else {
        console.log("[连接数据库成功]");
    }
}

/**
 * Returns a string representation of the object.
 *
 * @return     {string}  String representation of the object.
 */
databaseCon.prototype.toString = function() {
    var statStr = 'databaseCon:[ '
    statStr += 'db: '
    statStr += JSON.stringify(this.db);
    statStr += ', '
    statStr += 'exist: '
    statStr += this.exist
    statStr += ']';
    return statStr;
}

/**
 * Finds all.有效,可以返回数据
 *
 * @param      {<type>}   sqlStatement  The sql statement
 * @return     {Promise}  { description_of_the_return_value }
 */
databaseCon.prototype.findAll = function(sqlStatement) {
    console.log(sqlStatement)

    var db1 = this.db;

    var queryAll = new Promise(function(resolve, reject) {
        db1.all(sqlStatement, function(err, row) {
            if (err != null) {
                console.error(err);
                return;
            }
            // console.log(JSON.stringify(row));
            resolve(row)
        })
    });
    queryAll.then(function(value) { // success
        // console.info(value)
        return value
    }, function(value) { // failure
    })

    return queryAll;
}

/**
 * Queries all.只能查询却无法返回数据
 *
 * @param      {<type>}    sql_statement  The sql statement
 * @param      {Function}  callback       The callback
 */
databaseCon.prototype.queryAll = function(sql_statement, callback) {
    console.log(sql_statement);

    var db2 = this.db;
    db2.serialize(function() {
        db2.all(sql_statement, function(err, allRows) {
            if (err != null) {
                console.log(err);
                callback(err);
            }
            console.log(allRows);

            if (callback) {
                callback(allRows);
            }
        });
    });
}

/**
 * Closes a connect.
 */
databaseCon.prototype.closeConnect = function() {
    this.db.close();
};

module.exports = {
    databaseCon
}