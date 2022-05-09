const dbConn1 = require('../../config/ccrm.config')
const {errorHandler, resHandler, resCode} = require('../helpers/resHandler')

const getAll =  async (req, res)=>{
    dbConn1.query("Select * from crm_cat_regimen_matrimonial", async (err, array) => {
        try{
            resCode(err)
            resHandler(res, 'Registros encontrados', 'ccrm', await array)
        }catch(err){
            errorHandler(res, err, 'Registros no encontrados', 'ccrm')
        }
    })
}
const getById =  async (req, res)=> {
    dbConn1.query("Select * from crm_cat_regimen_matrimonial where id = ? ", req.params.id, async (err, regimen) => {
        try{
            resCode(err)
            if (await regimen.length === 0) throw 'Id invalido'
            resHandler(res, 'Registro encontrado', 'ccrm', await regimen)
        }catch(err){
            errorHandler(res, err, 'Registro no encontrado', 'ccrm')
        }
    })
}
const create =  async (req, res)=>{
    dbConn1.query("INSERT INTO crm_cat_regimen_matrimonial set ?", req.body, (err, a) => {
        try{
            resCode(err)
            resHandler(res, 'Registro creado', 'ccrm', req.body)
        }catch(err){
            errorHandler(res, err, 'Error al crear registro', 'ccrm')
        }
    })
}
const updateById =  async (req, res)=>{
    dbConn1.query("Select * from crm_cat_regimen_matrimonial where id = ? ", req.params.id, async (err, regimen) => {
        try{
            resCode(err)
            if (await regimen.length === 0) throw 'Id invalido'
            dbConn1.query("UPDATE crm_cat_regimen_matrimonial SET regimen_matrimonial=?,descripcion=?,id_usuario_alta=?,id_usuario_edicion=?,eliminado=? WHERE id = ?", [req.body.regimen_matrimonial, req.body.descripcion, req.body.id_usuario_alta, req.body.id_usuario_edicion, req.body.eliminado, req.params.id], () => {
                resHandler(res, 'Registro actualizado', 'ccrm', req.body,)
            })
        }catch(err){
            errorHandler(res, err, 'Registro no actualizado', 'ccrm')
        }
    })
}
const deleteById =  async (req, res)=>{
    dbConn1.query("Select * from crm_cat_regimen_matrimonial where id = ? ", req.params.id, async (err, regimen) => {
        try{
            resCode(err)
            if (await regimen.length === 0) throw 'Id invalido'
            dbConn1.query("UPDATE crm_cat_regimen_matrimonial SET eliminado= 1 WHERE id = ?", req.params.id, () => {
                resHandler(res, 'Registro eliminado', 'ccrm')
            })
        }catch(err){
            errorHandler(res, err, 'Registro no eliminado', 'ccrm')
        }
    })
}
module.exports = {getAll, getById, create, updateById, deleteById}
