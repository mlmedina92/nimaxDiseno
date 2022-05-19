
Descripcion del proyeto:
El siguiente sitio web de Nimax piletas tiene como objetivo la publicidad del local, ganar mayor insercion en el mercado.
El usuario puede ver los accesorios y modelos disponibles de piletas, seleccionar los que les interesen. Los mismos se van a cargar en el carrito de compras , se mostraria un resumen del mismo y desde alli puede comunicarse con el whatap de la empresa para tener mas detalles y continuar habalando directamente con el vendedor.

 COMO EMPEZAR A COMPILAR SASS INTALACION:
1)NODE.JS:
- descargar de la pag oficial e instalar
-abrir la consola parandote en la carpeta de tu repo
-npm init


1.abrir la cnsola en esta carpeta ctrl+ ñ
 a. npm install nodemon node-sass (esto es una vez x proyecto nuevo x carpeta nueva) 
 B. npm init 
 (me crea el archivo .json y la carpeta node modules---te dice 0 vulnerabityses)

2. abrir el archivo package.json y editarlo:
 a. A continuacion de && exit 1"colocar una, presionar enter y copiar el sig texto:
(un comando es que construya y q lo mire)
 "build-css": "node-sass --include-path scss scss/main.scss css/style.css",
 "watch-css": "nodemon -e scss -x \"npm run build-css\""

 3. crear las carpetas (scss y css) y sus respectivos archivos:(main.scss style.css)
  a. scss/main.scss
  b. css/style.css
 
 4. en la consola correr el comando:
  a. npm run build-css //por unica vez x proyecto (q nos construay el css, nos tiene q aparecer todo en verde)
  b. npm run watch-css

  5. cada cez q quiero seguir complilando en sass
   a. abrir la consola
   b. npm run watch-css

