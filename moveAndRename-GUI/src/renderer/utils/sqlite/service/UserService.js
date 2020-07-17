var dao3 = require('./../dao/UserDAO3.js')

/**
 * Finds all user.
 *
 * @return     {<type>}  { description_of_the_return_value }
 */
var findAllUser = function() {
    var results = dao3.getUserList();
    return results;
}
// export {
//     findAllUser
// }