import app from './src/App.js'
import { createServer } from 'http'
import { Server } from 'socket.io'

const httpServer = createServer(app)
const io = new Server(httpServer, { /* options */ })

io.on("connection", (socket) => {
  console.log("new connection is created")
  //jab bhi koi naya connection create hoga tab console par ye print hoga. Yaha hum ne postman aur ECHOAPI ka connection create kiya hai

  //koi single user ja message event ko fire karega tab hum us event ko listen karege aur call back chala denge user ke message event ko fire karne par.
  //  Msg mai event fire karne ke sath jo data bheja gaya hai wo aa jayega. Yaha hum ne postman aur ECHOAPI ka message event fire kiya hai aur data bheja hai
  socket.on("message" , (msg) => {
    console.log("user fired message event", msg)

    io.emit("abc" , msg)
    //yaha humara server abc event ko fire karna shru kar dega
  })
})

httpServer.listen(3000, () => {
  console.log('Server is running on port 3000')
})