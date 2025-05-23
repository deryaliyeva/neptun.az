import { getAllProducts, getProdByCatId, getProdByPopular, getProductsByDisc } from "../services/api.js";
import { addToBasket } from "./basket.js";
let activeSlide = 1;
let count = 1;
(function showDiscounted() {
  getProductsByDisc().then(data => {
    slideShow("discSlider", data.products)
  })
})();

(function showPopular() {
  getProdByPopular().then(data => {
    if (data.totalProducts == 0) {
      getAllProducts(15, 2).then(mel => {
        slideShow("bestSlider", mel.products)
      })
    } else {
      slideShow("bestSlider", data)
    }
  })
})();

function slideShow(id, data) {
  const elem = document.getElementById(id)
  elem.innerHTML = ''
  data.map(item => {
    // console.log(data);

    elem.innerHTML += `
            <div class="swiper-slide flex justify-start">
            <div class="relative w-full">
              <a href="/pages/details.htm?id=${item.id}" ><img src="${item.img}" alt="photo" class="!w-[180px] mx-auto cursor-pointer" /></a>
             <a href="/pages/details.htm?id=${item.id}" > <p class="uppercase text-[10px] font-[600] text-center mb-5">${item.name} </p></a>
              <p class="text-[22px] font-[700] font-sans text-center mb-5">${item.price} ₼</p>
              <div class="flex justify-center items-center">
                <button class="text-[#ff8300] p-[6px_12px] text-[25px]" onclick='changeCount(-1,${JSON.stringify(item)})'>‒</button>
                <span class="text-[12px] font-bold" id="xana${item.id}">${count}</span>
                <span class="text-[11px] ml-1">Ədəd</span>
                <button class="text-[#ff8300] p-[6px_12px] text-[25px]" onclick='changeCount(1,${JSON.stringify(item)})'>+</button>
              </div>
              <button id="btn${item.id}" onclick='sebeteAt(${JSON.stringify(item)})'
                class="bg-[#ff8300] rounded-full px-5 text-[15px] text-white h-[30px] mb-5 transition duration-300 hover:bg-[#de7200]">Səbətə
                at</button>
              <a href="wishlist.htm" class="fa-regular fa-heart text-[#ff8300] cursor-pointer absolute top-3 right-5"></a>
            </div>
          </div> 
            `
  })
}

window.sebeteAt = (item, count = 1) => {
  addToBasket(item, count);
}

window.changeCount = (x, item) => {
  // console.log(data);
  // count+=arg
  const elem = document.getElementById('xana' + item.id)
  let count = +elem.innerHTML
  if (count + x > 0) {
    count += x
    elem.innerHTML = count
    const btn = document.getElementById('btn' + item.id)
    btn.onclick = () => {
      addToBasket(item, count)
    }
  }

}



swiper3.on('slideChange', (swipers) => {
  const activeElement = swipers.slides[swipers.realIndex].id
  if (activeElement != activeSlide) {
    getProdByCatId(activeElement).then(data => {
      slideShow('categorySlider', data.products)
    })
  }
  activeSlide = activeElement
})
