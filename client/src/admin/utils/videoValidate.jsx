
const validateRequiredField = (field, fieldName) => {
    if (!field.trim()) {
      return `${fieldName} no puede estar vacía`;
    }
    return "";
  };
  

export const youtube = (item) => {
    const urlError = validateRequiredField(item.url, "URL");
    if (urlError) return { url: urlError };
  
    const validUrl = /^(https:\/\/youtu\.be\/[a-zA-Z0-9_-]{11}(\?[a-zA-Z0-9=_&%-]*)?|https:\/\/www\.youtube\.com\/watch\?v=[a-zA-Z0-9_-]{11}(&[a-zA-Z0-9=_&%-]*)?)$/;

    if (!validUrl.test(item.url.trim())) {
      return { url: "Formato de URL inválido para YouTube" };
    }
    return {};
  };
  
  export const facebook = (item) => {
    const urlError = validateRequiredField(item.url, "URL");
    if (urlError) return { url: urlError };
  
    const validUrl = /^(https:\/\/www\.facebook\.com\/reel\/[a-zA-Z0-9_-]+|https:\/\/fb\.watch\/[a-zA-Z0-9_-]+\/?)$/;
    if (!validUrl.test(item.url.trim())) {
      return { url: "Formato de URL inválido para Facebook" };
    }
    return {};
  };
  
  export const instagram = (item) => {
    const urlError = validateRequiredField(item.url, "URL");
    if (urlError) return { url: urlError };
  
    const validUrl = /^https:\/\/www\.instagram\.com\/(reel|p|tv)\/[a-zA-Z0-9_-]+\/?$/;
    if (!validUrl.test(item.url.trim())) {
      return { url: "Formato de URL inválido para Instagram" };
    }
    return {};
  };
  