const url = new URLSearchParams(location.search)
const id = url.get("id")
const urlPage = url.get("page")
const urlLimit = url.get("limit")

let limit = urlLimit || 12;
let page = urlPage || 1;

function clickButton(x){
    url.set("page", x);
    const newUrl = `${location.pathname}?${url.toString()}`;
    history.pushState(null, "", newUrl)
    page = x
    showCategoryProduct()
}

function showCategoryProduct() {
    getProdBySubCatId(id).then(mel =>{
        console.log(mel)
    })
}
showCategoryProduct()