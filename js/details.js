import { getaProductById } from "../services/api.js";

const content =document.getElementById('content')

const url = new URLSearchParams(location.search)
const id = url.get("id")

getaProductById(id).then(mel => {
    console.log(mel);
    showSubItem(mel)
})
function showSubItem(data){
    content.innerHTML=`
    <div class="flex flex-col sm:flex-row items-start ">
        <div class="md:w-[46%] w-[70%] px-6 ">
            <img src="${data.img}" alt="" class="min-sm:w-[80%] w-full">
        </div>
        <div class="flex flex-col justify-between p-6 space-y-8 w-full sm:w-[50%]">
            <div>
                <h2 class="text-[18px] mb-[15px] font-bold hover:text-[#ff8300]">${data.name}</h2>
               
                <p class="text-[12px] text-[#525252] mb-4">0 şərh | Şərh yaz</p>
                <div class="w-[208px]">
                    
                    <p class="flex justify-between text-[13px] mb-3 text-[#525252]"><span>Model</span><span>049586</span></p>
                    <p class="flex justify-between text-[13px] text-[#525252]"><span>Mövcudluq:</span><span><i class="fa-regular fa-square-check"></i> Anbarda</span></p>
                
                </div>
               </div>
            <div class="">
                <p class="text-[#ff8300] font-bold text-[31px]">${data.price}₼</p>
                <span class="text-[#ff8300] font-extrabold text-[30px]">-</span>    
                <span class="px-3 font-bold">1</span>
                <span class="text-[#ff8300] font-extrabold text-[30px]">+</span>
            </div>
            <div class="flex items-center gap-4">
                <button class="bg-[#ff8300] hover:bg-orange-800 min-w-24 min-h-8 text-[13px]  text-white rounded-2xl transition-all" onclick="">Səbətə at</button>
                <i class="fa-solid text-[#ff8300] rounded-md  p-1 fa-heart hover:bg-[#ff8300] hover:text-white transition-all"></i>
                <i class="fa-solid text-[#ff8300] rounded-md p-1 fa-arrows-rotate hover:bg-[#ff8300] hover:text-white transition-all"></i>
            </div>
            </div>
       </div>
    `
}