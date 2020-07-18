/**
 * Gets the string.
 *
 * @param      {Array}   args    The arguments
 * @return     {string}  The string.
 */
var getTheStr = function(...args) {
    console.log(args);
    var str = '==={{';
    for (let index in args) {
        str += args[index] + ',';
    }
    str += '}}';
    return str;
}

/**
 * Gets the para string.
 *
 * @param      {string}  para    The para
 * @return     {string}  The para string.
 */
var getParaStr = function(para) {
    return '===>>' + para;
}

export { getParaStr, getTheStr }

/* ============================================ */

/**
 * { into vue  }
 */
function intoVueTest() {
    console.info('into vue===========>>>>>>>>');

    intoVueTest.prototype = {
        /**
         * Gets a job.
         *
         * @return     {<type>}  A job.
         */
        getAJob: function() {
            var job = { name: 'driver', salary: 3600, skill: 'driving cars' }
            return job;
        },

        /**
         * Gets the mine string.
         *
         * @param      {Array}   strs    The strs
         * @return     {string}  The mine string.
         */
        getMineString(...strs) {
            var resultStr = '{{';
            for (var index in strs) {
                resultStr += strs[index] + ',';
            }
            resultStr += '}};'
            return resultStr;
        },

        order: 1306697,
    }
}

intoVueTest.prototype.constructor = intoVueTest;

export { intoVueTest }