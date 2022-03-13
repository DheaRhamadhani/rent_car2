const express = require(`express`)
const app = express()

app.use(express.json())

// panggil karyawan controller
let karyawanController = require("../controllers/karyawanController")

// panggil middlewares
let authorization = require("../middlewares/authorization")

// end-point get data karyawan
app.get("/", authorization.authorization, karyawanController.getDataKaryawan)

// end-point add data karyawan
app.post("/", authorization.authorization, karyawanController.addDataKaryawan)

// end-point edit karyawan
app.put("/:id_karyawan", authorization.authorization, karyawanController.editDataKaryawan)

// end-point delete karyawan
app.delete("/:id_karyawan", authorization.authorization, karyawanController.deleteDataKaryawan)

// end-point authentication
app.post("/auth", karyawanController.authentication)

module.exports = app