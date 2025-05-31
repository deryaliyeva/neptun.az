import { addToProduct, deleteProd, editProduct, getAllProducts, getAllCagetories } from "../../services/api.js"

const openDiv = document.getElementById('openDiv');
const tblProduct = document.getElementById('tblProduct');
const prodName = document.getElementById('prodName');
const prodCat = document.getElementById('prodCat');
const prodSubCat = document.getElementById('prodSubCat');
const prodDisc = document.getElementById('prodDisc');
const prodPrice = document.getElementById('prodPrice');
const prodPop = document.getElementById('prodPop');
const prodPhoto = document.getElementById('prodPhoto');
const prodDesc = document.getElementById('prodDesc');
const prodMeta = document.getElementById('prodMeta');
const btn = document.getElementById('btn');


let ID = null;

let count = 0
const catArr = []

getAllCagetories()
    .then(res => {
        handleSubCat()
        catArr.length = 0
        catArr.push(...res)
        prodCat.innerHTML = `<option value="0">Kateqoriya seçin:</option>`
        res.map(item => {
            prodCat.innerHTML += `<option class="capitalize" value="${item.id}">${item.categoryName}</option>`
        })
    })

window.handleSubCat = () => {
    prodSubCat.innerHTML = `<option value="0">Subkateqoriya seçin:</option>`
    catArr.find(item => item.id == prodCat.value)?.subcategory?.map(sub => {
        prodSubCat.innerHTML += `<option class="capitalize" value="${sub.id}">${sub.categoryName}</option>`
    })
}

window.addProduct = () => {
    if (validationObj()) return



    addToProduct(obj)
        .then(res => {
            if (res.status) {
                alert('Məhsul əlavə edildi!')
                prodName.value = ''
                prodCat.value = '0'
                prodSubCat.value = '0'
                prodDisc.value = ''
                prodPrice.value = ''
                prodPhoto.value = ''
                prodDesc.value = ''
                prodMeta.value = ''
            }
        })
}

function clickPage(page = 1) {
    getAllProducts(100, page)
        .then(res => {
            if (count == 0) {
                btnChangePage(res.totalPages)
                count++
            }
            tblProduct.innerHTML = ''
            res.products.map(item => {
                tblProduct.innerHTML += `
                <tr class="hover:bg-gray-200">
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div class="flex items-center">
                            <div class="h-10 w-10 flex-shrink-0"><img
                                    class="h-10 w-10 rounded-full"
                                    src="${item.img[0]}"
                                    alt="${item.name}"></div>
                            <div class="ml-4">
                                <div class="font-medium text-gray-900">
                                    ${item.name}
                                </div>
                            </div>
                        </div>
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm">
                        <div class="text-red-600 font-semibold">${item.discount} %</div>
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"><span
                            class="inline-flex px-2">${item.totalPrice.toFixed(2)} ₼</span></td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div class="flex gap-2">
                            <svg onclick='openCloseProduct(${item.id}, ${JSON.stringify(item)})' stroke="currentColor" fill="none"
                                stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round"
                                stroke-linejoin="round"
                                class="text-[1.1em] text-[blue] cursor-pointer" height="1em"
                                width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7">
                                </path>
                                <path
                                    d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z">
                                </path>
                            </svg>
                            <svg onclick="openDelModal(${item.id})" stroke="currentColor" fill="currentColor"
                                stroke-width="0" viewBox="0 0 448 512"
                                class="text-[1.1em] text-[red] cursor-pointer" height="1em"
                                width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z">
                                </path>
                            </svg>
                        </div>
                    </td>
                </tr>`;
            })
        })
}
clickPage(1)

function btnChangePage(arg) {
    pageBtn.innerHTML = ''
    let arrBtn = Array(arg).fill('').map((_, i) => i + 1)
    $('#pageBtn').pagination({
        dataSource: arrBtn,
        pageSize: 1,
        pageNumber: 1,
        callback: function (data, pagination) {
            loadPage()
            clickPage(pagination.pageNumber)
        }
    })
}

