const { default: SummaryApi } = require("../common")

const fetchCategoryWiseProduct = async(category) =>{
    // console.log("FINAL" , category)
    const response = await fetch(SummaryApi.categoryWiseProduct.url,{
        method : SummaryApi.categoryWiseProduct.method,
        headers : {
            "content-type" : "application/json",
            "token" : localStorage.getItem('authToken')
        },
        body : JSON.stringify({
            category : category
        })
    })
    
    const dataResponse = await response.json()

    return dataResponse
}

export default fetchCategoryWiseProduct