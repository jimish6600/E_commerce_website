const backendDomain = "http://localhost:8080"

const SummaryApi = {
    signUp : {
        url : `${backendDomain}/api/signup`,
        method : "post"
    },
    signIn: {
        url : `${backendDomain}/api/signin`,
        method : "post"
    },
    uploadProduct : {
        url : `${backendDomain}/api/upload-product`,
        method : "post"
    },
    allProduct : {
        url : `${backendDomain}/api/get-products`,
        method : "get"
    },
    updateProduct : {
        url : `${backendDomain}/api/update-product`,
        method : "post"
    },
    categoryProduct : {
        url : `${backendDomain}/api/get-categoryProduct`,
        method : "get"
    },
    categoryWiseProduct : {
        url : `${backendDomain}/api/category-product`,
        method : "post"
    }
}

export default SummaryApi