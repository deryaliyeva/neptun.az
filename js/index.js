const openCloseTop = document.getElementById('openCloseTop')
const openCloseBottom = document.getElementById('openCloseBottom')

function openSidebarTop() {
    if (openCloseBottom.classList.contains('left-0')) {
        openCloseBottom.classList.remove('left-0');
    }

    openCloseTop.classList.toggle('left-0');
}

function openSidebarBottom() {
    if (openCloseTop.classList.contains('left-0')) {
        openCloseTop.classList.remove('left-0');
    }

    openCloseBottom.classList.toggle('left-0');
}