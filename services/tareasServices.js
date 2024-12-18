const mysql = require('mysql')

const conn = require('../config/conn')


const tareas = {

    
    async getTareas () {

        
        let sql = 'SELECT * FROM tasks '
        
        let resultado = await conn.query(sql)
        let response = {error: "No se encontraron registros"}
        if(resultado.code) {
            response = {error: "Error en la consulta SQL"}
        }else if (resultado.length > 0) {
            response = {result: resultado}
        }
        return response
    },

    async getTareasById (id) {

        
        let sql = 'SELECT * FROM tasks WHERE id = ' + id
        
        let resultado = await conn.query(sql)
        let response = {error: "No se encontraron registros"}
        if(resultado.code) {
            response = {error: "Error en la consulta SQL"}
        }else if (resultado.length > 0) {
            response = {result: resultado}
        }
        return response
    },

    async postTareas (body) {

        
        let sql = "INSERT INTO `tasks`(`id`, `tittle`,`completed`) VALUES (NULL,'"+body.tittle+"','"+body.completed+"')"
        console.log(sql)
       
        let resultado = await conn.query(sql)
        let response = {error: "No se encontraron registros"}
        if(resultado.code) {
            response = {error: "Error en la consulta SQL"}
        }else if (resultado.length > 0) {
            response = {result: resultado}
        }
        return response
    },
    async putTareas (body) {

        
        let sql = "UPDATE `tasks` SET `tittle`='"+body.tittle+"',`completed`='"+body.completed+"' WHERE `id`=" + body.id
        
        
        let resultado = await conn.query(sql)
        let response = {error: "No se encontraron registros"}
        if(resultado.code) {
            response = {error: "Error en la consulta SQL"}
        }else if (resultado.length > 0) {
            response = {result: resultado}
        }
        return response
    },
    async deleteTareas (body) {

        
        let sql =  "Delete from `tasks` WHERE id =" + body.id
        
        
        console.log(sql)
        let resultado = await conn.query(sql)
        let response = {error: "No se encontraron registros"}
        if(resultado.code) {
            response = {error: "Error en la consulta SQL"}
        }else if (resultado.length > 0) {
            response = {result: resultado}
        }
        return response
    },
}
//Exportamos el módulo
module.exports = tareas
