import { deleteFromCloudinary } from '../utils/cloudinary.js'
import eh from './../utils/errorHandlers.js'
import {Image} from '../db.js'


//*Funcion principal (la que se exporta y dirige las acciones)
//* isRedirect response a un parametro (saver) true o false
const oldImagesHandler = (imageUrl, isRedirect)=>{
  return isRedirect ? resaveImageFromStorage(imageUrl) : deleteFromCloudinary(imageUrl)
}

// Funcion para guardar imagen de Storage
const resaveImageFromStorage = async(imageUrl)=>{
  try {
    //verificar si la imagen existe
    const image = await Image.findOne({where: {imageUrl : imageUrl}})
    if (image)   eh.throwError("Esta imagen ya fue guardada", 400);
   
    // Reubicar la imagen en firestore:
    const docRef = await Image.create({
      imageUrl: imageUrl
    });
    if (!docRef) {
      eh.throwError("Error inesperado en el servidor", 500);
    }
    
    return docRef
  } catch (error) {
    throw error;
  }
};
const deleteImage = async(data, isId)=>{
  try {
    const image = isId? await Image.findByPk(data) : await Image.findOne({where: {imageUrl:data}})
    if (!image) { eh.throwError('Imagen no hallada', 404)}
    await image.destroy();
    console.log('imagen borrada')
    return "Imagen borrada exitosamente";
  } catch (error) { console.error('no se pudo borrar'); throw error;}
  
}

const getImages = async()=>{
  try {
    const images = await Image.findAll()
    if(!images){eh.throwError('Server error in Images', 500)}
    if(images.length===0){return [{id: 1, imageUrl : 'https://res.cloudinary.com/dt1lpgumr/image/upload/c_scale,w_auto/f_auto,q_auto/verde1.webp?_a=BAMAH2TE0'}]}
    return images;
  } catch (error) {
    throw error;
  }
}


  const processImageUpdate = async (currentImage, options) => {
    try {
            const oldImageResult = await oldImagesHandler(currentImage, options);
            if (!oldImageResult) {
                eh.throwError('Error al procesar imagen antigua', 500);
            }
    } catch (error) {
        console.error(error.message)
        throw error;
    }
};
export {
oldImagesHandler,
deleteImage,
deleteFromCloudinary,
getImages,
processImageUpdate
}