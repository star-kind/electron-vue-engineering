var User2 = require('./../entity/User2.js');

var Conn = require('./../base/dbConn3.js');

// sqlites数据库地址
var file = __dirname + '/database/moveAndRename.db';

// links the database
var links = new Conn.databaseCon(file);

/**
 * { 构造函数 }
 */
function UserDAO3() {
    console.log('UserDAO3.constructor');
}

/**
 * Creates an user table.
 */
UserDAO3.prototype.createUserTable = function() {
    // 建表语句
    var sentence = 'CREATE TABLE IF NOT EXISTS ';
    sentence += 't_user'; //表名
    sentence += '(';
    sentence += 'id INTEGER PRIMARY KEY,';
    sentence += 'username VARCHAR(50) NOT NULL UNIQUE,';
    sentence += 'phone VARCHAR(50) NOT NULL UNIQUE,';
    sentence += 'email VARCHAR(80) NOT NULL UNIQUE,';
    sentence += 'password CHAR(100) NOT NULL,';
    sentence += 'salt CHAR(100) NOT NULL';
    sentence += ');';

    try {
        links.createTable(sentence)
    } catch (error) {
        console.info(error);
        throw error;
    } finally {
        links.closeConnect();
    }
};

/**
 * Links a data base.
 */
UserDAO3.prototype.linkDataBase = function() {
    console.dir(links)
    console.info(links.toString())
};

/**
 * Saves a new user.
 *
 * @param      {<type>}  params  The parameters
 * @return     {<type>}  { description_of_the_return_value }
 */
UserDAO3.prototype.saveNewUser = function(params) {
    console.dir(params)
    var props = {}

    for (let i in params) {
        if (params[i] == null || undefined || '') {
            this.errorMsg = '参数不齐全!';
            console.error(this.errorMsg)
            return this.errorMsg;
        }
    }
    props.sql = 'INSERT INTO t_user '
    props.sql += '(username,phone,email,password,salt) '
    props.sql += ' VALUES'
    props.sql += ' (?,?,?,?,?);';

    props.value = params;

    try {
        links.insertPlus(props);
    } catch (error) {
        console.error(error)
        throw error;
    } finally {
        links.closeConnect();
    }
};

/**
 * Gets the by field.
 *
 * @param      {<type>}  field   The field
 * @return     {<type>}  The by field.
 */
UserDAO3.prototype.getByField = function(field) {
    if (field == null || '' || undefined) {
        this.errorMsg = 'field对象为空!';
        console.error(this.errorMsg)
        return this.errorMsg;
    }

    var sql = "SELECT "
    sql += " id,username,phone,email,password,salt "
    sql += " FROM t_user "
    sql += " WHERE "
    sql += field.name
    sql += " = "

    sql += "'"
    sql += field.value
    sql += "'"
    sql += " ;";

    this.promiseObj = links.findByFieldValue(sql);
    links.closeConnect();
    return this.promiseObj;
};

/**
 * Gets the user list.
 *
 * @return     {<type>}  The user list.
 */
UserDAO3.prototype.getUserList = function() {
    var querySql = "SELECT ";
    querySql += "id,username,phone,email,password,salt "
    querySql += "FROM t_user";
    querySql += ";";

    this.promiseObj = links.findAll(querySql).then(value => {
        console.log('成功态,接受resolved的结果...')
        console.dir(JSON.stringify(value));
        return value;
    }, value => {
        console.log('失败态,接受rejected的结果:')
        console.dir(JSON.stringify(value));
    })
    links.closeConnect();
    return this.promiseObj;
};

/**
 * Gets the user list 2.
 *
 * @return     {<type>}  The user list 2.
 */
UserDAO3.prototype.getUserList2 = function() {
    var querySql = "SELECT ";
    querySql += "id,username,phone,email "
    querySql += "FROM t_user";
    querySql += ";";

    this.promiseObj = links.findAll(querySql).then(value => {
        console.log('成功态,接受resolved的结果...')
        // console.dir(JSON.stringify(value));
        return value;
    }, value => {
        console.log('失败态,接受rejected的结果:')
        // console.dir(JSON.stringify(value));
    })
    links.closeConnect();
    return this.promiseObj;
};

/**
 * Adds one user.
 *
 * @param      {<type>}  user    The user
 * @return     {<type>}  { description_of_the_return_value }
 */
