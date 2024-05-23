const setCookie = (data) => {
  const { username, email, password, phone, role,id } = data;
  const userData = btoa(
    JSON.stringify({ username, email, password, phone, role,id })
  );
  document.cookie = `userData=${userData}; max-age=${30 * 60 * 60}`;
};
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return JSON.parse(atob(parts.pop().split(";").shift()));
  }
};

const deleteCookie = (name) => {
  document.cookie = name + "=; Max-Age=-99999999;";
};
export { setCookie, getCookie, deleteCookie };
