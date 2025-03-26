import {Work} from '../db.js'
import eh from '../utils/errorHandlers.js'
import * as cloud from './storage.js'
import help from './helpers.js'



export default {
    createWork : async(newData)=>{
        const useImgs = help.optionImage(newData.useImg)
        try {
            const work = await Work.findOne({where: {title: newData.title}})
            if(work){eh.throwError('Este titulo ya existe', 400)}
            if(useImgs){await cloud.deleteImage(newData.image, false)}
            const newArticle =  await Work.create({
                    title: newData.title,
                    text: newData.text,
                    image: newData.image
            });
            return newArticle;
        } catch (error) {
        throw error;
        }
    },
    getWork : async(admin)=>{
        try {
            const work = await Work.findAll({
                raw:true,
                where: admin ? {} :{ enable: true },
            })
            if(!work){eh.throwError('Error server', 500)}
            if(work.length===0){return [{id: 1, title: 'No hay titulo', text: 'No hay texto', image: ''}]}
            return work;
        } catch (error) {
        throw error;
        }
    },
    workById: async(id)=>{
        try {
            const work = await Work.findByPk(id)
            if(!work){eh.throwError('Articulo no hallado',404)}
            return work;
        } catch (error) {
        throw error;
        }
    },
    updWork : async(id, newData)=>{
        const options = help.optionImage(newData.saver)
        const useImgs = help.optionImage(newData.useImg)
        const enabledParsed = help.optionImage(newData.enable)
        let imageUrl= ''
        try {
            const work = await Work.findByPk(id)
            if(!work){eh.throwError('Articulo no hallado',404)}

            //Capturar imagen y resolver posible actualizacion
            const originalImage = work.image;
            const isImageChanged = originalImage !== newData.image;
            isImageChanged ? imageUrl = originalImage: ''
            if(useImgs){await cloud.deleteImage(newData.image, false)}
            const newWork = {
                title: newData.title,
                text: newData.text,
                image: newData.image,
                enable: enabledParsed
            }
            const updWork = work.update(newWork)
            if (isImageChanged && imageUrl?.trim()) {
                await cloud.oldImagesHandler(imageUrl, options);
            }
            return updWork;
        } catch (error) {
        throw error;
        }
    },
    delWork : async(id)=>{
        try {
            const work = await Work.findByPk(id)
            if(!work){eh.throwError('Articulo no hallado',404)}
            const imageUrl = work.image;
            await work.destroy();
            if(imageUrl?.trim()){
            await cloud.deleteFromCloudinary(imageUrl);}
            
             return  'Item borrado exitosamente'
            
        } catch (error) {
        throw error;
        }
    }
}