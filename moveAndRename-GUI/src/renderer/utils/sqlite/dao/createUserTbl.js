/*创库创表*/

var fs = require('fs')
var SqliteDB = require('./../base/sdbc.js').SqliteDB;

// 库
var dbFile = "./../../../database/moveAndRename.db";

// 表
var sentence = 'CREATE TABLE IF NOT EXISTS ';
sentence += 't_user'; //表名
sentence += '(';
sentence += 'id INTEGER PRIMARY KEY,';
sentence += 'username VARCHAR(50) NOT NULL UNIQUE,';
sentence += 'phone VARCHAR(50) NOT NULL UNIQUE,';
sentence += 'email VARCHAR(80) NOT NULL UNIQUE,';
sentence += 'password CHAR(100) NOT NULL,';
sentence += 'salt CHAR(100) NOT NULL';
sentence += ');';

/**
 * Creates a table.
 *
 * @param      {<type>}  dbFile    The database file
 * @param      {<type>}  sentence  The sentence
 */
const createTbl = (dbFile, sentence) => {
    var db = new SqliteDB(dbFile);

    // create table.
    db.createTable(sentence);

    db.close();
}

createTbl(dbFile, sentence);

// exports.createTbl = createTbl;