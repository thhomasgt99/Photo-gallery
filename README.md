# Photo-gallery
---
## Descripcion
##### *Nota: para arrancar la app se deve activar mongo en una terminal paralela con el comando mongod, luego se corre en otra consola el comando npm run dev*

#### *Nota: las variables de entorno no estan subidas*
- si se corre start en cambio de dev no inicia, no se pq pasa.
## dependencias
- express
- express-handlebars   -> motor de plantillas como pug | utilizar la verion 3.1.0 
- morgan               -> para ver en la consola las peticiones http que van llegando
- multer               -> para poder subir las imagenes de los formularios de html al server
- mongoose						 -> para conectarnos a mongo y modelar los datos
- cloudinary           -> modulo de claudinary para asar las images de nuetro server a los servers de claudinary
- dotenv						   -> permite leer los archivos llamados .env
- cross-env						 -> Nos permite definir nuestro entorno de desarrollo en multiples plataformas ya sea windows etc, esto para despues poder identificar de donde va a sacar las variables de entorno
## dependencias de desarrollo
- nodemon              -> para mantener el server
