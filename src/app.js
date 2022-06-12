const express = require("express");
const morgan = require("morgan");
const multer = require("multer");
const path  = require("path");
const exphbs = require("express-handlebars");

// Initializations
const app = express() //este es el server tambien es un objeto
require('./database') //trae la conexion de la base de datos, No se pq trae esta sintax

// Settings server
app.set('port', process.env.PORT || 3000) //puerto 	en el que se ejecutara
app.set('views', path.join(__dirname, 'views')) //configura la ubicacion de las vistas a travez del modulo path que viene de node | __dirname es una varible que recoje la ruta hasta src 
app.engine('.hbs', exphbs({  //configuracion del motor de plantillas | .hbs es la extencion, exphbs sera el motor de plantilla
	defaultLayout: 	'main',					//configuraciones del motor de plantillas | defaultLayout es para indicar el html que contiene las partes en comun, cosas como la navegacion y el footer 
	layoutDir: path.join(app.get('views'), 'layouts'), //direccion de la carpeta layout
	partialsDir: path.join(app.get('views'), 'partials'), //direccion de la carpeta partials
	extname:'.hbs' //extencion
}))

app.set('view engine','.hbs') //utilizamos nuestro motor de plantillas

// Middelwares 
app.use(morgan('dev')) //ejecutamos morgan que es un middlewares, con la propiedad dev que es para que envie mensajes cortos por la consola
app.use(express.json()) //esto sirve para que express pueda entender los json, pero no se como puede ser que funcione esta linea
app.use(express.urlencoded({extended: false})) //esto dirve para que pueda enterder los datos que le llegan del un formulario, pero solo datos no archivos pesados, para eso es multer | extended false, para que solo entienda string alparecer
const storage =  multer.diskStorage({ //configuraciones de multer, por ejemplo el peso maximo, mobres de las imagenes etc
	destination: path.join(__dirname, 'public/uploads'),   //esto es en donde queremos que coloque la imagen cuando un user suba una | esta carpeta multer la crea por nosotros
	filename: (req, file, cb)=>{ //esta recibe tre parametros y sirve pq esta funcion es capas de tener informacion de esa imagen y tambien modificarla alparecer
		cb(null, new Date().getTime() + path.extname(file.originalname))//este callback recibe dos parametros y es para terminar con la funcion | los parametro son errores y el filename, filename si lo cambiaremos para que le cambie el nobre a las imagenes para no tener imagenes repetidas | getTime da la fecha en milisegundos, anbse a ese dato nombraremos las imagenes
																																		//path.extname(file.originalname) lo utilizaremos para extraer la extencion del originalnomber y alparecer lo transforma en .png
	}
})
app.use(multer({storage: storage}).single('image'))	//vera cada vez que enviamos datos al cervidor si estamos enviando imagenes, si es una imagen podra interpretarla y ponerla dentro de nuestro server
																	//el single es pq multer nesesita que le especifiquen que campo del formulario tiene que examinar cada vez que le enviemos imagenes


// Routes
app.use(require('./routes/index')) //esta linea trae el arcchivo que creo todas las rutas

module.exports = app