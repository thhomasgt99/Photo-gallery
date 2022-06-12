if(process.env.NODE_ENV !== 'production'){ //la gracia de este if es saver si estamos en produccion o desarrollo para saver como utilizar las variables de entorno, esto pq en produccion tomara las variables de entorno de un lugar especial
																				//NODE_ENV traera un string 'production' 'undefined' 'development', osea el entorno actual de desarrollo PERO ESTO LO DEFINIMOS NOSOTROS A TRAVEZ DE cross-env	
	require('dotenv').config() //esta linea utiliza dotenv, lee el archivo .env y nos pone cada variable de entorno disponible para la app
}

const app = require('./app') //trae el archivo app para aqui ejecutar ya de una vez la aplicacion

app.listen(app.get('port'), ()=>{  //escuchar en el puerto indicado | el puesto lo saca de las configuraciones que ya teniamos sobre eso
	console.log('server on port: ' , app.get('port')) //notificamos si el port esta ya prendido
	console.log('🐱‍👤', process.env.NODE_ENV)
})