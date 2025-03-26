import axios from "axios";
import * as toast from "../../Endpoints/HandlerError";
import { setAuthHeader } from "../../Endpoints/axiosUtils";

export const updateProduct = async (id, product, onClose, onRetry) => {
  console.log(id);
  try {
    const response = await axios.put(
      `/api/v1/product/${id}`,
      product,
      setAuthHeader()
    );
    if (response.status === 200) {
      toast.showSuccess("Producto actualizado correctamente");
      await onClose(); // Cierra el modal después de guardar los cambios
    }
  } catch (error) {
    toast.HandlError(error);
    onRetry();
    console.error("Error al actualizar el producto:", error);
  }
};

export const updateItem = async (id, item, onClose, onRetry) => {
  try {
    const response = await axios.put(
      `/api/v1/product/item/${id}`,
      item,
      setAuthHeader()
    );
    if (response.status === 200) {
      //await axios(`/api/v1//media/imgs/${imgId}`)
      toast.showSuccess("Item actualizado correctamente");
      await onClose(); // Cierra el modal después de guardar los cambios
    }
  } catch (error) {
    onRetry();
    toast.HandlError({ error: error.message });
    console.error("Error al actualizar el item:", error);
  }
};
export const createProduct = async (product, onClose, onRetry) => {
  try {
    const response = await axios.post(
      `/api/v1/product/create`,
      product,
      setAuthHeader()
    );
    if (response.status === 201) {
      toast.showSuccess("Producto creado correctamente");
      await onClose(); // Cierra el modal después de guardar los cambios
    }
  } catch (error) {
    onRetry();
    toast.HandlError(error);
    //console.error("Error al crear el producto:", error);
  }
};

export const createItem = async (item, onClose, onRetry) => {
  try {
    const response = await axios.post(
      `/api/v1/product/item/create`,
      item,
      setAuthHeader()
    );
    if (response.status === 201) {
      toast.showSuccess("Item creado correctamente");
      await onClose(); // Cierra el modal después de guardar los cambios
    }
  } catch (error) {
    toast.HandlError({ error: error.message });
    onRetry();
    console.error("Error al crear el item:", error);
  }
};
export const deleteProduct = async (id, onClose, onRetry) => {
  console.log(id);
  try {
    const response = await axios.delete(
      `/api/v1/product/${id}`,
      setAuthHeader()
    );
    if (response.status === 200) {
      toast.showSuccess("Producto borrado correctamente");
      await onClose(); // Cierra el modal después de guardar los cambios
    }
  } catch (error) {
    onRetry();
    toast.HandlError(error);
  }
};
export const deleteItem = async (id, onClose, onRetry) => {
  try {
    const response = await axios.delete(
      `/api/v1/product/item/${id}`,
      setAuthHeader()
    );
    if (response.status === 200) {
      toast.showSuccess("Item eliminado correctamente");
      await onClose(); // Cierra el modal después de guardar los cambios
    }
  } catch (error) {
    toast.HandlError(error);
    onRetry();
  }
};
//Endpoints media
export const deleteImage = async (id, onClose, onRetry) => {
  console.log(id);
  try {
    const response = await axios.delete(
      `/api/v1/media/imgs/${id}`,
      setAuthHeader()
    );
    if (response.status === 200) {
      toast.showSuccess("Imagen eliminada correctamente");
      await onClose(); // Cierra el modal después de guardar los cambios
    }
  } catch (error) {
    toast.HandlError(error);
    onRetry();
  }
};
