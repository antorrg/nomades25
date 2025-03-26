/* istanbul ignore file */
import rateLimit from "express-rate-limit";




export const createLogLimiter = (maxAttempts = 5) => {
  return rateLimit({
    windowMs: 2 * 60 * 1000, // 2 minutos de espera
    max: maxAttempts, // Máximo de intentos personalizados
    handler: (req, res, next) => {
      const remainingTime = Math.ceil((req.rateLimit.resetTime - Date.now()) / 1000); // Calcula el tiempo restante en segundos
      res.status(429).json( `Demasiados intentos. Intenta nuevamente en ${remainingTime} segundos.`,
      );
    },
    standardHeaders: true, // Devuelve las cabeceras estándar (RateLimit-*).
    legacyHeaders: false, // Desactiva las cabeceras X-RateLimit-*.
  });
};




