const express = require(`express`)
const app = express()

app.use(express.json())

// panggil pelanggan controller
let pelangganController = require("../controllers/pelangganController")

// panggil middlewares
let authorization = require("../middlewares/authorization")

// end-point get data pelanggan
app.get("/", authorization.authorization, pelangganController.getDataPelanggan)

// end-point add data pelanggan
app.post("/", authorization.authorization, pelangganController.addDataPelanggan)

// end-point edit pelanggan
app.put("/:id_pelanggan", authorization.authorization, pelangganController.editDataPelanggan)

// end-point delete pelanggan
app.delete("/:id_pelanggan", authorization.authorization, pelangganController.deleteDataPelanggan)

module.exports = app 