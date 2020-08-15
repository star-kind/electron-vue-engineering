var UserService2 = require('./../../utils/sqlite/service/UserService2.js');

var service = new UserService2.UserService2();

const user = {
    state: {

    },
    mutations: {

    },
    actions: {
        /**
         * 登录
         *
         * @param      {Object}   arg1         The argument 1
         * @param      {<type>}   arg1.commit  The commit
         * @param      {<type>}   userInfo     The user information
         * @return     {Promise}  { description_of_the_return_value }
         */
        loginByEmail({ commit }, userInfo) {
            console.dir(userInfo);
            const email = userInfo.email.trim();

            // return new Promise((resolve, reject) => {
            //     service.userLogin(email, userInfo.password).then(r => {
            //         console.dir(r);
            //         resolve(r);
            //     }).catch(error => {
            //         reject(error);
            //     })
            // });

            /**/
            var login = new Promise((resolve, reject) => {
                var p = service.userLogin(email, userInfo.password);
                resolve(p);
            })
            //
            login.then(r => {
                return r;
            }).catch(error => {
                reject(error);
            });
            var loginResults = Promise.all(login);
            console.dir(loginResults);
            return login;
        },
    }
}

export default user;