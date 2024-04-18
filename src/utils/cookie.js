const setCookie = (data) => {
  const { username, email, password, phone } = data;
  const userData = btoa(JSON.stringify({ username, email, password, phone }));
  document.cookie = `userData=${userData}; max-age=${30 * 60 * 60}`;
};

export { setCookie };
