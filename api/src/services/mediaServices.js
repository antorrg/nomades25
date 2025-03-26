import { Media } from "../db.js";
import eh from '../utils/errorHandlers.js'
import help from "./helpers.js";



export default {
    createMedia : async(newData)=>{
        const parsedEnable = help.optionImage(newData.enable)
        try {
            const media = await Media.findOne({
                where:{title: newData.title}
            });
            if(media){eh.throwError('Este titulo ya existe', 400)}
            const newMedia = await Media.create({
                title: newData.title,
                type: newData.type,
                text : newData.text,
                url : newData.url,
                enable: Boolean(parsedEnable),
            });
            return newMedia;
        } catch (error) {
            throw error;
        }
    }, 
    getMedia : async(isAdmin)=>{
        try {
            const media = await Media.findAll({
                raw:true,
                where: isAdmin? {}: { enable: true }
            })
            if(media.length===0){eh.throwError('Elemento no hallado', 404)}
            return media;
        } catch (error) {
            throw error;
        }
    },
    getMediaById : async(id)=>{
        try {
            const media = await Media.findByPk(id,{
                raw:true,
            })
            if(!media){eh.throwError('Elemento no hallado', 404)}
            return media;
        } catch (error) {
            throw error;
        }
    },
    updateMedia : async(id, newData)=>{
        const parsedEnable = help.optionImage(newData.enable)
        try {
            const media = await Media.findByPk(id,)
            if(!media){eh.throwError('Elemento no hallado', 404)}
            const newMedia = {
                title: newData.title,
                type: newData.type,
                text : newData.text,
                url : newData.url,
                enable: Boolean(parsedEnable),
            }
            const mediaUpdated = await media.update(newMedia)
           if(!mediaUpdated){eh.throwError('Error al actualizar', 400)}
            return 'Item actualizado correctamente';
        } catch (error) {
            throw error;
        }
    },
    deleteMedia : async(id)=>{
        try {
            const media = await Media.findByPk(id,)
            if(!media){eh.throwError('Elemento no hallado', 404)}
            await media.destroy()
            return 'Item borrado exitosamente'
        } catch (error) {
            throw error;
        }
    }
}