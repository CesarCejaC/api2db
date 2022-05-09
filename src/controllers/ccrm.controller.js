const dbConn1 = require('../../config/ccrm.config')
const {errorHandler, resHandler} = require('../helpers/resHandler')

const getAll =  async (req, res)=>{
    dbConn1.query("Select * from crm_cat_regimen_matrimonial", async (err, array) => {
        try{
            if (err) throw `${err.sqlMessage}`
            resHandler(res, 'Registros encontrados', 'ccrmcadu', await array)
        }catch(err){
            errorHandler(res, err, 'Registros no encontrados', 'ccrmcadu')
        }
    })
}

const getById =  async (req, res)=> {
    dbConn1.query("Select * from crm_cat_regimen_matrimonial where id = ? ", req.params.id, async (err, regimen) => {
        try{
            if (err) throw `${err.sqlMessage}`
            if (await regimen.length === 0) throw 'Id invalido'
            resHandler(res, 'Registro encontrado', 'ccrmcadu', await regimen)
        }catch(err){
            errorHandler(res, err, 'Registro no encontrado', 'ccrmcadu')
        }
    })
}

const create =  async (req, res)=>{
    dbConn1.query("INSERT INTO crm_cat_regimen_matrimonial set ?", req.body, (err, a) => {
        try{
            if (err) throw `${err.sqlMessage}`
            resHandler(res, 'Registro creado', 'ccrmcadu', req.body)
        }catch(err){
            errorHandler(res, err.sqlMessage, 'Error al crear registro', 'ccrmcadu')
        }
    })
}

const updateById =  async (req, res)=>{
    dbConn1.query("Select * from crm_cat_regimen_matrimonial where id = ? ", req.params.id, async (err, regimen) => {
        try{
            if (err) throw `${err.sqlMessage}`
            if (await regimen.length === 0) throw 'Id invalido'
            dbConn1.query("UPDATE crm_cat_regimen_matrimonial SET regimen_matrimonial=?,descripcion=?,id_usuario_alta=?,id_usuario_edicion=?,eliminado=? WHERE id = ?", [req.body.regimen_matrimonial, req.body.descripcion, req.body.id_usuario_alta, req.body.id_usuario_edicion, req.body.eliminado, req.params.id], () => {
                resHandler(res, 'Registro actualizado', 'ccrmcadu', req.body,)
            })
        }catch(err){
            errorHandler(res, err, 'Registro no actualizado', 'ccrmcadu')
        }
    })
}

const deleteById =  async (req, res)=>{
    dbConn1.query("Select * from crm_cat_regimen_matrimonial where id = ? ", req.params.id, async (err, regimen) => {
        try{
            if (err) throw `${err.sqlMessage}`
            if (await regimen.length === 0) throw 'Id invalido'
            dbConn1.query("UPDATE crm_cat_regimen_matrimonial SET eliminado= 1 WHERE id = ?", req.params.id, () => {
                resHandler(res, 'Registro eliminado', 'ccrmcadu')
            })
        }catch(err){
            errorHandler(res, err, 'Registro no eliminado', 'ccrmcadu')
        }
    })
}

module.exports = {getAll, getById, create, updateById, deleteById}
