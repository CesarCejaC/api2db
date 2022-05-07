const { check } = require('express-validator')
const { validateResult } = require('../utils/validatorUtils')

const validatePostAndPut = [
    check('regimen_matrimonial')
        .exists()
        .withMessage('Is required')
        .notEmpty()
        .trim()
        .isLength({ min: 3 })
        .withMessage('Must have minimum 3 chars'),
    check('descripcion')
        .exists()
        .withMessage('Is required')
        .trim()
        .isLength({ min: 3 })
        .withMessage('Must have minimum 3 chars'),
    check('id_usuario_alta')
        .exists()
        .withMessage('Is required')
        .notEmpty()
        .trim()
        .isNumeric()
        .withMessage('Must be a number'),
    check('id_usuario_edicion')
        .exists()
        .withMessage('Is required')
        .notEmpty()
        .trim()
        .isNumeric()
        .withMessage('Must be a number'),
    check('eliminado')
        .exists()
        .withMessage('Is required')
        .notEmpty()
        .trim()
        .isNumeric()
        .withMessage('Must be a number')
        .isLength({ max: 1 })
        .withMessage('Must be one digit')
        .isIn([1, 0])
        .withMessage('Must be 1 or 0'),
    (req, res, next) => {
        validateResult(req, res, next);
    }
]

const validategetByIdAndDelete = [
    check('id')
        .trim()
        .isNumeric()
        .withMessage('Must be a number'),
    (req, res, next) => {
        validateResult(req, res, next);
    }
]

module.exports = { validatePostAndPut, validategetByIdAndDelete }