class User {
    constructor(props) {
        this.id = props.id || null;
        this.username = props.username;
        this.phone = props.phone;
        this.email = props.email;
        this.password = props.password;
        this.salt = props.salt || 'sdgdthjdgs16516548CVSMKGNS'; //默认值
    }

    toString() {
        return 'User {' + 'id:' + this.id + ',' + 'username:' + this.username + ',' + 'phone:' + this.phone + ',' + 'email:' + this.email + ',' + 'password:' + this.password + ',' + 'salt:' + this.salt + '}'
    }
}

module.exports = User;