window.openCloseProduct = (arg, item) => {
    ID = arg ?? null
    if (arg && item) {
        btn.innerHTML = "Duzelis et"
        btn.onclick = () => {
            duzelisEt(arg)
        }

        prodName.value = item?.name
        prodPop.checked = item?.isTopSelling
        prodPrice.value = item?.price
        prodDisc.value = item?.discount
        prodCat.value = item?.categoryId
        prodDesc.value = item?.description
        prodMeta.value = item?.metadata
        prodPhoto.value = item?.img[0]

        const subArr = catArr.find(elem => elem.id == item.categoryId)

        prodSubCat.innerHTML = ''
        subArr.subcategory?.map(elem => {
            prodSubCat.innerHTML += `
                <option ${elem.id == item.subcategoryId && 'selected'} value="${elem.id}">${elem.categoryName}</option>
            `
        })
    }
    openDiv.classList.toggle('!grid')
    document.body.classList.toggle('overflow-hidden')
}

function loadPage() {
    tblProduct.innerHTML = ''
    Array(100).fill('').map(_ => {
        tblProduct.innerHTML += `
                <tr class="hover:bg-gray-200">
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div class="flex items-center">
                            <div class="h-10 w-10 flex-shrink-0"><img
                                    class="h-10 w-10 rounded-full"
                                    src="https://neptun.az/image/cache/logo-270x270.png?v=9"
                                    alt="photo"></div>
                            <div class="ml-4">
                                <div class="font-medium text-gray-900">
                                    ...
                                </div>
                            </div>
                        </div>
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm">
                        <div class="text-red-600 font-semibold">99.99 %</div>
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"><span
                            class="inline-flex px-2">99.99 ₼</span></td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div class="flex gap-2">
                            <svg stroke="currentColor" fill="none"
                                stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round"
                                stroke-linejoin="round"
                                class="text-[1.1em] text-[blue] cursor-pointer" height="1em"
                                width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7">
                                </path>
                                <path
                                    d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z">
                                </path>
                            </svg>
                            <svg stroke="currentColor" fill="currentColor"
                                stroke-width="0" viewBox="0 0 448 512"
                                class="text-[1.1em] text-[red] cursor-pointer" height="1em"
                                width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z">
                                </path>
                            </svg>
                        </div>
                    </td>
                </tr>`;
    })
}
loadPage()

function validationObj() {
    prodPrice.style.border =
        prodDisc.style.border =
        prodPhoto.style.border =
        prodCat.style.border =
        prodSubCat.style.border =
        prodDesc.style.border =
        prodMeta.style.border = prodName.style.border = '1px solid #ccc'

    if (prodName.value.trim() == '') {
        prodName.style.border = '1px solid red'
        prodName.focus()
        alert('Xanaları doldurun!')
        return true
    }
    if (prodCat.value == '0') {
        prodCat.style.border = '1px solid red'
        prodCat.focus()
        alert('Xanaları doldurun!')
        return true
    }
    if (prodSubCat.value == '0') {
        prodSubCat.style.border = '1px solid red'
        prodSubCat.focus()
        alert('Xanaları doldurun!')
        return true
    }
    if (prodDisc.value.trim() == '') {
        prodDisc.style.border = '1px solid red'
        prodDisc.focus()
        alert('Xanaları doldurun!')
        return true
    }
    if (prodPrice.value.trim() == '') {
        prodPrice.style.border = '1px solid red'
        prodPrice.focus()
        alert('Xanaları doldurun!')
        return true
    }
    if (prodPhoto.value.trim() == '') {
        prodPhoto.style.border = '1px solid red'
        prodPhoto.focus()
        alert('Xanaları doldurun!')
        return true
    }

}

window.openDelModal = (arg) => {
    ID = arg ?? null
    document.getElementById("delModal").classList.toggle("hidden")
}

window.sil = () => {
    deleteProd(ID).then(res => {
        if (res.error) {
            alert('Server xetasi baş verdi, aytişniknən əlaqə saxla')
            openDelModal()
        }
    })
}


function duzelisEt(id) {
    if (validationObj()) return

    editProduct(id, getValues()).then(res => {
        console.log(res);
        clickPage(22)
    })


    openCloseProduct()
    btn.innerHTML = 'Mehsul elave et';
    btn.onclick = addProduct

}



function getValues() {
    return JSON.stringify({
        name: prodName.value,
        isTopSelling: prodPop.checked,
        price: prodPrice.value,
        discount: prodDisc.value,
        img: [
            prodPhoto.value
        ],
        categoryId: prodCat.value,
        subcategoryId: prodSubCat.value,
        description: prodDesc.value,
        metadata: prodMeta.value
    })
}