const backendDomain = process.env.REACT_APP_BACKEND_URL;

const SummaryApi = {
  signUp: {
    url: `${backendDomain}/api/signup`,
    method: "post",
  },
  signIn: {
    url: `${backendDomain}/api/signin`,
    method: "post",
  },
  updateUser :{
    url: `${backendDomain}/api/update-user`,
    method: "post",
  },
  userLogout : {
    url: `${backendDomain}/api/userLogout`,
    method: "get",
  },
  allUsers : {
    url: `${backendDomain}/api/all-users`,
    method: "get",
  },
  uploadProduct: {
    url: `${backendDomain}/api/upload-product`,
    method: "post",
  },
  allProduct: {
    url: `${backendDomain}/api/get-products`,
    method: "get",
  },
  updateProduct: {
    url: `${backendDomain}/api/update-product`,
    method: "post",
  },
  categoryProduct: {
    url: `${backendDomain}/api/get-categoryProduct`,
    method: "get",
  },
  categoryWiseProduct: {
    url: `${backendDomain}/api/category-product`,
    method: "post",
  },
};

export default SummaryApi;
