// memanggil file model untuk pelanggaran
let modelSewa = require("../models/index").sewa 

exports.getDataSewa = (request, response) => {
    
}

exports.addDataSewa = (request, response) => {
    // tampung data request
    let newSewa = {
        id_mobil: request.body.id_mobil,
        id_karyawan: request.body.id_karyawan,
        id_pelanggan: request.body.id_pelanggan,
        tgl_sewa: request.body.tgl_sewa,
        tgl_kembali: NULL,
        total_bayar: request.body.total_bayar
    }

    modelSewa.create(newSewa)
    .then(result => {
        return response.json({
            message: `Data Sewa Berhasil Ditambahnkan`
        })
    })
    .catch(error => {
        return response.json({
            message: error.message
        })
    })
}

exports.editDataSewa = (request, response) => {
    let id = request.params.id

    
    let dataSewa = {
        id_mobil: request.body.id_mobil,
        id_karyawan: request.body.id_karyawan,
        id_pelanggan: request.body.id_pelanggan,
        tgl_sewa: request.body.tgl_sewa,
        tgl_kembali: request.body.tgl_kembali,
        total_bayar: request.body.total_bayar
    }

    modelSewa.update(dataSewa, { where: { id: id } })
    .then(result => {
        return response.json({
            message: `Data Sewa Berhasil diUpdate`
        })
    })
    .catch(error => {
        return response.json({
            message: error.message
        })
    })
}

exports.deleteDataSewa = (request, response) => {
    let id = request.params.id
    
    modelSewa.destroy({ where: { id: id } })
    .then(result => {
        return response.json({
            message: `Data Sewa Berhasil diHapus`
        })
    })
    .catch(error => {
        return response.json({
            message: error.message 
        })
    })
}