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

var User = require('./../entity/User.js')

/**
 * { 运行测试 }
 */
var runTest = function() {
    var dao = new userDao1();
    console.log(dao.SUCCESS);

    dao.linkDataBase();
    dao.getUserList();
    // console.log(dao.promiseObj);
    dao.promiseObj.then(val => {
        console.log('Status switches to fulfilled');
        console.log(JSON.stringify(val))
    }, val => {
        console.info('Status switches to reject');
        console.info(JSON.stringify(val))
    })
}
// runTest()

var addOneUserTest = function() {
    // var props = { username: '韦迪马尔斯马拉', phone: '184472191', email: 'Ularry@qq.com', password: "anfdghgfd15951fa", salt: '01dvbsdf4d51db4' };
    var props1 = { username: 'UCRU', phone: '1651894611' };
    var dao = new userDao1();
    var userData = new User(props1);

    var line = dao.addOneUser(userData);
    console.log(line)
}
addOneUserTest()

var getOneUserTest = function() {
    var dao = new userDao1();
    var promise = dao.getOneUser(8);

    promise.then(val => {
        console.log('fully success')
        console.dir(val)
    }, val => {
        console.log('defeat')
    })
}
// getOneUserTest()

var updatesByIdTest = function() {
    var dao = new userDao1();
    var props = { username: '天城大将甘玉义', id: 3 };
    var user = new User(props)

    var affect = dao.updatesById(user);
    console.log('affect= ' + affect)
}
// updatesByIdTest()

/* ======================以上为测试========================= */

/**
 * { 自定义构造函数 }
 */
function userDao1() {
    this.SUCCESS = 200;

    /**
     * Links a data base.
     */
    this.linkDataBase = function() {
        console.dir(links)
        console.info(links.toString())
    };

    /**
     * Gets the user list.
     */
    this.getUserList = function() {
        var querySql = "SELECT ";
        querySql += "id,username,phone,email,password,salt "
        querySql += "FROM t_user";
        querySql += ";";

        this.promiseObj = links.findAll(querySql).then(value => {
            console.log('状态切换为已完成,接受resolved的结果:')
            console.dir(JSON.stringify(value));
            return value;
        })
        links.closeConnect();
    };

    /**
     * Adds one user.
     *
     * @param      {<type>}  user    The user
     * @return     {number}  { description_of_the_return_value }
     // */
    this.addOneUser = function(user) {
        var valArr = Object.values(user);
        for (let i in valArr) {
            if (valArr[i] == null || '' || undefined) {
                this.errorMsg = '新用户申请注册资料未补全!';
                console.error(this.errorMsg)
                return;
            }
        }

        var sqlSentence = "insert into t_user (username,phone,email,password,salt) values(";

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
        sqlSentence += ");";

        links.insert(sqlSentence);
        links.closeConnect();
        return 1;
    };

    /**
     * Gets one user.
     *
     * @param      {string}  id      The identifier
     * @return     {<type>}  One user.
     */
    this.getOneUser = function(id) {
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
     * @return     {number}  { description_of_the_return_value }
     */
    this.updatesById = function(user) {
        if (user === null || '' || undefined) {
            this.errorMsg = '参数为空!';
            console.error(this.errorMsg)
            return;
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
        }

        if (user.id == null || '' || undefined) {
            this.errorMsg = '参数[id]为空!';
            console.error(this.errorMsg)
            return;
        }
        sqlSentence += " WHERE id = ";
        sqlSentence += user.id;
        sqlSentence += ";";

        links.executeCommand(sqlSentence);
        links.closeConnect();
        return 1;
    };

}

// 导出模块
module.exports = {
    userDao1
}