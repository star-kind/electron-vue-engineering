const crypto = require('crypto');
const hash = crypto.createHash('md5');

var Util = require('./../util/commonUtil.js');

var UserDAO2 = require('./../dao/UserDAO2');

var UserDAO3 = require('./../dao/UserDAO3');

var User = require('./../entity/User.js');

var dao = new UserDAO2();

var dao3 = new UserDAO3.UserDAO3();

// 创建对象
var util = new Util.CommonUtil();

// 测试DAO
var userDaoTest = {
    deleteByIdsTest() {
        var ids = [8, 9, 10]
        var props = { column: 'id', value: ids };
        var affects = dao3.deleteByIds(props);
        console.log('affects= ' + affects);
    },

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

    delayTest() {
        var f = function() {
            console.info('The DJ god,rap king,dance superman');
        };
        setTimeout(f, 5000);
    },

    verifyPasswordTest2() {
        // var uuid = util.getUUID();
        var password = '123';
        var uuid2 = '14c8a2b08e6a48b19475adfddd635191';

        // hash.update(uuid + password + uuid);
        hash.update(uuid2 + password + uuid2);
        var text = hash.digest('hex');

        console.log(text);
    },
}
userDaoTest.deleteByIdsTest();
// userDaoTest.verifyPasswordTest2()
// userDaoTest.delayTest()
// userDaoTest.verifyPasswordTest()
// userDaoTest.getSecretTextTest()
// userDaoTest.createUserTableTest()
// userDaoTest.saveNewUserTest()
// userDaoTest.getUUIDTest()
// userDaoTest.getUserListTest()