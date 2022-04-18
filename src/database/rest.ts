import { DatabaseConnection } from './connection';
import { WebSQLDatabase } from 'expo-sqlite';

var db: WebSQLDatabase

export default class DatabaseInit {
    constructor() {
        db = DatabaseConnection.getConnection()
        this.InitDb()
    }
    InitDb() {
        var sql = [
            `DROP TABLE if exists product;`,
            `DROP TABLE if exists category;`,
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