UserDAO3.prototype.addOneUser = function(user) {
    var valArr = Object.values(user);
    for (let i in valArr) {
        if (valArr[i] == null || '' || undefined) {
            this.errorMsg = '新用户申请注册资料未补全!';
            console.error(this.errorMsg)
            return this.errorMsg;
        }
    }

    var sqlSentence = "insert into t_user (username,phone,email,password,salt) values( ";
    sqlSentence += "'";
    sqlSentence += user.username;
    sqlSentence += "'";
    sqlSentence += ',';

    sqlSentence += "'";
    sqlSentence += user.phone;
    sqlSentence += "'";
    sqlSentence += ",";

    sqlSentence += "'";
    sqlSentence += user.email;
    sqlSentence += "'";
    sqlSentence += ",";

    sqlSentence += "'";
    sqlSentence += user.password;
    sqlSentence += "'";
    sqlSentence += ",";

    sqlSentence += "'";
    sqlSentence += user.salt;
    sqlSentence += "'";
    sqlSentence += " );";

    try {
        links.insert(sqlSentence);
    } catch (err) {
        console.dir(err)
        throw err;
    } finally {
        links.closeConnect();
    }
};

/**
 * Gets one user.
 *
 * @param      {string}  id      The identifier
 * @return     {<type>}  One user.
 */
UserDAO3.prototype.getOneUser = function(id) {
    var querySql = "SELECT ";
    querySql += "id,username,phone,email,password,salt "
    querySql += "FROM t_user ";
    querySql += "WHERE id = ";
    querySql += "'";
    querySql += id;
    querySql += "'";
    querySql += ";";

    this.promiseObj = links.findById(querySql);
    links.closeConnect();

    return this.promiseObj;
};

/**
 * { function_description }
 *
 * @param      {<type>}  user    The user
 * @return     {<type>}  { description_of_the_return_value }
 */
UserDAO3.prototype.updatesById = function(user) {
    if (user == null || '' || undefined) {
        this.errorMsg = '参数为空!';
        console.error(this.errorMsg)
        return this.errorMsg;
    }
    var sqlSentence = "UPDATE t_user SET ";

    if (user.username != null || '' || undefined) {
        sqlSentence += " username = ";
        sqlSentence += "'";
        sqlSentence += user.username;
        sqlSentence += "'";
        if (user.phone != null || '' || undefined) {
            sqlSentence += ",";
        }
    }

    if (user.phone != null || '' || undefined) {
        sqlSentence += "phone = ";
        sqlSentence += "'";
        sqlSentence += user.phone;
        sqlSentence += "'";
        if (user.email != null || '' || undefined) {
            sqlSentence += ",";
        }
    }

    if (user.email != null || '' || undefined) {
        sqlSentence += "email = ";
        sqlSentence += "'";
        sqlSentence += user.email;
        sqlSentence += "'";
        if (user.password != null || '' || undefined) {
            sqlSentence += ",";
        }
    }

    if (user.password != null || '' || undefined) {
        sqlSentence += "password = ";
        sqlSentence += "'";
        sqlSentence += user.password;
        sqlSentence += "' ";
        if (user.salt != null || '' || undefined) {
            sqlSentence += ",";
        }
    }

    if (user.salt != null || '' || undefined) {
        sqlSentence += " salt = ";
        sqlSentence += "'";
        sqlSentence += user.salt;
        sqlSentence += "' ";
    }

    if (user.id == null || '' || undefined) {
        this.errorMsg = '参数[id]为空!';
        console.error(this.errorMsg)
        return this.errorMsg;
    }
    sqlSentence += " WHERE id = ";
    sqlSentence += user.id;
    sqlSentence += " ;";

    try {
        links.executeCommand(sqlSentence);
    } catch (error) {
        console.error(error)
        throw error;
    } finally {
        links.closeConnect();
    }
};

/**
 * targets 为对象数组
 *
 * @param      {<type>}  targets    The targets
 * @param      {<type>}  condition  The condition
 * @return     {<type>}  { description_of_the_return_value }
 */
UserDAO3.prototype.updatesByFields = function(targets, condition) {
    console.dir(targets)
    console.dir(condition);

    var sql0 = ' ';
    for (let i in targets) {
        if (targets[i].name === 'id') {
            this.errorMsg = '#{id}不可修改!'
            console.error(this.errorMsg)
            return this.errorMsg;
        } else if (targets[i].name === '' || undefined || null) {
            this.errorMsg = '有字段名为空!'
            console.error(this.errorMsg)
            return this.errorMsg;
        } else if (targets[i].value === '' || undefined || null) {
            this.errorMsg = '有字段值为空!'
            console.error(this.errorMsg)
            return this.errorMsg;
        }
        sql0 += targets[i].name;
        sql0 += ' = '
        sql0 += '"'
        sql0 += targets[i].value;
        sql0 += '"'
        sql0 += ',';
    }
    sql0 = sql0.substring(0, sql0.length - 1);

    var sql = 'UPDATE t_user SET '
    sql += sql0;

    sql += ' WHERE '
    sql += condition.name
    sql += ' = '

    sql += '"'
    sql += condition.value
    sql += '"'
    sql += ' ;';

    try {
        links.executeCommand(sql);
    } catch (error) {
        console.error(error)
        throw error;
    } finally {
        links.closeConnect();
    }
};


// 导出模块
// module.exports.UserDAO3 = UserDAO3;

//导出模块给vue
export {
    UserDAO3
}