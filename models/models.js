var path = require('path');

//Cargar Modelo ORM sequelize
var Sequelize = require('sequelize');

// Usar BBDD SQLite:
var sequelize = new Sequelize(null, null, null,
					{dialect: "sqlite", storage: "quiz.sqlite"}
					);

// Importar la definición de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));
exports.Quiz = Quiz; // exportar definición de tabla Quiz

// sequelize.sync() crea e inicializa tabla de pregunta en la Base de Datos
sequelize.sync().success(function() {
	//success(...) ejecuta el manejador una vez creada la tabla
	Quiz.count().success(function(count){
		if(count === 0){ // la tabla se inicializa sólo si esta vacía
			Quiz.create({pregunta: 'Capital de Italia',
						respuesta: "Roma", 
		})
		.success(function(){console.log('Base de datos inicializada')});
		};
	});
});
