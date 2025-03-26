
class Utils{
    static responder(res, status, success, message=null, results=null){
        res.status(status).json({success, message, results})
    }

}

export default Utils;