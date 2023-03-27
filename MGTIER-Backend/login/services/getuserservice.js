const sql = require('mssql');
const { sqlConfig } = require('../serverconfig')

module.exports = {
    getUser: async(id)=>{
        await sql.connect(sqlConfig)
        let results = await (await (sql.query `SELECT * FROM example WHERE id = ${id}`)).recordset;
        if(results.length){
            return results[0]
        }else{
            return undefined;
        }
    }
}