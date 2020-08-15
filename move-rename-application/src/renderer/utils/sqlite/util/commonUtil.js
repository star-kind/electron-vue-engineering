/**
 * { function_description }
 *
 * @class      CommonUtil (name)
 */
function CommonUtil() {
    console.info('The CommonUtil"s constructor')
}

CommonUtil.prototype = {
    /**
     * Gets the uuid.
     *
     * @return     {string}  The uuid.
     */
    getUUID: function() {
        var str = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
        str = str.replace(/[xy]/g, function(ch) {
            var r = Math.random() * 16 | 0;
            v = ch == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        })
        str = str.replace(/-/g, '')
        console.log(str);
        return str;
    },
}

/**
 * Gets the uuid.
 *
 * @return     {string}  The uuid.
 */
// CommonUtil.prototype.getUUID = function() {
//     var str = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
//     str = str.replace(/[xy]/g, function(ch) {
//         var r = Math.random() * 16 | 0;
//         v = ch == 'x' ? r : (r & 0x3 | 0x8);
//         return v.toString(16);
//     })
//     str = str.replace(/-/g, '')
//     console.log(str);
//     return str;
// }

CommonUtil.prototype.constructor = CommonUtil;

module.exports = {
    CommonUtil
}