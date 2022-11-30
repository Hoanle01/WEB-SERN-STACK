const express=require("express")
const path=require("path")
const cors=require("cors")
const {sequelize} =require('./models');
const { rootRouter } = require("./routers");
const app=express();
app.use(cors({origin:true}))
const socketio=require("socket.io")
//cài ứng dụng sử dụng kiểu json
app.use(express.json())

//cài static file
const publicPathDirectory=path.join(__dirname,"./public")

app.use("/public",express.static(publicPathDirectory))

//dùng router
app.use('/api/v1',rootRouter)


//lắng nghe sự kiện kết nối
app.listen(3000,async()=>{
console.log('App listening on port 3000');
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})
 