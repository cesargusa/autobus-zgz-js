

const URL_GETALLBUSLINES = 'https://www.zaragoza.es/sede/servicio/urbanismo-infraestructuras/transporte-urbano/linea-autobus'

window.onload = () => {
    GetAllBusLines()
    //Eventos onclick
    document.getElementById('lineBusTab').onclick = changeLineBusTab
    document.getElementById('favoritesTab').onclick = changeFavoritesTab
    document.getElementById('dropdownUserMenuLink').onclick = changeMenuProfile
    // document.getElementById('searchLineBus').onkeyup = searchLineValue
    //LLama al metodo cuando cargue la pagina



}


//Funcion para desplegar el submenu
function changeMenuProfile() {
    let menuProfile = document.getElementById('dropdownUserMenuLink')
    let subMenuProfile = document.getElementById('subMenu')
    menuProfile.classList.add('show')
    subMenuProfile.classList.add('show')

}
//Funcion para quitar el menu desplegable
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
//Metodo cambio de Tabs
function changeLineBusTab() {
    let lineBusTab = document.getElementById('lineBusTab')
    let favoritesTab = document.getElementById('favoritesTab')
    let linesBusContent = document.getElementById('linesBusContent')
    let linesFavoriteContent = document.getElementById('linesFavoriteContent')
    //Eliminar clases
    favoritesTab.classList.remove('active')
    lineBusTab.classList.remove('active')
    lineBusTab.classList.add('active')

    //Mostrar Contenido
    linesFavoriteContent.classList.remove('show', 'active')
    linesBusContent.classList.add('show', 'active')
}

function changeFavoritesTab() {
    let lineBusTab = document.getElementById('lineBusTab')
    let favoritesTab = document.getElementById('favoritesTab')
    let linesBusContent = document.getElementById('linesBusContent')
    let linesFavoriteContent = document.getElementById('linesFavoriteContent')

    lineBusTab.classList.remove('active')
    favoritesTab.classList.add('active')

    //Mostrar Contenido
    linesBusContent.classList.remove('show', 'active')
    linesFavoriteContent.classList.add('show', 'active')


}



//Metodo que trae todo los datos de las lineas de bus
function GetAllBusLines(listFiltrada,tipo) {
    let containerBusLines = document.getElementById('containerLines')
    let totalBusLines = 0
    let allBusLinesString = []
   let allBusLines = []
    containerBusLines.innerHTML = `
    <div class="d-flex justify-content-center">
    <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status" id="spinner">
      <span class="sr-only"></span>
      </div>
  </div>
    `
    fetch(URL_GETALLBUSLINES, {
        headers: {
            accept: 'application/json'
        },
        method: 'GET'
    })
        .then(res => res.json())
        .then(data => {
            document.getElementById('spinner').remove()

            totalBusLines = data.totalCount
            allBusLinesString = data.result
            // totalCount = data.totalCount
            console.log(data)
            let numero = 0
                allBusLinesString.forEach(busLine => {
                    console.log(busLine)
                    allBusLines.push({ valor: busLine.slice(96, busLine.length) })
                    containerBusLines.innerHTML += `
    
                    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                    <a href='lineInfo.html?lineId=${allBusLines[numero].valor}'>
                    <div class="card border-danger border">
                        <div class="card-body">
                            <h1 class="card-title text-danger text-center">${allBusLines[numero].valor.replace('_',' ')}</h1>
                        </div>
                    </div> 
                    </a>
                </div>
                `
                    numero += 1
            });
            containerBusLines.innerHTML += `
        <p>Total: ${totalBusLines}</p>
        `
          
        })

        .catch(() => {
            containerBusLines.innerHTML = '<span>No se han podido cargar los datos :(</span>'
        });



}


// function searchLineValue(e) {
//     let listFiltrada = []
//     console.log(e.target.value)
//     let allBusLines2 = GetAllBusLines()
//    allBusLines2.forEach(item =>{
//     if(item.valor === '38'){
//        listFiltrada.push(item)
//     }
//    })
//    GetAllBusLines(listFiltrada,false)
// }


// function refreshLines() {
//     let inputValue = document.getElementById('searchLineBus').value
//     console.log(inputValue)
//     if (inputValue !== undefined) GetAllBusLines(inputValue)


// }

