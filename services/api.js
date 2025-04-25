const BASE_URL = "https://neptunbk.vercel.app"

async function getAllCagetories(){
    const res = await fetch(`${BASE_URL}/categories`)
    return res.json()
}

async function getCagetoryById(id){
    const res = await fetch(`${BASE_URL}/categories/${id}`)
    return res.json()
}

async function getAllProducts(){
    const res = await fetch(`${BASE_URL}/categories`)
    return res.json()
}

async function getProductbyById(id){
    const res = await fetch(`${BASE_URL}/categories/${id}`)
    return res.json()
}