/**
 * { sdbc = sqlite database connection }
 *
 * 由于sqlite3 API具体使用过程中重复代码量较多, 所以进行了简单封装, 在使用过程中如果第一次创建数据库和表, 紧接着插入数据的话, 可能导致表还未创建完成就查询出现错误(Nodejs是基于异步的且顺序不可控), 所以在表创建和插入数据时使用同步方式操作来保证表已经存在. 封装的代码如下:
 *
 */

var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();

var DB = DB || {};

/**
 * { 创库 }
 *
 * @class      SqliteDB (name)
 * @param      {<type>}  file    The file
 */
DB.SqliteDB = function(file) {
    DB.db = new sqlite3.Database(file);
    DB.exist = fs.existsSync(file);

    if (!DB.exist) {
        console.log("Creating db file...[正在创建数据库文件]...");
        fs.openSync(file, 'w'); //w: write
    };
};

/**
 * Prints an error information.
 *
 * @param      {<type>}  err     The error
 */
DB.printErrorInfo = function(err) {
    console.error(err);
    console.log("Error Message:" + err.message + "\nErrorNumber:" + errno);
};

/**
 * Creates a table.
 *
 * @param      {<type>}  sql     The sql
 */
DB.SqliteDB.prototype.createTable = function(sql) {
    DB.db.serialize(function() {
        DB.db.run(sql, function(err) {
            if (null != err) {
                DB.printErrorInfo(err);
                return;
            }
        });
    });
};

/**
 * { single insert }
 *
 * @param      {<type>}  sql     The sql
 */
DB.SqliteDB.prototype.insertData = function(sql) {
    console.log(sql);
    DB.db.serialize(function() {
        var stmt = DB.db.prepare(sql);
        stmt.run();
        stmt.finalize();
    });
};

/**
 * Queries a data.
 *
 * @param      {<type>}    sql       The sql
 * @param      {Function}  callback  The callback
 */
DB.SqliteDB.prototype.queryData = function(sql, callback) {
    console.log(sql);
    DB.db.all(sql, function(err, rows) {
        if (null != err) {
            DB.printErrorInfo(err);
            return;
        }
        // deal query data.
        if (callback) {
            callback(rows);
        }
    });
};

/**
 * 逐条查询数据
 *
 * @param      {<type>}  sql     The sql
 * @return     {<type>}  { description_of_the_return_value }
 */
DB.SqliteDB.prototype.each = (sql) => {
    console.log(sql);
    var result = null;
    DB.db.each(sql, function(err, rows) {
        if (err) throw err
        else {
            console.dir('查询结果：', rows)
            result = rows
        }
    })
    return result;
}

DB.SqliteDB.prototype.executeSql = function(sql) {
    console.log(sql);
    DB.db.run(sql, function(err) {
        if (null != err) {
            DB.printErrorInfo(err);
        }
    });
};

DB.SqliteDB.prototype.close = function() {
    DB.db.close();
};

/* export SqliteDB */
exports.SqliteDB = DB.SqliteDB;