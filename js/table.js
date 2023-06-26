
// let url = "http://localhost:3000/gisinfo"
let url ="https://missraunak.github.io/GIS_PROJECT/db.json"
function showdata() {
    let html = '';
    fetch(url)
        .then(response => response.json())
        .then(arr => {
            arr.forEach(data => {
                html += `
                <tr>
      <td>${data.id}</td> 
      <td>${data.name}</td>
      <td>${data.email}</td>   
      <td>${data.Address}</td>
      <td>${data.mobile}</td>   
      <td>${data.Password}</td>  
      <td>${data.latitude}</td>
      <td>${data.longitude}</td>   
      <td>${data.time}</td>
      <td>${data.date}</td> 
      <td><button onclick="deletedata(${data.id})" class="px-2  font-bold text-white bg-blue-500 rounded-md my-1">delete</button></td>
                </tr>`;

            }); document.getElementById('root').innerHTML = html;
        }
        )
        .catch(error => console.error(error));
}
showdata();


function deletedata(id) {
    console.log("delete", id)
    fetch(`${url}/${id}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                console.log('Data deleted successfully');
            } else {
                console.error('Error deleting data');
            }
        })
        .catch(error => {
            console.error('Error deleting data:', error);
        });
}






require([
    "esri/Map",
    "esri/views/MapView",
    "esri/widgets/Track",
    "esri/widgets/Home",
    "esri/widgets/Locate",
    "esri/Graphic",
    "esri/layers/GraphicsLayer",
    "dojo/domReady!"
], function (Map, MapView, Home, Locate, Track, Graphic, GraphicsLayer) {
    var map = new Map({
        basemap: "topo"
    });

    var view = new MapView({
        map: map,
        zoom: 10,
        container: "viewDiv"
    });


    var table = document.getElementById("myTable"), rIndex;
    for (var i = 1; i < table.rows.length; i++) {
        table.rows[i].onclick = function () {

            rIndex = this.rowIndex;
            console.log("ojdsh", rIndex);
            // var value1 = document.getElementById("lat").value = this.cells[0].innerHTML;
            // var value2 = document.getElementById("log").value = this.cells[1].innerHTML;
            var value1 = this.cells[6].innerHTML;
            var value2 = this.cells[7].innerHTML;
            console.log("lat", value1); console.log("log", value2)
            var view = new MapView({
                map: map,
                center: [value2, value1],
                zoom: 10, // Zoom level
                container: "viewDiv"
            });

            //Create a point
            const graphicsLayer = new GraphicsLayer();
            map.add(graphicsLayer);
            const point = {
                type: "point",
                longitude: value2,
                latitude: value1

            };
            console.log("point", point)
            const simpleMarkerSymbol = {
                type: "simple-marker",
                color: [137, 207, 240],  // Orange
                outline: {
                    color: [238, 75, 43], // White
                    width: 1
                }
            };
            const pointGraphic = new Graphic({
                geometry: point,
                symbol: simpleMarkerSymbol
            });
            graphicsLayer.add(pointGraphic);

            //home
            let home = new Home({
                view: view
            });
            view.ui.add(home, "top-right");

        };
    }



});
