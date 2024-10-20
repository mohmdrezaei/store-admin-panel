const setCookie = (data) => {
  document.cookie = `token=${data.token};path=/;max-age=${24 * 60 * 60}`;
};



export { setCookie };
