const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const mongoose  = require("mongoose")
const UserRoutes = require('./routes/userRoutes')
const PostRoutes = require("./routes/postRoutes")
const errorHandler = require("./Utils/errorHandler")

const app = express()
dotenv.config()

app.use(cors())
app.use(express.json())

app.use("/api/auth",UserRoutes);
app.use("/api/post",PostRoutes);

app.use(errorHandler);

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("mongoose is connected"))
.catch((e)=> console.log(e))

const server = app.listen(process.env.PORT, ()=>{
    console.log(`server is started on port ${process.env.PORT}`)
})