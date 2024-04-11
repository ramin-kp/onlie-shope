const setCookie = (data) => {
  const { username, email, password, phone } = data;
  console.log(data);
  const userData = btoa(JSON.stringify({ username, email, password, phone }));
  document.cookie = `userData=${userData}; max-age=${30 * 60 * 60}`;
  // username: 'raminkarimpour', email: 'ramin.kp81@gmail.com', password: 'ramin81@', phone: '09142598260'
};

export { setCookie };
