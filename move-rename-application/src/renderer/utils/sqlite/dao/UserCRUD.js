/**
 * 本类原为存放增删改查之接口方法之地,但query接口查不到数据,又找不出原因,遂将此类弃用,转移至UserDAO类
 *
 */

var SqliteDB = require('./../base/sdbc.js').SqliteDB;

// sqlites数据库地址
var file = "./../../../database/moveAndRename.db";
var User = require('./../entity/User.js')

// 打开sqlites数据库
var sqliteDB = new SqliteDB(file);

// 测试数据
var prop = { username: '全体111222', phone: '212150002100', email: 'UoServer@qq.com', password: "c1ss5fafab1sgsg248faefa", salt: '01d32w1asfdaf264515avfhcbh14' };

/**
 * Saves a new user.
 *
 * @param      {<type>}  data    The data
 */
const saveNewUser = function(data) {
    var ur = new User(data);
    var sql = "insert into t_user (username,phone,email,password,salt) values(";

    console.dir(ur);
    sql += "'";
    sql += ur.username;
    sql += "'";
    sql += ',';

    sql += "'";
    sql += ur.phone;
    sql += "'";
    sql += ",";

    sql += "'";
    sql += ur.email;
    sql += "'";
    sql += ",";

    sql += "'";
    sql += ur.password;
    sql += "'";
    sql += ",";

    sql += "'";
    sql += ur.salt;
    sql += "'";

    sql += ");";

    sqliteDB.insertData(sql);
    sqliteDB.close();
}
// saveNewUser(prop)

/**
 * Queries all user one by one.
 */
const queryAllUser = () => {
    var querySql = "SELECT id,username,phone,email,password,salt ";
    querySql += "FROM t_user";
    querySql += ";";
    var r = sqliteDB.each(querySql, exhibitsData);
    console.dir(r);
    sqliteDB.close();
}
queryAllUser();


/**
 * 循环展示数据集
 *
 * @param      {<type>}  list    The list
 * @return     {<type>}  { description_of_the_return_value }
 */
var exhibitsData = (list) => {
    for (let i in list) {
        console.dir(list[i]);
    }
    return list;
}