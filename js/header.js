import { getAllCagetories } from "../services/api.js"

const openCloseTop = document.getElementById('openCloseTop')
const openCloseBottom = document.getElementById('openCloseBottom')

const cache = JSON.parse(localStorage.getItem("categoryArr"))
const categoryArr = cache || []
const menu = document.getElementById('menu')

window.openSidebarTop = function () {
    openCloseBottom.classList.remove('left-0')
    openCloseBottom.classList.add('left-[-100%]')
  
    openCloseTop.classList.toggle('left-0')
    openCloseTop.classList.toggle('left-[-100%]')
  }
  
window.openSidebarBottom =  function () {
    openCloseTop.classList.remove('left-0')
    openCloseTop.classList.add('left-[-100%]')
  
    openCloseBottom.classList.toggle('left-0')
    openCloseBottom.classList.toggle('left-[-100%]')
  }

const icons = [
    'https://neptun.az/image/catalog/icon-menu/Meyv%C9%99-v%C9%99-t%C9%99r%C9%99v%C9%99z.svg',
    'https://neptun.az/image/catalog/icon-menu/%C9%99t-v%C9%99-toyuq%20m%C9%99hsullar%C4%B1.svg',
    'https://neptun.az/image/catalog/icon-menu/Qastronom.svg',
    'https://neptun.az/image/catalog/icon-menu/%C9%99rzaq%20m%C9%99hsullar%C4%B1.svg',
    'https://neptun.az/image/catalog/icon-menu/%C5%9Eirniyyat-%C3%A7ay-v%C9%99%20q%C9%99hv%C9%99.svg',
    'https://neptun.az/image/catalog/icon-menu/%C4%B0%C3%A7kil%C9%99r.svg',
    'https://neptun.az/image/catalog/icon-menu/S%C3%BCd-m%C9%99hsullar%C4%B1.svg',
    'https://neptun.az/image/catalog/icon-menu/U%C5%9Faq-m%C9%99hsullar%C4%B1.svg',
    'https://neptun.az/image/catalog/icon-menu/Yuyucu-vasit%C9%99l%C9%99r.svg',
    'https://neptun.az/image/catalog/icon-menu/Kosmetik-v%C9%99-gigiyenik.svg',
    'https://neptun.az/image/catalog/icon-menu/M%C9%99i%C5%9F%C9%99t-m%C9%99tb%C9%99x-v%C9%99-tekstil.svg',
    'https://neptun.az/image/catalog/icon-menu/Konselyariya.svg',
    'https://neptun.az/image/catalog/icon-menu/Heyvan-yeml%C9%99ri.svg',
    'https://neptun.az/image/catalog/icon-menu/neptun-icon.svg',
    'https://neptun.az/image/catalog/icon-menu/neptun-icon.svg',
    'https://neptun.az/image/catalog/icon-menu/elektronika-v%C9%99-mebel.svg',
]

if( !cache ){
    getAllCagetories().then(data => {
        // console.log(data);
        categoryArr.length = 0;
        categoryArr.push(...data)
        localStorage.setItem("categoryArr", JSON.stringify(data))
        handleCategory()
    })    
}

function handleCategory() {
    menu.innerHTML = ''

    if(categoryArr.length == 0){
        Array(15).fill("").forEach(item => {
            menu.innerHTML += `
                                <div class="flex items-center justify-center space-x-2">
                                    <div class="w-[10px] h-[10px] mb-10 rounded-full animate-pulse bg-[#ff8230]"></div>
                                    <div class="w-[10px] h-[10px] mb-10 rounded-full animate-pulse bg-[#ff8230]"></div>
                                    <div class="w-[10px] h-[10px] mb-10 rounded-full animate-pulse bg-[#ff8230]"></div>
                                </div>
                                `
        })
    }else{
        categoryArr.forEach((item, i) => {
            menu.innerHTML += `
                            <li class="group border-b-2 relative py-[9px] px-[13px] flex items-center justify-start hover:bg-orange-200 transition-all">
                                    <a href="">
                                        <img class="max-w-full w-[16px]" src="${icons[i]}" alt="icons" />
                                    </a>
                                    <div class="flex items-center justify-between gap-2 px-4 w-full">
                                        <span class="text-[12px] font-bold cursor-pointer">${item.categoryName}</span>
                                        <i class="fa-solid text-[10px] fa-chevron-right"></i>
                                    </div>
                                    
                                    ${item.subcategory.length > 0 ? 
                                        `<div class="absolute top-0 left-full border-l-orange-500 border-l-2 w-0 max-h-0 overflow-hidden bg-white shadow-2xl text-[11px] text-black opacity-0 translate-x-[-10px] transition-all duration-300 ease-in-out group-hover:w-[160px] group-hover:max-h-[500px] group-hover:p-2 group-hover:opacity-100 group-hover:translate-x-0">
                                            ${item.subcategory.map(sub => {
                                                return `<a href="/pages/category.htm?id=${sub.id}" class="block px-2 py-1 text-[14px] hover:text-[#ff8230] capitalize hover:underline">${sub.categoryName}</a>`
                                            }).join("")}
                                        </div>`: ''                                           
                                    }
                            </li>
                            `
        })
    }
}
handleCategory()

