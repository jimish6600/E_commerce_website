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
  userDetails : {
    url: `${backendDomain}/api/user-details`,
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

  productDetails: {
    url: `${backendDomain}/api/product-details`,
    method: "post",
  },

  addToCartProduct: {
    url: `${backendDomain}/api/addtocart`,
    method: "post",
  },
  addToCartProductCount: {
    url: `${backendDomain}/api/countAddToCartProduct`,
    method: "get",
  },

  addToCartProductView: {
    url: `${backendDomain}/api/view-cart-product`,
    method: "get",
  },

  updateCartProduct: {
    url: `${backendDomain}/api/update-cart-product`,
    method: "post",
  },

  deleteCartProduct: {
    url: `${backendDomain}/api/delete-cart-product`,
    method: "post",
  },

  searchProduct : {
    url: `${backendDomain}/api/search-product`,
    method: "get",
  },

  filterProduct : {
    url: `${backendDomain}/api/filter-product`,
    method: "post",
  },
};

export default SummaryApi;
