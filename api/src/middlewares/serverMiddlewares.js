import eh from "../utils/errorHandlers.js"

export default {
    errorEndWare :(err, req, res, next)=>{
        const status = err.status || 500;
        const message = err.message || 'Server error';
        console.error(err.stack)
        res.status(status).json({
            success: false,
            message: message,
            results: 'failed'
        })
    },
    lostRoute :(req, res, next)=> {
        return next(eh.middError("Ruta no encontrada", 404))
    },
    
    validJson : (err, req, res, next)=>{
        if(err instanceof SyntaxError && err.status === 400 && 'body' in err){
            return next(eh.middError("Formato JSON invalido", 400))
        }else{next()};
    },
    // sanitizeBody : [
    //     body('*').trim().escape(), // Sanea todos los campos del cuerpo de la solicitud
    //     (req, res, next) => {
    //       const errors = validationResult(req);
    //       if (!errors.isEmpty()) {
    //         return res.status(400).json({ errors: errors.array() });
    //       }
    //       next();
    //     }
    //   ],
      
    //   sanitizeQuery : [
    //     query('*').trim().escape(), // Sanea todos los parámetros de consulta
    //     (req, res, next) => {
    //       const errors = validationResult(req);
    //       if (!errors.isEmpty()) {
    //         return res.status(400).json({ errors: errors.array() });
    //       }
    //       next();
    //     }
    //   ],
}