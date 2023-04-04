const urlParam = new URLSearchParams(window.location.search)
var postId = urlParam.get('postId')
document.title = `Post Info ${postId} | Autobuses Zaragoza`

window.onload = () => {

    migasPan()

    
}

function migasPan(){
    let migasPan = document.getElementById('migasPan')


    migasPan.innerHTML += `
    <div class="p-4">
    <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><a href="/">Inicio</a></li>
      <li class="breadcrumb-item"><a href="/">Inicio</a></li>
      <li class="breadcrumb-item active fw-bold" aria-current="page">Linea ${postId}</li>
    </ol>
  </nav>
  </div>
    `
}