document.getElementById('dropdownUserMenuLink').onclick = changeMenuProfile
function changeMenuProfile() {
    let menuProfile = document.getElementById('dropdownUserMenuLink')
    let subMenuProfile = document.getElementById('subMenu')
    menuProfile.classList.add('show')
    subMenuProfile.classList.add('show')

}

window.onclick = function (event) {
    if (!event.target.matches('#dropdownUserMenuLink')) {
        var dropdowns = document.getElementsByClassName("dropdown-menu");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}