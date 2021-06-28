const { response, request } = require('express');
const bcryptjs = require('bcryptjs');



const Usuario = require('../models/usuario');


const usuariosGet = (req = request, res = response) => {

    const { q, nombre = 'NO NAME', apikey, page = 1, limit } = req.query;

    res.json({
        msg: 'get API',
        q,
        nombre,
        apikey,
        page,
        limit
    })
}

const usuariosPost = async (req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    //Verificar Correo existente
    const existeEmail = await Usuario.findOne({ correo: correo });
    if (existeEmail) {
        return res.status(400).json({
            msg: 'Correo ya registrado'
        })
    }

    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);


    //Grabar en DB
    await usuario.save();

    res.status(201).json({
        msg: 'post API',
        usuario
    })
}

const usuariosPut = (req, res = response) => {

    const id = req.params.id;

    res.json({
        msg: 'put API',
        id
    })
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API'
    })
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API'
    })
}



module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}