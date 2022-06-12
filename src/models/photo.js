const {Schema, model} = require('mongoose')

const Photo =  new Schema({ //monta el esquema, permite definir que datos iran
	title: String,
	description: String,
	imageURL: String, //almacena la url que nos dara cloudinary de la foto
	public_id: String //esto lo requiere cloudinary, identificador unico de la imagen dentro de cloudinary, esto pq cloudinary renombra la imagen
})

//Model alparecer no solo montael modelo si no que su fin ultimo es crear una coleccion con ese monbre dentro de la base de datos a la que estamos conectados
module.exports = model('Photo', Photo) //esto ya monta el modelo, recibe dos parametro | 1. nombre del modelo 2.el esquema de este modelo