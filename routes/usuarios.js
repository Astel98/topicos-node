
const { Router } = require('express');
const { check } = require('express-validator');

const Rol = require('../models/rol');

const { validarCampos } = require('../middlewares/validar-campos');

const {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio con 6 o mas').isLength({ min: 6 }),
    check('correo', 'El correo es invalido').isEmail(),
    //check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(async (rol = '') => {
        const existeRol = await Rol.findOne({ rol });

        if (!existeRol) {
            throw new Error(`El rol ${rol} no esta registrado en la DB`)
        }

    }),
    validarCampos
], usuariosPost);

router.delete('/', usuariosDelete);

router.patch('/', usuariosPatch);



module.exports = router;