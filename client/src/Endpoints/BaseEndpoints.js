import axios from 'axios'
import {showSuccess, HandlError} from "./HandlerError"

const handleError = HandlError


class Endpoints {
  constructor(baseURL, validHeader = false) {
    this.baseURL = baseURL;
    this.validHeader = validHeader;
  }

  setAuthHeader() {
    const token = localStorage.getItem('validToken');
    const config = { 
      headers: {},
      //withCredentials: true
     };
    if (token && this.validHeader) {
      Object.assign(config.headers, {
        'x-access-token': `${token}`
      });
    }
    return config;
  }

  async get(endpoint, params = {}, auxFunction = null, admin = false) {
    try {
      const config = admin ? this.setAuthHeader() : {};
      const response = await axios.get(`${this.baseURL}/${endpoint}`, {
        ...config,
        params, // Agrega los parámetros como query string
      });
      if (auxFunction) await auxFunction();
      return response.data.results;
    } catch (error) {
      handleError(error);
      //console.error('Error en GET:', error);
    }
  }


  async post(endpoint, data = {}, auxFunction = null, admin = false, rejectFunction = null, message= 'Operación exitosa') {
    try {
      const config = admin ? this.setAuthHeader() : {};
      const response = await axios.post(`${this.baseURL}/${endpoint}`, data, config);
      showSuccess(message);
      if (auxFunction) await auxFunction();
      return response.data;
    } catch (error) {
      handleError(error);
      if(rejectFunction) await rejectFunction()
      //console.error('Error en POST:', error);
    }
  }

  async put(endpoint, data = {}, auxFunction = null, admin = false, rejectFunction= null, message = 'Actualización exitosa') {
    try {
      const config = admin ? this.setAuthHeader() : {};
      const response = await axios.put(`${this.baseURL}/${endpoint}`, data, config);
      showSuccess(message);
      if (auxFunction) await auxFunction();
      return response.data;
    } catch (error) {
      handleError(error);
      if(rejectFunction) await rejectFunction()
      //console.error('Error en PUT:', error);
    }
  }

  async delete(endpoint, auxFunction = null, admin = false, rejectFunction= null, message= 'Eliminación exitosa') {
    try {
      const config = admin ? this.setAuthHeader() : {};
      const response = await axios.delete(`${this.baseURL}/${endpoint}`, config);
      showSuccess(message);
      if (auxFunction) await auxFunction();
      return response.data;
    } catch (error) {
      handleError(error);
      if(rejectFunction) await rejectFunction()
      //console.error('Error en DELETE:', error);
    }
  }
}

export default Endpoints;
