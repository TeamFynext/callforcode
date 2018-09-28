document.addEventListener('DOMContentLoaded', () => {
  const socket = io('/')
  socket.emit('registerTracker')

  

  setInterval(() => {
    
      socket.emit('updateLocation')
    


},3000)
})