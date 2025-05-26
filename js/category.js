import { getProdBySubCatId } from "../services/api.js"

const filterDiv = document.getElementById("filterDiv")
const content = document.getElementById("content")
const btns = document.getElementById("btns")


const url = new URLSearchParams(location.search)
const id = url.get("id")
const urlPage = url.get("page")
const urlLimit = url.get("limit")

let limit = urlLimit || 12;
let page = urlPage || 1;

window.openFilters = function () {
    filterDiv.classList.toggle('left-0')
    filterDiv.classList.toggle('left-[-100%]')
}

window.clickButton = function (x) {
    skeletonLoader()
    url.set("page", x);
    const newUrl = `${location.pathname}?${url.toString()}`;
    history.pushState(null, "", newUrl)
    page = x
    showCategoryProduct()
}

function showCategoryProduct() {
    getProdBySubCatId(id, limit, page).then(mel => {
        console.log(mel.products);
        showCard(mel.products)
        handleBtn(mel.totalPages)
    })
}
showCategoryProduct()

function showCard(data) {
    content.innerHTML = ""
    data.map(item => {
        content.innerHTML += `
                            <div class="max-w-xs rounded-md bg-white max-h-full">
                                   <a href="/pages/details.htm?id=${item.id}"><img src="${item.img[0]}" alt="" class="object-cover mx-auto w-32 rounded-t-md h-32 dark:bg-gray-500"></a> 
                                    <div class="flex flex-col justify-between p-6 space-y-8">
                                        <a href="/pages/details.htm?id=${item.id}" class="space-y-2 text-center block">
                                            <h2 class="text-[11px] mb-[15px] font-bold hover:text-[#ff8300]">${item.name}</h2>
                                            <span class="text-[#181818] font-bold text-[20px]">${item.price}₼</span>
                                        </a>
                                        <div class="text-center">
                                            <span class="text-[#ff8300] font-extrabold text-[30px]">-</span>
                                            <span class="px-3 font-bold">1</span>
                                            <span class="text-[#ff8300] font-extrabold text-[30px]">+</span>
                                        </div>
                                        <div class="flex items-center justify-center">
                                            <button class="bg-[#ff8300] hover:bg-orange-800 min-w-20 min-h-8 text-[13px] font-bold text-white rounded-2xl transition-all">Səbətə at</button>
                                            <i class="fa-solid text-[#ff8300] rounded-md  p-1 fa-heart hover:bg-[#ff8300] hover:text-white transition-all"></i>
                                            <i class="fa-solid text-[#ff8300] rounded-md p-1 fa-arrows-rotate hover:bg-[#ff8300] hover:text-white transition-all"></i>
                                        </div>
                                    </div>
                            </div>
                                `
    })
}

function skeletonLoader() {
    content.innerHTML = ""
    Array(limit).fill("").map(item => {
        content.innerHTML += `
        <article class="max-w-xs animate-pulse bg-gray-50 rounded-md max-h-full">
                <img alt="" class="object-cover mx-auto w-32 rounded-t-md h-32 dark:bg-gray-500">
                <div class="flex flex-col justify-between p-6 space-y-8">
                    <div class="space-y-2 text-center">
                        <h2 class="text-[11px] mb-[15px] font-bold hover:text-[#ff8300]">Loading</h2>
                        <span class="text-[#181818] font-bold text-[20px]">0.00 ₼</span>
                    </div>
                    <div class="text-center">
                        <span class="text-[#ff8300] font-extrabold text-[30px]">-</span>
                        <span class="px-3 font-bold">1</span>
                        <span class="text-[#ff8300] font-extrabold text-[30px]">+</span>
                    </div>
                    <div class="flex items-center justify-center">
                        <button class="bg-[#ff8300] hover:bg-orange-800 min-w-20 min-h-8 text-[13px] font-bold text-white rounded-2xl transition-all">Səbətə at</button>
                        <i class="fa-solid text-[#ff8300] rounded-md  p-1 fa-heart hover:bg-[#ff8300] hover:text-white transition-all"></i>
                        <i class="fa-solid text-[#ff8300] rounded-md p-1 fa-arrows-rotate hover:bg-[#ff8300] hover:text-white transition-all"></i>
                    </div>
                </div>
        </article>
            `
    })
}
skeletonLoader()

function handleBtn(x) {
    btns.innerHTML = ""
    Array(x).fill("").map((_ , i) => {
        btns.innerHTML += `
                <button onclick="clickButton(${i + 1})" type="button" title="${i + 1}" class="inline-flex items-center justify-center w-8 h-8 text-sm font-semibold border rounded shadow-md dark:bg-gray-50 border-[#ff8300]">${i + 1}</button>
        `
    })
}
window.row = function(){
    content.classList.add('displayFlex')
}
window.col = function(){
    content.classList.remove('displayFlex')
}
