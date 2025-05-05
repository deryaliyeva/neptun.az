const BASE_URL = "https://neptunbk.vercel.app"

async function getAllCagetories(){
    const res = await fetch(`${BASE_URL}/categories`)
    return res.json()
}

async function getCagetoryById(id){
    const res = await fetch(`${BASE_URL}/categories/${id}`)
    return res.json()
}

async function getAllProducts(limit = 20, page = 2){
    const res = await fetch(`${BASE_URL}/products?limit=${limit}&page${page}`)
    return res.json()
}

async function getProductbyById(){
    const res = await fetch(`${BASE_URL}/categories/${id}`)
    return res.json()
}

async function getProductsByDisc() {
    const res = await fetch(`${BASE_URL}/products/discounted`)
    return res.json()
}

async function getProdByPopular() {
    const res = await fetch(`${BASE_URL}/products/populyar`)
    return res.json()
}
async function getProdByCatId(id) {
    const res = await fetch(`${BASE_URL}/products/category/${id}`)
    return res.json()
}

async function getProdBySubCatId(id, limit = 10, page = 1) {
    const res = await fetch(`${BASE_URL}/products/subcategory/${id}?limit=${limit}&page=${page}`)
    return res.json()
}

export { getAllCagetories, getCagetoryById, getAllProducts, getProductbyById, getProductsByDisc, getProdByPopular, getProdByCatId, getProdBySubCatId }