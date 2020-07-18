const crypto = require('crypto');
const hash = crypto.createHash('md5');

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

    createUserTableTest() {
        dao.createUserTable();
    },

    getSecretTextTest() {
        var uuid = util.getUUID();
        var password = '123';

        hash.update(uuid + password + uuid);
        var text = hash.digest('hex');
        console.log('text==' + text);
    },

    verifyPasswordTest() {
        var salt = '1a5ebef0b96349d1b9e694dfc5473166';
        var logingWord = '123';
        var databaseKwd = 'e9729796fb69c0d0904d9b5e66e3712e';

        hash.update(salt + logingWord + salt);
        var result = hash.digest('hex');
        console.log(result === databaseKwd);
    },
}
userDaoTest.verifyPasswordTest()
// userDaoTest.getSecretTextTest()
// userDaoTest.createUserTableTest()
// userDaoTest.saveNewUserTest()
// userDaoTest.getUUIDTest()
// userDaoTest.getUserListTest()