const crypto = require('crypto');
const hash = crypto.createHash('md5');

var dao3 = require('./../dao/UserDAO3.js');
var commonUtil = require('./../util/commonUtil.js');

var response = require('./../util/response.js');

var userdao = new dao3.UserDAO3();

var util = new commonUtil.CommonUtil();

/**
 * { function_description }
 *
 * @class      UserService (name)
 */
export function UserService2() {
    console.info('into UserService2...');
}

UserService2.prototype.constructor = UserService2;

/**
 * Finds all user.
 *
 * @return     {<type>}  { description_of_the_return_value }
 */
UserService2.prototype.findAllUser = function() {
    return userdao.getUserList2();
}

/**
 * { function_description }
 *
 * @param      {<type>}    params  The parameters
 * @return     {response}  { description_of_the_return_value }
 */
UserService2.prototype.register = function(params) {
    registerPrepare(params);

    var params2 = {};
    var uuid = util.getUUID();

    /*此处赋值要对应SQL语句中的字段顺序,不然会段与值之间发生错位*/
    params2.username = params.username;
    params2.phone = params.phone;
    params2.email = params.email;

    hash.update(uuid + params.password + uuid);
    params2.password = hash.digest('hex');

    params2.salt = uuid;

    try {
        userdao.saveNewUser(params2);
    } catch (error) {
        console.error(error);
        return new response.response(error.errno, err.code, 0);
    } finally {
        console.log('whatever,register"s work is done.')
    }

    return new response.response(200, 'OK', 1);
}

/**
 * 注册前事先排除重复数据
 *
 * @param      {<type>}    params  The parameters
 * @return     {response}  { description_of_the_return_value }
 */
const registerPrepare = (params) => {
    var field = ({ name: 'username', value: params.username });
    var field2 = ({ name: 'phone', value: params.phone });
    var field3 = ({ name: 'email', value: params.email });

    var result = userdao.getByField(field);
    var result2 = userdao.getByField(field2);
    var result3 = userdao.getByField(field3)

    if (result !== null || '' || undefined) {
        return new response.response(484, '该名字已存在!');
    } else if (result2 !== null || '' || undefined) {
        return new response.response(485, '该电话号码存在!');
    } else if (result3 !== null || '' || undefined) {
        return new response.response(487, '该邮箱已存在!');
    }
}

/**
 * { function_description }
 *
 * @param      {<type>}  email     The email
 * @param      {<type>}  password  The password
 * @return     {<type>}  { description_of_the_return_value }
 */
UserService2.prototype.userLogin = (email, password) => {
    var fields = ({ name: 'email', value: email });
    console.log('password=' + password);
    var promise = userdao.getByField(fields).then(v => {
        if (v == null || '' || undefined) {
            return new response.response(1487, '使用该邮箱的用户不存在');
        }
        console.info('有此用户');
        console.dir(v);
        console.log(v[0].salt);

        //将提交之密码与已存在之盐值搅拌均匀
        hash.update(v[0].salt + password + v[0].salt);
        var text = hash.digest('hex');
        console.log('text=  ' + text);

        //检验提交之密码与已存在之密文是否一致
        if (text !== v[0].password) {
            return new response.response(444, '密码错误');
        }
        return new response.response(200, 'OK', v);
    }, v => {
        console.log('failure...')
    });
    return promise;
}