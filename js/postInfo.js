const urlParam = new URLSearchParams(window.location.search)
const URLPOST = 'https://www.zaragoza.es/sede/servicio/urbanismo-infraestructuras/transporte-urbano/poste-autobus/'
//Guardo los valores de la url del poste y la linea
var postId = urlParam.get('postId')
var lineId = urlParam.get('lineId')


document.title = `Post Info ${postId} | Autobuses Zaragoza`

window.onload = () => {
  migasPan()
  GetPostId(postId)

}

//Crea la estructura de la miga de pan
function migasPan() {
  let migasPan = document.getElementById('migasPan')
  migasPan.innerHTML += `
    <div class="p-4">
    <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><a href="/">Inicio</a></li>
      <li class="breadcrumb-item"><a href="/lineInfo.html?lineId=${lineId}">Linea ${lineId}</a></li>
      <li class="breadcrumb-item active fw-bold" aria-current="page">Poste ${postId}</li>
    </ol>
  </nav>
  </div>
    `
}


function GetPostId(postIdUrl) {
let containerInfoPost = document.getElementById('containerInfoPost');
  containerInfoPost.innerHTML = `
  <div class="d-flex justify-content-center">
  <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status" id="spinner">
    <span class="sr-only"></span>
    </div>
</div>
  `
  fetch(URLPOST + postIdUrl, {
    headers: {
      'accept': 'application/json'
    }

  })
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
      createMap(data)
      document.getElementById('spinner').remove()
      // document.getElementById('spinner').remove()

    })

}


function createMap(data) {
  let coordinate1 = data.geometry.coordinates[0]
  let coordinate2 = data.geometry.coordinates[1]
  console.log(data.geometry.coordinates[0])
  // Creating map options
  var mapOptions = {
    center: [coordinate2, coordinate1],
    zoom: 20
  }
  // Creating a map object
  var map = new L.map('map', mapOptions);

  // Creating a Layer object
  var layer = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

  // Adding layer to the map
  map.addLayer(layer);

  // Creating a marker
  var marker = L.marker([coordinate2, coordinate1]);

  // Adding marker to the map
  marker.addTo(map);
}