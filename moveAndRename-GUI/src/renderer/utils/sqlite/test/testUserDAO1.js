var Util = require('./../util/commonUtil.js');

var UserDAO1 = require('./../dao/UserDAO1')

var User = require('./../entity/User.js')

/**
 * { 实例化 }
 *
 * @type       {UserDAO1}
 */
var dao = new UserDAO1.userDao1();

// 创建对象
var util = new Util.CommonUtil();

/* ========================================== */

// 测试
var testRun = {
    getByFieldTest: function() {
        var fieldOnj = { name: 'username', value: '花田错' }
        var promise = dao.getByField(fieldOnj);

        promise.then(v => {
            console.log('resolved')
            console.log(v)
        }, v => {
            console.log('rejected')
        })
    },

    saveNewUserTest() {
        var params = { username: 'SOSE', phone: 'X88-14615521', email: '3151816721@qq.com', password: 'htyygfsgsfDAO1', salt: 'acaa5ds168gBS1bd5g4d85rxvfs' }

        dao.saveNewUser(params)
        // dao.addOneUser(params)
    },

    getUserListTest() {
        var list = dao.getUserList();
        list.then(v => {
            console.table(v)
        }, v => {
            console.log('failed...')
        })
    },

    getUUID() {
        var str = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
        str = str.replace(/[xy]/g, function(ch) {
            var r = Math.random() * 16 | 0;
            v = ch == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        })
        str = str.replace(/-/g, '')
        console.log(str);
    },

    updatesByFieldsTest() {
        // this.getUUID()
        var uuid = util.getUUID();

        var targets = [{ name: 'salt', value: uuid }, { name: 'email', value: '4604133@qq.com' }, { name: 'username', value: '花田错' }];
        var condition = { name: 'phone', value: '14512604133' };

        dao.updatesByFields(targets, condition)
    },
}
// testRun.updatesByFieldsTest()
// testRun.getUUID()
// testRun.getByFieldTest()
// testRun.saveNewUserTest()
// testRun.getUserListTest()