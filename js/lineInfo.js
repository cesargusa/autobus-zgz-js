
const URLLINEID = 'https://www.zaragoza.es/sede/servicio/urbanismo-infraestructuras/transporte-urbano/linea-autobus/'
const urlParam = new URLSearchParams(window.location.search)
var lineId = urlParam.get('lineId')
window.onload = () => {
    document.title = `Linea ${lineId} | Autobuses Zaragoza`
    GetIdLine()
}

function GetIdLine() {
    let markersLines = [];
    let allPostLine = [];
    let errorMessage = document.getElementById('containerLineIdErrorMessage')
    let containerLineDetail = document.getElementById('containerLineId')
    let lastConnection = document.getElementById('lastConnection')
    let migasPan = document.getElementById('migasPan')
    let listPostBus = document.getElementById('allBusPosts')
    let totalCount = 0
    if (lineId == undefined || lineId == '' || lineId == null) {
        errorMessage.textContent = 'Error, la linea seleccionada no existe :('
    } else {
        errorMessage.textContent = ''

        migasPan.innerHTML += `
        <div class="p-4">
        <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="/">Inicio</a></li>
          <li class="breadcrumb-item active fw-bold" aria-current="page">Linea ${lineId}</li>
        </ol>
      </nav>
      </div>
        `
        containerLineDetail.innerHTML = `
        <div class="d-flex justify-content-center">
        <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status" id="spinner">
          <span class="sr-only"></span>
          </div>
      </div>
        `
        fetch(URLLINEID + lineId, {
            headers: {
                accept: 'application/json'
            },
            method: 'GET'
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data.result)
                allPostLine = data.result
                totalCount = data.totalCount

                //Guardo en el array todas las coordenadas de las lineas
                markersLines = data.result[0].geometry.coordinates[0];
                let markersLinesLength = markersLines.length
                // firstLine = markersLines
                //Elimino el spinner al cargar todo
                document.getElementById('spinner').remove()
                var map = L.map('map', {
                    // minZoom: 11,
                    // maxZoom:50
                });
                var LeafIcon = L.Icon.extend({
                    options: {

                        iconSize: [0.00, 0.00],
                        iconAnchor: [0, 0],
                        popupAnchor: [1, -34],
                        shadowSize: [0, 0]
                    }

                });
                var greenIcon = new LeafIcon({
                    iconUrl: 'https://m.media-amazon.com/images/I/51IUgMl2uQL.png',
                    shadowUrl: 'https://m.media-amazon.com/images/I/51IUgMl2uQL.png'
                })

                markersLines.forEach(function (lngLat) {
                    L.marker(lngLatToLatLng(lngLat), { icon: greenIcon }).addTo(map);
                });

                var polyline = L.polyline(lngLatArrayToLatLng(markersLines)).addTo(map);

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; Lineas Zaragoza Autobús</a> Proyecto César'
                }).addTo(map);

                map.fitBounds(polyline.getBounds());
                var markerFirst = L.marker([markersLines[0][1], markersLines[0][0]])
                var markerLast = L.marker([markersLines[markersLinesLength - 1][1], markersLines[markersLinesLength - 1][0]])
                markerFirst.addTo(map)
                markerLast.addTo(map)
                function lngLatArrayToLatLng(lngLatArray) {
                    return lngLatArray.map(lngLatToLatLng);
                }

                function lngLatToLatLng(lngLat) {
                    return [lngLat[1], lngLat[0]];
                }
                lastConnection.innerHTML += `
                <div class="p-4">
                <p>Ultima Actualización: <span class="fw-bolder">${moment(data.lastUpdated).format('DD/MM/YYYY HH:mm:ss')}</span></p>
                </div>
                `
                for (let index = 1; index < allPostLine.length; index++) {
                    let urlGoogleMaps = `https://www.google.com/maps?layer=c&cbll=${allPostLine[index].geometry.coordinates[1]},${allPostLine[index].geometry.coordinates[0]}&cbp=0,0,0,0,0`
                    if (totalCount > 2) {
                        if (allPostLine[index].title !== undefined) {
                            containerLineDetail.innerHTML += `
                            <div class="timeline-item">
                            <i class="mdi mdi-bus bg-primary-lighten text-primary timeline-icon"></i>
                            <div class="timeline-item-info">
                              <a href="#" class="text-primary fw-bold mb-1 d-block">${allPostLine[index].title}</a>
                              <p class="mb-0 pb-2">
                                <!-- <small class="text-muted">30 minutes ago</small> -->
                              </p>
                            </div>
                          </div>
                            `
                            listPostBus.innerHTML += `
                        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4" style="mix-height:300px">
                        <div class="card border-danger border">
                            <div class="card-body">
                                <h1 class="card-title text-danger text-center">${allPostLine[index].title}</h1>
                            </div> 
                            <div class="text-center d-flex justify-content-around my-3 card-footer">
                            <a href='${urlGoogleMaps}' target=_blank>
                            <buttom class="btn btn-primary">Ver StreetView</buttom>
                            </a>
                            <buttom class="btn btn-primary" onclick="goToPostInfo('${allPostLine[index].about.slice(86, allPostLine[index].about.length)}')">Ver más información</buttom>
                            </div>
                        </div> 
                    </div>
                            `
                        }
                    } else {
                        containerLineDetail.innerHTML = 
                        `<div class="timeline-item">
                        <h3>No hay información :( </h3>
                      </div>`
                        
                        listPostBus.innerHTML = 
                        `<div class="col-12 text-center p-4" style="mix-height:300px">
                            <h3>No hay información :( </h3>
                        </div>`
                        break;
                    }
                }
            })
    }

}

function goToPostInfo(postId) {
    window.location = `/postInfo.html?lineId=${lineId}&postId=${postId}`
}