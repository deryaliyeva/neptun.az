

let activeSlide = 1;



(function showDiscounted() {
  getProductsByDisc().then(data => {
      slideShow("discSlider", data.products)
  })
})();

(function showPopular() {
  getProdByPopular().then(data => {
      if (data.totalProducts == 0) {
          getAllProducts(15, 2).then( mel => {
              slideShow("bestSlider", mel.products)
          } )
      }else{
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
              <img src="${item.img}" alt="photo" class="!w-[180px] mx-auto cursor-pointer" />
              <p class="uppercase text-[10px] font-[600] text-center mb-5">${item.name} </p>
              <p class="text-[22px] font-[700] font-sans text-center mb-5">${item.price} ₼</p>
              <div class="flex justify-center items-center">
                <button class="text-[#ff8300] p-[6px_12px] text-[25px]">‒</button>
                <span class="text-[12px] font-bold">1</span>
                <span class="text-[11px] ml-1">Ədəd</span>
                <button class="text-[#ff8300] p-[6px_12px] text-[25px]">+</button>
              </div>
              <button
                class="bg-[#ff8300] rounded-full px-5 text-[15px] text-white h-[30px] mb-5 transition duration-300 hover:bg-[#de7200]">Səbətə
                at</button>
              <i class="fa-regular fa-heart text-[#ff8300] cursor-pointer absolute top-3 right-5"></i>
            </div>
          </div> 
            `
  })
}

swiper3.on('slideChange', (swipers) => {
    const activeElement = swipers.slides[swiper.realIndex].id
   if( activeElement != activeSlide){
    getProdByCatId(activeElement).then(data =>{
      slideShow('categorySlider', data.products)
    })
   }
    activeSlide = activeElement
})
