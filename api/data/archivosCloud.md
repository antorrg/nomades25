¡Genial! Te explicaré cómo usar **Docker** para contenedorar tu backend de **Node.js con Express y Firestore** y luego desplegarlo en **Cloud Run**.  

Docker te permitirá:  
✅ Ejecutar tu aplicación en cualquier entorno sin preocuparte por dependencias.  
✅ Desplegar de forma más fácil en Google Cloud Run.  
✅ Mantener el mismo entorno en desarrollo y producción.  

---

# **🚀 Paso a paso: Dockerizando tu backend**
Primero, asegúrate de tener **Docker instalado**:  
- **Windows & Mac**: [Descargar Docker Desktop](https://www.docker.com/products/docker-desktop)  
- **Linux** (Ubuntu):  
  ```sh
  sudo apt update
  sudo apt install docker.io
  ```

## **📌 1. Crear el `Dockerfile`**
Dentro de tu carpeta del backend (`firebase-backend/`), crea un archivo llamado `Dockerfile` sin extensión:

```dockerfile
# 1️⃣ Usamos una imagen de Node.js como base
FROM node:18

# 2️⃣ Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# 3️⃣ Copiamos los archivos de dependencias y los instalamos
COPY package.json package-lock.json ./
RUN npm install

# 4️⃣ Copiamos el resto del código
COPY . .

# 5️⃣ Exponemos el puerto que usará el contenedor
EXPOSE 5000

# 6️⃣ Comando para iniciar el servidor
CMD ["node", "server.js"]
```

---

## **📌 2. Crear el `.dockerignore`**
Para evitar que archivos innecesarios se copien al contenedor, crea un archivo `.dockerignore`:

```
node_modules
serviceAccountKey.json
.env
```

---

## **📌 3. Construir y ejecutar el contenedor localmente**
Dentro de la carpeta del backend, ejecuta:

```sh
docker build -t firebase-backend .
```

🔹 **Explicación:**  
- `docker build`: Construye la imagen.  
- `-t firebase-backend`: Le damos un nombre a la imagen (`firebase-backend`).  
- `.`: Indica que el `Dockerfile` está en el directorio actual.

📌 **Ejecutar el contenedor** en tu máquina:

```sh
docker run -p 5000:5000 firebase-backend
```

🔹 **Explicación:**  
- `docker run`: Inicia un contenedor basado en la imagen.  
- `-p 5000:5000`: Mapea el puerto 5000 del contenedor al puerto 5000 de tu PC.  
- `firebase-backend`: Nombre de la imagen a ejecutar.  

Si ves **"Servidor en http://localhost:5000"**, ¡ya funciona con Docker! 🎉  

---

# **🌎 Desplegar en Google Cloud Run**
Ahora que tenemos Docker funcionando, subiremos nuestra imagen a **Google Cloud Container Registry** y la desplegaremos en **Cloud Run**.

## **📌 4. Autenticarse en Google Cloud**
Asegúrate de haber iniciado sesión en Google Cloud y de tener un proyecto creado:

```sh
gcloud auth login
gcloud config set project TU_PROYECTO_ID
```

Habilita los servicios necesarios:

```sh
gcloud services enable run.googleapis.com containerregistry.googleapis.com
```

## **📌 5. Subir la imagen a Google Container Registry**
1️⃣ **Autenticar Docker con Google Cloud**:
```sh
gcloud auth configure-docker
```

2️⃣ **Construir y subir la imagen a Google Cloud**:
```sh
docker build -t gcr.io/TU_PROYECTO_ID/firebase-backend .
docker push gcr.io/TU_PROYECTO_ID/firebase-backend
```

---

## **📌 6. Desplegar en Cloud Run**
```sh
gcloud run deploy firebase-backend \
  --image gcr.io/TU_PROYECTO_ID/firebase-backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

🔹 **Explicación:**  
- `gcloud run deploy`: Desplegar en Cloud Run.  
- `--image`: Imagen que subimos a Google Cloud.  
- `--region us-central1`: Región donde se ejecutará.  
- `--allow-unauthenticated`: Permite acceso sin autenticación (para pruebas).  

Si todo sale bien, te dará una URL pública como:
```
https://firebase-backend-xyz-uc.a.run.app
```

---

# **🚀 Ahora, tu backend está en Cloud Run**
Desde React puedes hacer peticiones a esta URL:

```js
const fetchImages = async () => {
    const res = await fetch("https://firebase-backend-xyz-uc.a.run.app/images");
    const data = await res.json();
    console.log(data);
};
```

---

# **📌 Comandos útiles de Docker**
🔹 **Ver contenedores en ejecución:**
```sh
docker ps
```
🔹 **Detener un contenedor:**
```sh
docker stop ID_DEL_CONTENEDOR
```
🔹 **Eliminar una imagen:**
```sh
docker rmi firebase-backend
```
🔹 **Eliminar contenedores detenidos:**
```sh
docker system prune -f
```

---

# **💡 Conclusión**
✅ **Docker facilita la portabilidad y despliegue** en Google Cloud.  
✅ **Cloud Run permite escalar automáticamente** y pagar solo por el uso.  
✅ **Con React, solo llamas a los endpoints** en lugar de conectar directamente con Firestore.  

🔥 **¿Quieres que agreguemos autenticación con Firebase Auth para proteger el CRUD?** 😃