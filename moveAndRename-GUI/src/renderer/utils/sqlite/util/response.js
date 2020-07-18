function response(code, msg, data) {
    this.code = code || null;
    this.msg = msg || '';
    this.data = data || null;
}

response.prototype = {
    /**
     * Returns a string representation of the object.
     *
     * @return     {string}  String representation of the object.
     */
    toString() {
        var resStr = 'response [ ';
        resStr += 'code: '
        resStr += this.code;
        resStr += ', '

        resStr += 'msg:'
        resStr += this.msg;
        resStr += ', '

        resStr += 'data: '
        resStr += this.data;
        resStr += ', '
        resStr += ' ] '
        resStr += ';';
        return resStr;
    },
}

response.prototype.constructor = response;

module.exports = {
    response
}