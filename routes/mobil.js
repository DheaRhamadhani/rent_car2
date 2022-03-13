const express = require(`express`)
const app = express()

app.use(express.json())

// panggil mobil controller
let mobilController = require("../controllers/mobilController")

// panggil middlewares
let uploadImage = require("../middlewares/uploadImage")
let authorization = require("../middlewares/authorization")

// end-point get data mobil
app.get("/", authorization.authorization, mobilController.getDataMobil)

// end-point add data mobil
app.post("/", [
    uploadImage.upload.single(`image`), authorization.authorization
],
    mobilController.addDataMobil)

// end-point edit mobil
app.put("/:id_mobil", authorization.authorization, mobilController.editDataMobil)

// end-point delete mobil
app.delete("/:id_mobil", authorization.authorization, mobilController.deleteDataMobil)

module.exports = app