const mysql = require('mysql')

const conn = require('../config/conn')


const tareas = {

    
    async getTareas() {
        let sql = 'SELECT * FROM tasks';
        let resultado = await conn.query(sql);
        
        // Transformar el valor de 'completed' de 1/0 a true/false
        resultado = resultado.map(task => ({
            ...task,                  // Mantén todas las propiedades de la tarea
            completed: !!task.completed // Convierte 1 a true y 0 a false
        }));
    
        let response = { error: "No se encontraron registros" };
    
        if (resultado.code) {
            response = { error: "Error en la consulta SQL" };
        } else if (resultado.length > 0) {
            response = { result: resultado };
        }
    
        return response;
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

    async postTareas(body) {
        // Consulta SQL para insertar la tarea
        let sql = "INSERT INTO `tasks`(`id`, `title`, `completed`) VALUES (NULL, '" + body.title + "', '" + body.completed + "')";
        console.log(sql);
    
        try {
            // Ejecutar la consulta de inserción
            let resultado = await conn.query(sql);
    
            // Crear un objeto con la nueva tarea
            const newTask = {
                id: resultado[0].insertId, // ID generado automáticamente por MySQL
                title: body.title,
                completed: body.completed,
            };
    
            // Retornar la nueva tarea
            return { result: newTask };
        } catch (error) {
            console.error("Error en la consulta SQL:", error);
            return { error: "Error en la consulta SQL" };
        }
    },
    async putTareas(body) {
        let sql = `
            UPDATE tasks 
            SET completed = '${body.completed ? 1 : 0}' 
            WHERE id = ${body.id}
        `;
        console.log("Consulta SQL:", sql);
        let resultado = await conn.query(sql);
        let response = { error: "No se encontraron registros" };
    
        if (resultado.code) {
            response = { error: "Error en la consulta SQL" };
        } else if (resultado.affectedRows > 0) {
            response = { result: "Tarea actualizada correctamente" };
        }
    
        return response;
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
