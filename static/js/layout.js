const opensidebar = document.getElementById('menuToggle')
const sidebar = document.getElementById('sideMenu')

opensidebar.addEventListener('click', () => {
    sidebar.classList.toggle('open')
    opensidebar.classList.toggle('moveIcon')
});