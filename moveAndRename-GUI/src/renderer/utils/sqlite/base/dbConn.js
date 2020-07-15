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
    var db1 = this.db;
    console.log(sqlStatement)

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

//增加1位
databaseCon.prototype.insert = function(sql_statement) {
    console.log(sql_statement);
    var dbConnect = this.db;

    dbConnect.serialize(function() {
        var stmt = dbConnect.prepare(sql_statement);
        stmt.run();
        stmt.finalize();
    });
}

/**
 * Finds a by identifier.根据id查询1位
 *
 * @param      {<type>}   sql     The sql
 * @return     {Promise}  { description_of_the_return_value }
 */
databaseCon.prototype.findById = function(sql) {
    var dbObj = this.db;
    console.log(sql);

    return new Promise(function(resolve, reject) {
        dbObj.all(sql, function(error, row) {
            if (error) throw error;
            resolve(row) //关键
        })
    }).then(val => {
        console.log('成功完成:')
        console.log(val)
        return val;
    }, val => {
        console.log('失败:')
    });
};

databaseCon.prototype.executeCommand = function(sql_statement) {
    console.log(sql_statement);
    this.db.run(sql_statement, function(err) {
        if (null != err) {
            console.error(err);
            return;
        } else {
            console.info('\n执行完毕!\n');
        }
    });
};

/**
 * Closes a connect.
 */
databaseCon.prototype.closeConnect = function() {
    this.db.close();
};


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

module.exports = {
    databaseCon
}