let map
let markers = new Map()

document.addEventListener('DOMContentLoaded', () => {
  const socket = io('/')

  socket.on('locationsUpdate', locations => {
    markers.forEach((marker, id) => {
      marker.setMap(null)
      markers.delete(id)
    })

    locations.forEach(([id, position]) => {
      if (position.lat && position.lng) {
        const marker = new google.maps.Marker({
          position,
          map
        })
        var infowindow = new google.maps.InfoWindow
        var infowincontent=document.createElement('div')
        var strong=document.createElement('strong')
        strong.textContent=position.name+"   (Needs Help)"
        infowincontent.appendChild(strong)
        infowincontent.appendChild(document.createElement('br'))
        var text=document.createElement('strong')
        text.textContent=position.add
        infowincontent.appendChild(text)
        infowincontent.appendChild(document.createElement('br'))
        var text1=document.createElement('strong')
        text1.textContent=position.phno
        infowincontent.appendChild(text1)
        marker.addListener('click', function() {
          infowindow.setContent(infowincontent)
          infowindow.open(map, marker);
        });
        markers.set(id, marker)
      }
    })
  })

  setInterval(() => {
    socket.emit('requestLocations')
  }, 3000)
})

function initMap() {
  navigator.geolocation.getCurrentPosition(pos => {
    const { latitude: lat, longitude: lng } = pos.coords
    map = new google.maps.Map(document.getElementById('map'), {
      center: { lat, lng },
      zoom: 10
    })
  }, err => {
    console.error(err)
  })
}