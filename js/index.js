const openCloseTop = document.getElementById('openCloseTop')
const openCloseBottom = document.getElementById('openCloseBottom')

function openSidebarTop() {
    openCloseBottom.classList.remove('left-0')
    openCloseBottom.classList.add('left-[-100%]')
  
    openCloseTop.classList.toggle('left-0')
    openCloseTop.classList.toggle('left-[-100%]')
  }
  
  function openSidebarBottom() {
    openCloseTop.classList.remove('left-0')
    openCloseTop.classList.add('left-[-100%]')
  
    openCloseBottom.classList.toggle('left-0')
    openCloseBottom.classList.toggle('left-[-100%]')
  }
  