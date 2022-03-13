const fs = require("fs")
// memanggil file model untuk siswa
let modelMobil = require("../models/index").mobil 
let path = require("path")

exports.getDataMobil = (request, response) => {
    modelMobil.findAll()
    .then(result => {
        return response.json(result)
    })
    .catch(error => {
        return response.json({
            message: error.message  
        })
    })
}

exports.addDataMobil = (request, response) => {
    if(!request.file) {
        return response.json({
            message: `Tidak ada data yang ditambahkan`
        })
    } 
    // tampung data request
    let newMobil = {
        nama_mobil: request.body.nama_mobil,
        merk: request.body.merk,
        jenis: request.body.jenis,
        warna: request.body.warna,
        tahun_pembuatan: request.body.tahun_pembuatan,
        biaya_sewa_per_hari: request.body.biaya_sewa_per_hari,
        image: request.file.filename
    }

    modelMobil.create(newMobil)
    .then(result => {
        return response.json({
            message: `Data Mobil Berhasil diTambahkan`
        })
    })
    .catch(error => {
        return response.json({
            message: error.message
        })
    })
}

exports.editDataMobil = async(request, response) => {
    let idMobil = request.params.id_mobil
    let dataMobil = {
        nama_mobil : request.body.nama_mobil,
        merk : request.body.merk,
        jenis : request.body.jenis,
        warna : request.body.warna,
        tahun_pembuatan : request.body.tahun_pembuatan,
        biaya_sewa_per_hari : request.body.biaya_sewa_per_hari
    }

    if (request.file) {
        let mobil = await modelMobil.findOne({where : {id_mobil : idMobil}})
        let oldFileName = mobil.image

        //delete file
        let location = path.join(__dirname, "../image", oldFileName)
        fs.unlink(location, error => console.log(error))

        //menyisipkan nama file baru ke da,am objek datasiswa
        dataMobil.image = request.file.filename

    }
    // eksekusi 
    modelMobil.update(dataMobil, {where :{id_mobil:idMobil}})
    .then(result => {
        return response.json({
            message : `Data has been updated`
        })
    })
    .catch(error => {
        return response.json({
            message : error.message
        })
    })
}

exports.deleteDataMobil = async(request, response) => {
    let idMobil = request.params.id_mobil

    //ambil dulu data filename yang akan dihapus
    let mobil = await modelMobil.findOne({where: {id_mobil: idMobil}})
    if(mobil){
        let oldFileName = mobil.image

        //delete file
        let location = path.join(__dirname, "../image", oldFileName)
        fs.unlink(location, error => console.log(error))
    }


    // eksekusi 
    modelMobil.destroy({where :{id_mobil:idMobil}})
    .then(result => {
        return response.json({
            message : `Data Mobil berhasil dihapus`
        })
    })
    .catch(error => {
        return response.json({
            message : error.message
        })
    })
}