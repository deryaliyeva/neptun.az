const basket = JSON.parse(localStorage.getItem('basket')) || [];
const basketItems=document.getElementById('basketItems')
const buttom=document.getElementById('buttom')
function addToBasket(item,count) {
    console.log(basket);

    const yoxla = basket.find(elem => elem.id == item.id)
    console.log(yoxla);
    if (!yoxla) {
        basket.push({...item,count })

    }else{
        yoxla.count+=count
    }
    localStorage.setItem('basket', JSON.stringify(basket))
    showBasket()
}

function showBasket(){
    basket.map(item=>{
        basketItems.innerHTML+=`
                                 <tr>
                                        <td
                                            class="w-32 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                                            <a href="">
                                                <img
                                                    src="${item.img[0]}"
                                                    alt=""
                                                    class="md:w-24 w-20 h-[15vh] rounded-md object-cover"></a>
                                            <dl class="font-normal lg:hidden">
                                                <dd class="mt-1 text-gray-700">${item.name}</dd>
                                                <dd class="mt-1 truncate text-gray-500 sm:hidden">${item.price} ₼</dd>
                                            </dl>
                                        </td>
                                        <td class="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">${item.name}</td>
                                        <td class="px-3 py-4 w-fit text-center text-sm text-gray-500 sm:table-cell">
                                            <div class="flex items-center">
                                                <span class="w-[24px] h-[24px] rounded-full py-[3px] px-[5px] text-white text-[13px] bg-[#dd8347]"><i class="fas fa-trash "></i></span>
                                                <span class="px-2">${item.count} eded</span>
                                                <span class="w-[24px] h-[24px] rounded-full py-[3px] px-[5px] text-white text-[13px] bg-[#dd8347]"><i class="fas fa-plus "></i></span>

                                            </div>
                                        </td>
                                        <td class="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">${item.price} ₼</td>
                                        <td class="px-3 py-4 truncate font-semibold text-sm text-gray-500">${item.price*item.count} ₼</td>
                                        <td class="py-4 pl-3 pr-4  text-sm font-medium sm:pr-6">
                                            <p class="hover:text-red-600 text-[1.2em] cursor-pointer">
                                                <i class="fa-solid fa-trash-can"></i>
                                            </p>
                                        </td>
                                    </tr>
        `

        buttom.innerHTML=`
            <div class="mt-6 text-right">
                    <p class="text-lg font-semibold">Ümumi qiymət: <span class="font-bold text-[#ff8230]">${item.price*item.count}$</span>
                    </p>
                    <button
                        class="mt-4 bg-[#ff8230] hover:bg-[#b86228] text-white font-semibold py-2 px-5 rounded-lg transition">Checkout</button>
                </div>
        `
    })
}

if(basketItems){
    showBasket()
}

export {
    addToBasket,
    basket
}