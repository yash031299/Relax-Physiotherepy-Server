require('./db/mongoose')
const express = require("express")
const app = express();
const userRouter = require("./Routers/userRouter")
const enquiryRouter = require("./Routers/enquiryRouter")
const cookieParser = require('cookie-parser')
const adminRouter = require('./Routers/adminRouter')
const Enquiry = require("./Models/enquiryModel")
const availableAppointmentRouter = require("./Routers/availableAppointmentRouter")
const appointmentRouter = require("./Routers/appointmentsRouter")

app.use(express.json())
app.use(cookieParser())
app.use(userRouter)
app.use(adminRouter)
app.use(enquiryRouter)
app.use(availableAppointmentRouter)
app.use(appointmentRouter)

app.get("/", (req, res) => {
  res.send("<h1> Relax Physiotherepy API Server </h1> <p>Visit - <a href = 'https://www.relaxphysiotherepy.com/api/{paths}'>Relax Physiotherepy</a> for the resopnse.</p>");
});

app.get("*", (req, res) => {
    res.send("<h1 align='center'>404 <br> Page Not found </h1>")
})
app.listen(3001, () => console.log("Server is up on port 3001"))
