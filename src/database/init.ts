import { WebSQLDatabase } from 'expo-sqlite';
import { DatabaseConnection } from './connection';

var db: WebSQLDatabase

export default class DatabaseInit {
    constructor() {
        db = DatabaseConnection.getConnection()
        try {
            this.InitDb()    
        } catch (error) {
            alert(error)
        }
    }
    InitDb() {
        var sql = [
            `create table if not exists product (
                id integer primary key autoincrement,
                description text,
                price text,
                category integer
            );`,

            `create table if not exists category (
                id integer primary key autoincrement,
                name text
            );`,
        ];
        db.transaction(
            tx => {
                for (var i = 0; i < sql.length; i++) {
                    tx.executeSql(sql[i]);
                }
            }, (error) => {
                console.log("error call back : " + JSON.stringify(error));
                console.log(error);
            }, () => {
                console.log("Database ready");
            }
        );
    }

}