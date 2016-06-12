/**
 * Created by deng on 16-6-1.
 */
var mysql = require('mysql');
var config = require("../config.js");
var EventEmitter = require('events').EventEmitter;
var myEvents = new EventEmitter();
var conn = mysql.createConnection(config.db);
exports.reciveData = function (data, tablename) {
        myEvents.emit('insertdata', data, tablename);

};
myEvents.on('insertdata', function (data, tablename) {
    var sql = 'CREATE TABLE IF NOT EXISTS ' + tablename + ' LIKE dy ; ';
    conn.query(sql, function (err, rows, field) {
        if (err) {
            console.log(err)
        }
    });
    var insertSql = 'INSERT INTO ' + tablename + ' (room_id, room_name, owner_uid, nickname, online, game_name, fans, tags,score,face) VALUES (?,?,?,?,?,?,?,?,?,?)';

    for (var i = 0; i < data.data.length; i++) {

        var item = data.data[i];
        var insertParams = [item.room_id, item.room_name, item.owner_uid, item.nickname, item.online, item.game_name, item.fans, item.tags, Math.round(item.online * 0.05 + item.fans * 0.95),item.face];
        conn.query(insertSql, insertParams, function (err, rows, field) {
            if (err) {
                return console.log(err)
            }
        })
    }
});