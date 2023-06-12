# Usar la imagen oficial de Node.js alpine
FROM node:alpine

# Definir el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Exponer el puerto por el cual la aplicación se ejecuta
EXPOSE 8082

# Comando para iniciar la aplicación
CMD ["npm", "run" , "dev"]
