import { validate as uuidValidate, version as uuidVersion } from 'uuid';


function middError (message, status = 500){
  const error = new Error(message);
  error.status = status;
  return error;
}
const validateBoolean = (value) => {
  if (typeof value === 'boolean') return value;
  if (value === 'true') return true;
  if (value === 'false') return false;
  throw new Error('Invalid boolean value');
};

const validateInt = (value) => {
  const intValue = Number(value, 10);
  if (isNaN(intValue)|| !Number.isInteger(intValue)) throw new Error('Invalid integer value');
  return intValue;
};

const validateFloat = (value) => {
  const floatValue = parseFloat(value);
  if (isNaN(floatValue)) throw new Error('Invalid float value');
  return floatValue;
};
const validateFields = (requiredFields = []) => {
  return (req, res, next) => {
    const newData = req.body;

    if (!newData || Object.keys(newData).length === 0) {
      return next(middError('Invalid parameters', 400));
    }

    const missingFields = requiredFields.filter(field => !(field.name in newData));
    if (missingFields.length > 0) {
      return next(middError(`Missing parameters: ${missingFields.map(f => f.name).join(', ')}`, 400));
    }

    try {
      requiredFields.forEach(field => {
        const value = newData[field.name];
        switch (field.type) {
          case 'boolean':
            newData[field.name] = validateBoolean(value);
            break;
          case 'int':
            newData[field.name] = validateInt(value);
            break;
          case 'float':
            newData[field.name] = validateFloat(value);
            break;
          case 'string':
          default:
            if (typeof value !== 'string') {
              throw new Error(`Invalid string value for field ${field.name}`);
            }
            newData[field.name] = value;
        }
      });
      // Filtrar campos adicionales no permitidos
      Object.keys(newData).forEach(key => {
        if (!requiredFields.some(field => field.name === key)) {
          delete newData[key];
        }
      });
    } catch (error) {
      return next(middError(error.message, 400));
    }

    req.body = newData;
    next();
  };
};

// Ejemplo de uso:
// validateFields([{ name: 'email', type: 'string' }, { name: 'id', type: 'int' }, { name: 'price', type: 'float' }, { name: 'enable', type: 'boolean' }]);

 
const validateFieldsWithItems = (requiredFields = [], secondFields = [], arrayFieldName) => {
  return (req, res, next) => {
    try {
      // Copiar datos del body
      const firstData = { ...req.body }; // Datos principales
      const secondData = Array.isArray(req.body[arrayFieldName])
        ? [...req.body[arrayFieldName]] // Array dinámico
        : null;

      // Validar existencia de `firstData`
      if (!firstData || Object.keys(firstData).length === 0) {
        return next(middError("Invalid parameters", 400));
      }

      // Verificar campos faltantes en `firstData`
      const missingFields = requiredFields.filter((field) => !(field.name in firstData));
      if (missingFields.length > 0) {
        return next(middError(`Missing parameters: ${missingFields.map(f => f.name).join(", ")}`, 400));
      }

      try {
        requiredFields.forEach(field => {
          const value = firstData[field.name];
          switch (field.type) {
            case 'boolean':
              firstData[field.name] = validateBoolean(value);
              break;
            case 'int':
              firstData[field.name] = validateInt(value);
              break;
            case 'float':
              firstData[field.name] = validateFloat(value);
              break;
            case 'string':
            default:
              if (typeof value !== 'string') {
                throw new Error(`Invalid string value for field ${field.name}`);
              }
              firstData[field.name] = value;
          }
        });

        // Filtrar campos adicionales no permitidos en `firstData`
        Object.keys(firstData).forEach(key => {
          if (!requiredFields.some(field => field.name === key)) {
            delete firstData[key];
          }
        });
      } catch (error) {
        return next(middError(error.message, 400));
      }

      // Validar existencia y estructura de `secondData`
      if (!secondData || secondData.length === 0) {
        return next(middError(`Missing ${arrayFieldName} array or empty array`, 400));
      }

      // Validar contenido de `secondData` (no debe contener strings)
      const invalidStringItems = secondData.filter((item) => typeof item === "string");
      if (invalidStringItems.length > 0) {
        return next(
          middError(
            `Invalid "${arrayFieldName}" content: expected objects but found strings (e.g., ${invalidStringItems[0]})`,
            400
          )
        );
      }

      // Validar cada objeto dentro de `secondData`
      const validatedSecondData = secondData.map((item, index) => {
        const missingItemFields = secondFields.filter((field) => !(field.name in item));
        if (missingItemFields.length > 0) {
          throw middError(
            `Missing parameters in ${arrayFieldName}[${index}]: ${missingItemFields.map(f => f.name).join(", ")}`,
            400
          );
        }

        // Validar tipos de campos en cada `item`
        secondFields.forEach(field => {
          const value = item[field.name];
          switch (field.type) {
            case 'boolean':
              item[field.name] = validateBoolean(value);
              break;
            case 'int':
              item[field.name] = validateInt(value);
              break;
            case 'float':
              item[field.name] = validateFloat(value);
              break;
            case 'string':
            default:
              if (typeof value !== 'string') {
                throw new Error(`Invalid string value for field ${field.name} in ${arrayFieldName}[${index}]`);
              }
              item[field.name] = value;
          }
        });

        // Filtrar campos adicionales en cada `item`
        return secondFields.reduce((acc, field) => {
          acc[field.name] = item[field.name];
          return acc;
        }, {});
      });

      // Actualizar `req.body` con datos validados
      req.body = {
        ...firstData,
        [arrayFieldName]: validatedSecondData, // Asignar dinámicamente
      };

      // Continuar al siguiente middleware
      next();
    } catch (err) {
      return next(middError(err.message, 400)); // Manejar errores
    }
  };
};

const validateRegex = (validRegex, nameOfField, message=null)=>{
  return (req, res, next)=>{
    if(!validRegex || !nameOfField || nameOfField.trim() === ""){
      return next(middError('Missing parameters in function!', 400))
    }
    const field = req.body[nameOfField]
    //console.log('soy field', field)
    const personalizedMessage = message? " "+message :"";
    if(!field || typeof field !== "string" || field.trim()===""){
      return next(middError("Missing parameter in body",404))
    }
    if(!validRegex.test(field)){
      return next(middError(`Invalid ${nameOfField} format!${personalizedMessage}`, 400))
    }
    next()
  }
}
//const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//const passwordRegex = /^(?=.*[A-Z]).{8,}$/; // Al menos 8 caracteres y una letra mayúscula

const middUuid = (req, res, next) => {
  const { id } = req.params;
  if (!id) {eh.throwError('Falta el id',400)}
  if (!uuidValidate(id)) {eh.throwError('Parametros no permitidos', 400)}
  next();
  };

const middIntId = (req, res, next) => {
  const { id } = req.params;
  if (!id) {return next(middError('Falta el id', 400))}
  const idIsNumber = Number.isInteger(Number(id));
  if (!idIsNumber) {return next(middError('Parametros no permitidos', 400))}
  next();
  };

const chusmiemos = (req, res, next)=>{
  const pepe = req.body;
  console.log('Estoy chusmeando: ',pepe)
  next()
}
export {
  validateFields,
  validateFieldsWithItems,
  validateRegex,
  middUuid,
  middIntId,
  chusmiemos
}