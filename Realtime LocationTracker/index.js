'use strict'
var count=0
const http = require('http')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const socketIo = require('socket.io')
const getJSON = require('get-json')
const app = express()
const server = http.createServer(app)
const io = socketIo(server)

const locationMap = new Map()

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.send('Hello!')
})

io.on('connection', socket => {
  socket.on('registerTracker',()=>{
		locationMap.set(socket.id,{lat:null,lng:null,name:null,add:null,phno:null})
      
	})

  socket.on('updateLocation', () => {
  //	locationMap.set(null)
    getJSON('https://fynesaver.eu-gb.mybluemix.net/getdata', function(error, response){
      try
      { for(var i=0;i<response.length;i++){
        var obj=response[i]
        const lat=parseFloat(obj.lat)
       const lng=parseFloat(obj.lng)
        const ack=parseFloat(obj.ack)
        const name=String(obj.name)
        const add=String(obj.Address)
        const phno=String(obj.phno)
        locationMap.set(obj.id,{lat,lng,name,add,phno})     
        if(parseInt(obj.ack) == 0){
       	locationMap.delete(obj.id)
        }
       
        	
        
       
       }
       console.log(locationMap)
       }
       catch(error){
       	console.error(error)
       }
       })
  },err=>{
    console.error(err)
    
  })

  socket.on('requestLocations', () => {
    socket.emit('locationsUpdate', Array.from(locationMap))
  })
  socket.on('requestdetails',()=>{
  	socket.emit('locationsUpdate',Array.from(locationMap))
  })
  socket.on('disconnect', () => {
    locationMap.delete(socket.id)
  })
})

server.listen(3000, err => {
  if (err) {
    throw err
  }

  console.log('server started on port 3000')
})