export const getIndexPage = (req, res) => {
  res.status(200).render('index', {
    page_name: 'index',
  });
};
  
export const getAboutPage = (req, res) => {
  res.status(200).render('about', {
    page_name: 'about',
  });
};

export const getRegisterPage = (req, res) => {
  res.status(200).render('register', {
    page_name: 'register',
  });
};

export const getLoginPage = (req, res) => {
  res.status(200).render('login', {
    page_name: 'login',
  });
};

