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
function UserService() {
    console.info('into UserService...');

    UserService.prototype = {
        /**
         * Finds all user.
         *
         * @return     {<type>}  { description_of_the_return_value }
         */
        findAllUser() {
            return userdao.getUserList2();
        },

        /**
         * register
         *
         * @param      {<type>}    params  The parameters
         * @return     {Function}  { description_of_the_return_value }
         */
        register(params) {
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
        },

    }
}

UserService.prototype.constructor = UserService;

export {
    UserService
}