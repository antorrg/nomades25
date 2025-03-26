
export default {
    catchAsync : (controller)=>{
        return (req, res, next)=>{
            return controller(req, res, next).catch(next);
        }
    },
    throwError : (message, status, code = null, log = false) =>{
        const error = new Error(message);
        error.status = status;
        if (code) error.code = code;
        if (log) console.error(error); // Ejemplo de logging simple
        throw error;
      },
    middError : (message, status)=>{
        const error = new Error(message);
        error.status = status;
        return error;
    }

}