import { DatabaseConnection } from '../database/connection';

var db = DatabaseConnection.getConnection();

export const executeQuery = async <T>(sqlStatement: string, args: any[] | undefined): Promise<T> => {
    return new Promise((resolve) => {
        db.transaction(tx => {
            tx.executeSql(
                sqlStatement, args,
                (_, result) => {
                    resolve(Object(result as any))
                },
                (_, error): boolean => {
                    console.warn(error)
                    resolve(Object(error ))
                    return false
                })
        })
    })
}