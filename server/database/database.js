// CURRENTLY NOT USED

const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('outcast');

// sql create table
const SQL_CREATE_EVENTS = "CREATE TABLE events(id integer primary key autoincrement, text text, is_done boolean, priority boolean, initial_event boolean, conditions json);";
const SQL_CREATE_CHOICES = "CREATE TABLE choices(id integer, event_id integer, text text, next_event integer, results json, conditions json);"
const SQL_CREATE_PLAYER = "CREATE TABLE player(id integer primary key, name text, house text, status integer, honnor integer, fear integer, money integer, military_force float);";
const SQL_CREATE_CHARACTERS = "CREATE TABLE characters(id integer primary key, name text, level_relation integer);";
const SQL_CREATE_PLACES = "CREATE TABLE places(id integer primary key, name text, status integer, defense integer, results json);";
// sql insert data
const SQL_INSERT_PLAYER = "INSERT INTO player(id, name, house, status, honnor, fear, money, military_force) VALUES (1, '', '', 0, 50, 50, 100, 0.1);";
// sql select data
const SQL_SELECT_PLAYER = "SELECT * FROM player;";

const SQL_INSERT_EVENTS = "INSERT INTO events(text, is_done, priority, initial_event, conditions) VALUES ('text', false, true, true, '{}');"

function errorSqlite(err) {
    if (err) { console.log(err); }
}

function createTables() {
    db.run(SQL_CREATE_EVENTS, [], errorSqlite);
    db.run(SQL_CREATE_CHOICES, [], errorSqlite);
    db.run(SQL_CREATE_PLAYER, [], errorSqlite);
    db.run(SQL_CREATE_CHARACTERS, [], errorSqlite);
    db.run(SQL_CREATE_PLACES, [], errorSqlite);
}

function addPlayerContext() {
    db.run(SQL_INSERT_PLAYER, [], errorSqlite);
}

function initDatabase() {
    createTables();
    addPlayerContext();
}

function selectQuery(query) {
    return new Promise(resolve => {
        db.all(SQL_SELECT_PLAYER, [], function(err, rows) {
            if (!err) {
                resolve(rows);
            }
        });
    });
}

async function getData() {
    let results = await selectQuery(SQL_SELECT_PLAYER);
    return results;
}

module.exports = {
    initDatabase: initDatabase,
    getData: getData
};