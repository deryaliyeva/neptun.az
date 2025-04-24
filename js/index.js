const openCloseTop = document.getElementById('openCloseTop')
const openCloseBottom = document.getElementById('openCloseBottom')

let flagTop = true
function openSidebarTop() {
    openCloseTop.style.left = flagTop ? '0%' : '-100%'
    flagTop = !flagTop
}

let flagBottom = true
function openSidebarBottom() {
    openCloseBottom.style.left = flagBottom ? '0%' : '-100%'
    flagBottom = !flagBottom
}