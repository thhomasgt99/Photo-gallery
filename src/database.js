const mongoose= require("mongoose");

console.log(process.env.MONGODB_URI )        //process.env es un objeto que nos provee node para poder importar variables de entorno

mongoose.connect(process.env.MONGODB_URI,{ //este metodo es alparecer para conectarnos a mongo | recibe un parametro que es la direccion de mongo | MONGODB_URI es una variable de entorno y  crea la coleccion de la base de datos ya que no esxiste, solo lo hace una vez pq luego ya la tendra
	useNewUrlParser: true    //esta es una congiguracion de mongoose para que no lance un erros por consola
})
	.then(db => console.log('DB ESTA CONECTADO 👍')) //esto es para que una vez se conecte a mongo nos muestre un mensaje por consola | le llega un objeto db pero no lo utilizaremos
	.catch(err=> console.log(err))//por si ocurre un error lo mostrara


