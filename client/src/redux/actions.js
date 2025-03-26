import axios from "axios";
import { setAuthHeader, adminValidator } from "../Endpoints/axiosUtils";
import { HandlError } from "../Endpoints/HandlerError";

export const LANDING = "LANDING";
export const LANDING_BY_ID = "LANDING_BY_ID";
export const PRODUCT = "PRODUCT";
export const PRODUCT_BY_ID = "PRODUCT_BY_ID";
export const ITEM = "ITEM";
export const CLEAN_STATE = "CLEAN_STATE";
export const ALL_USERS = "ALL_USERS";
export const USER_BY_ID = "USER_BY_ID";
export const IMAGES = "IMAGES";
export const WORKS = "WORKS";
export const WORK_BY_ID = "WORK_BY_ID";
export const ABOUT = "ABOUT";
export const MEDIA = "MEDIA";
export const MEDIA_AD = "MEDIA_AD";
export const MEDIA_BY_ID = "MEDIA_BY_ID";

//*%%%%%%% Rutas libres %%%%%%%%
export const getInfo = (isAdmin) => {
  return async (dispatch) => {
    try {
      const data = await axios("/api/v1/land", adminValidator(isAdmin));
      return dispatch({
        type: LANDING,
        payload: data.data.results,
      });
    } catch (error) {
      console.error(error);
    }
  };
};
export const getInfoById = (id) => {
  return async (dispatch) => {
    try {
      const data = await axios(`/api/v1/land/${id}`, setAuthHeader());
      return dispatch({
        type: LANDING_BY_ID,
        payload: data.data.results,
      });
    } catch (error) {
      HandlError(error);
      console.error(error);
    }
  };
};
export const getProduct = (isAdmin) => {
  return async (dispatch) => {
    try {
      const data = await axios("/api/v1/product", adminValidator(isAdmin));
      return dispatch({
        type: PRODUCT,
        payload: data.data.results,
      });
    } catch (error) {
      HandlError(error);
      console.error(error);
    }
  };
};

export const getMedia = () => {
  return async (dispatch) => {
    try {
      const data = await axios(`/api/v1/media/videos`);
      return dispatch({
        type: MEDIA,
        payload: data.data.results,
      });
    } catch (error) {
      HandlError(error);
      console.error(error);
    }
  };
};

export const getProductById = (id, isAdmin) => {
  return async (dispatch) => {
    try {
      const data = await axios(
        `/api/v1/product/${id}`,
        adminValidator(isAdmin)
      );
      return dispatch({
        type: PRODUCT_BY_ID,
        payload: data.data.results,
      });
    } catch (error) {
      HandlError(error);
      console.error(error);
    }
  };
};
export const getItem = (id, isAdmin) => {
  return async (dispatch) => {
    try {
      const data = await axios(
        `/api/v1/product/item/${id}`,
        adminValidator(isAdmin)
      );
      return dispatch({
        type: ITEM,
        payload: data.data.results,
      });
    } catch (error) {
      HandlError(error);
      console.error(error);
    }
  };
};
export const cleanState = () => {
  return {
    type: CLEAN_STATE,
    payload: [],
  };
};

export const getWorks = (isAdmin) => {
  return async (dispatch) => {
    try {
      const data = await axios("/api/v1/work", adminValidator(isAdmin));
      return dispatch({
        type: WORKS,
        payload: data.data.results,
      });
    } catch (error) {
      HandlError(error);
      console.error(error);
    }
  };
};
export const getWorkById = (id) => {
  return async (dispatch) => {
    try {
      const data = await axios(`/api/v1/work/${id}`, setAuthHeader());
      return dispatch({
        type: WORK_BY_ID,
        payload: data.data.results,
      });
    } catch (error) {
      HandlError(error);
      console.error(error);
    }
  };
};

//*====== Variables de usuario. =======

export const getAllUsers = () => {
  return async (dispatch) => {
    try {
      const data = await axios("/api/v1/user", setAuthHeader());
      return dispatch({
        type: ALL_USERS,
        payload: data.data.results,
      });
    } catch (error) {
      HandlError(error);
    }
  };
};
export const getUserById = (id) => async (dispatch) => {
  try {
    const data = await axios(`/api/v1/user/${id}`, setAuthHeader());
    return dispatch({
      type: USER_BY_ID,
      payload: data.data.results,
    });
  } catch (error) {
    HandlError(error);
  }
};
export const getStoredImgs = () => {
  return async (dispatch) => {
    try {
      const data = await axios("/api/v1/media/imgs", setAuthHeader());
      return dispatch({
        type: IMAGES,
        payload: data.data.results,
      });
    } catch (error) {
      HandlError(error);
    }
  };
};

export const getAdminMedia = () => {
  return async (dispatch) => {
    try {
      const data = await axios(`/api/v1/media/admin/videos`, setAuthHeader());
      return dispatch({
        type: MEDIA_AD,
        payload: data.data,
      });
    } catch (error) {
      HandlError(error);
      console.error(error);
    }
  };
};
export const getMediaById = (id) => {
  return async (dispatch) => {
    try {
      const data = await axios(`/api/v1/media/videos/${id}`, setAuthHeader());
      return dispatch({
        type: MEDIA_BY_ID,
        payload: data.data,
      });
    } catch (error) {
      HandlError(error);
      console.error(error);
    }
  };
};
