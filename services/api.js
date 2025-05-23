const BASE_URL = "https://neptunbk.vercel.app"
const token = localStorage.getItem('token')

async function getAllCagetories() {
    const res = await fetch(`${BASE_URL}/categories`)
    return res.json()
}

async function getCagetoryById(id) {
    const res = await fetch(`${BASE_URL}/categories/${id}`)
    return res.json()
}

async function getAllProducts(limit = 20, page = 2) {
    const res = await fetch(`${BASE_URL}/products?limit=${limit}&page${page}`)
    return res.json()
}

async function getProductbyById() {
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
async function getaProductById(id) {
    const res = await fetch(`${BASE_URL}/products/${id}`)
    return await res.json()
}
async function login(obj) {
    const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        body: obj,
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
    })
    return await res.json()
}

async function verifyToken() {
    const res = await fetch(`${BASE_URL}/auth/verify-token`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    )
    return await res.json()
}


/* async function login(obj) {
    try {
        const res = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            body: obj,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        return await res.json()
    } catch (error) {
        console.log(error);
    }
}
 */
export { getAllCagetories, getCagetoryById, getAllProducts, getProductbyById, getProductsByDisc, getProdByPopular, getProdByCatId, getProdBySubCatId, getaProductById, login, verifyToken }