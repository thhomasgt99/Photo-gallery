const {Router} = require('express')// enrutador de express | este router servira para crear un objeto o enrutador que me permita generar rutas
const router = Router()

const Photo =  require('../models/photo') //traemos el modelo que nos servira para consultar la base de datos, insertar datos  etc en la base de datos		

const cloudinary = require('cloudinary')
cloudinary.config({  //este config es para hacer una especie de login el los servicios de cloudinary a travez de la biblioteca que nos da ese cervicio y que instalmos
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  // este es el nombre de nuestra nube, no lo da cloudinary y esta en las variables de entorno
	api_key:process.env.CLOUDINARY_API_KEY , //estos datos entran en string
	api_secret: process.env.CLOUDINARY_API_SECRET   //esto es una clave que parece que es para poder conectarse a cloudynary | qui ya estariamos autenticados
})

const fs =  require('fs-extra') // permite saver donde estan los archivos en el sistema operativo y poder hacer manupulaciones 

router.get('/', async (req, res)=>{
	const photos = await Photo.find().lean()//esto es para las info de las fotos que tenemos almacenados en mongo en este caso, no estan las fotos como tal pero si la url de la foto en cloudinary
	console.log(photos)
	res.render('images', {photos: photos})  //no nosesito ponerle la extencion .hbs ni la ruta pq esto ya fue configurado en algun aldo | es segundo argumento es para pasarle esa info a esa vista
})	
router.get('/images/add', async(req,res)=>{
	const photos =await  Photo.find().lean()//esto es para las info de las fotos que tenemos almacenados en mongo en este caso, no estan las fotos como tal pero si la url de la foto en cloudinary
	res.render('image_form',{photos}) //no nosesito ponerle la extencion .hbs ni la ruta pq esto ya fue configurado en algun aldo
})

router.post('/images/add',async (req, res)=>{
	const {title, description} = req.body  //req.body es el objeto que recogio la info del formulario, esto es posible pq en el archivo app existen unos midelwares configurados para esto, todo gracias a express
	console.log(req.file) //multer es el que va a tomar los archivos imagenes en este caso que llegan del formulario y nos entrega este objeto 
	const result =  await cloudinary.v2.uploader.upload(req.file.path) //esto es para subir al imagen seleccionada a cloudynari ya como tal |cloudinary.v2  esto es para decirle que utilizaremos la version2 de su biblioteca| uploader.upload() esto sera para mandar ala imagen
													//upload() recive una direccion de donde esta la imagen |al suvir laimagen debuelve un objeto de cloudynari con la info de la subida de al imagen
	console.log(result)
	const newPhoto =  new Photo({
		title: title,
		description:description,
		imageURL: result.url,  //esta url es la url de la imagen en cloudinary que devulve en el objeto que llega como respuesta al momento de subir la imagen
		public_id : result.public_id //este id tambien lo da cloudinary en el objeto de respuesta
	})
	await	newPhoto.save() //esto guarda en nuestra base de datos pero no la imagen si no pura info la del anterior prototypo Photo alparecer
	await fs.unlink(req.file.path)	//a travez  file sistem  vamos a eliminar la imagen del servidor local |unlink elimina archivos, recive una direccion
	res.redirect('/')
})

router.get("/images/delete/:photo_id", async(req, res)=>{ //esto es para eliminar aunque no sea un metodo delete
	const {photo_id } =  req.params	
	const photo = await Photo.findByIdAndDelete(photo_id) //esto elimina en mongo
	const result =  await cloudinary.v2.uploader.destroy(photo.public_id) //esto es para eliminar la foto pero ya en cloudinary
	console.log(result)
	res.redirect('/images/add')
})

module.exports = router

