var Util = require('./../util/commonUtil.js');

var UserDAO2 = require('./../dao/UserDAO2');

var User = require('./../entity/User.js');

var dao = new UserDAO2();

// 创建对象
var util = new Util.CommonUtil();

// 测试DAO
var userDaoTest = {
    getUserListTest() {
        var list = dao.getUserList();
        list.then(v => {
            console.table(v)
        }, v => {
            console.log('failed...')
        })
    },

    getUUIDTest() {
        var uuid = util.getUUID();
        console.log(uuid);
        return uuid;
    },

    saveNewUserTest() {
        var uuid = util.getUUID();
        var params = { username: 'of2000', phone: '21597364101', email: '319141681@qq.com', password: '1b156465tjVSGSQPOVNh165614vs', salt: uuid }
        dao.saveNewUser(params);
    },

    createUserTableTest(){
        dao.createUserTable();
    },

}
// userDaoTest.createUserTableTest()
// userDaoTest.saveNewUserTest()
// userDaoTest.getUUIDTest()
userDaoTest.getUserListTest()