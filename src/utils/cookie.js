function setCookie(name, value) {
  const maxAge = 30 * 24 * 60 * 60;
  document.cookie = `${name}=${value}; max-age=${maxAge}; path=/`;
}


function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value?.split(`; ${name}=`);
  if (parts?.length === 2) return parts?.pop()?.split(";")?.shift();
}

function deleteCookie(name) {
  document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export { setCookie , getCookie ,deleteCookie};
