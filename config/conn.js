
const mysql= require('mysql');

require("dotenv").config();

const connection 	= mysql.createConnection({

	host     : process.env.HOST,
	user     : process.env.USER,
	password : process.env.PASS,
	port	 : process.env.DB_PORT,
	database : process.env.DATABASE,
	multipleStatements: false 
});

connection.connect(function(err){

	if (err) {

		console.error("Error al conectar a Data Base ::", err.stack);
		return;
	}
	console.log("Conectado a Data Base con Id. :: ", connection.threadId)
});

let query = (sql) => {

	
	return new Promise( (resolve, reject) => {

		connection.query(`${sql}`, function (error, results, fields) {

		  if (error) {

		  	resolve(JSON.parse(JSON.stringify(error)));
		  }else {

		  	resolve(results);
		  }
		});
	})
}

let conn = {

	query: query
}

module.exports = conn
