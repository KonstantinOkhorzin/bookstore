const createFormData = <T extends object>(data: T): FormData => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (Array.isArray(value)) {
      value.forEach(item => {
        formData.append(`${key}[]`, item.toString());
      });
    } else if (value instanceof File) {
      formData.append(key, value);
    } else {
      formData.append(key, value.toString());
    }
  });

  return formData;
};

export default createFormData;
