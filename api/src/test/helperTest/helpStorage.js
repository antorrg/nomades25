
export const parserImages = (data, isObj)=>{
   return isObj ? image(data): data.map((dt)=>image(dt))
}
const image =(info)=>{
    return {
        id: info.id,
        imageUrl: info.imageUrl
    }
}