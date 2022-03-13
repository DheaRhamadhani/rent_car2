const express = require(`express`)
const app = express()

app.use(express.json())

// panggil sewa controller
let sewaController = require("../controllers/sewaController")

// end-point get data sewa
app.get("/", sewaController.getDataSewa)

// end-point add data sewa
app.post("/", sewaController.addDataSewa)

// end-point edit sewa
app.put("/:id", sewaController.editDataSewa)

// end-point delete sewa
app.delete("/:id", sewaController.deleteDataSewa)

module.exports = app