const dbConn1 = require('../../config/ccrm.config')
const {errorHandler, resHandler} = require('../helpers/resHandler')

const getAll =  async (req, res)=>{
    dbConn1.query("Select * from crm_cat_regimen_matrimonial", async (err, array) => {
        if(err){
            res.send(errorHandler(err.sqlMessage, 'Registros no encontrados', 'ccrm'))
        }else{
            res.send(resHandler('Registros encontrados', 'ccrm', await array))
        }
    })
}

const getById =  async (req, res)=> {
    dbConn1.query("Select * from crm_cat_regimen_matrimonial where id = ? ", req.params.id, async (err, regimen) => {
        if(err){
            res.send(errorHandler(err.sqlMessage , 'Registro no encontrado', 'ccrm'))
        }else if (await regimen.length === 0) {
            res.send(errorHandler('Invalid id' , 'Registro no encontrado', 'ccrm'))
        }else{
            res.send(resHandler('Registro encontrado', 'ccrm', await regimen))
        }
    })
}

const create =  async (req, res)=>{
    dbConn1.query("INSERT INTO crm_cat_regimen_matrimonial set ?", req.body, err => {
        if(err){
            res.send(errorHandler(err.sqlMessage, 'Error al crear registro', 'ccrm'))
        }else{
            res.send(resHandler('Registro creado', 'ccrm', req.body))
        }
    })
}

const updateById =  async (req, res)=>{
    dbConn1.query("Select * from crm_cat_regimen_matrimonial where id = ? ", req.params.id, async (err, regimen) => {
        if(err){
            res.send(errorHandler(err.sqlMessage , 'Registro no actualizado', 'ccrm'))
        }else if (await regimen.length === 0) {
            res.send(errorHandler('Invalid id' , 'Registro no actualizado', 'ccrm'))
        }else{
            dbConn1.query("UPDATE crm_cat_regimen_matrimonial SET regimen_matrimonial=?,descripcion=?,id_usuario_alta=?,id_usuario_edicion=?,eliminado=? WHERE id = ?", [req.body.regimen_matrimonial, req.body.descripcion, req.body.id_usuario_alta, req.body.id_usuario_edicion, req.body.eliminado, req.params.id], () => {
                res.send(resHandler('Registro actualizado', 'ccrm', req.body,))
            })
        }
    })
}

const deleteById =  async (req, res)=>{
    dbConn1.query("Select * from crm_cat_regimen_matrimonial where id = ? ", req.params.id, async (err, regimen) => {
        if(err){
            res.send(errorHandler(err.sqlMessage , 'Registro no eliminado', 'ccrm'))
        }else if (await regimen.length === 0) {
            res.send(errorHandler('Invalid id' , 'Registro no eliminado', 'ccrm'))
        }else{
            dbConn1.query("UPDATE crm_cat_regimen_matrimonial SET eliminado= 1 WHERE id = ?", req.params.id, () => {
                res.send(resHandler('Registro eliminado', 'ccrm'))
            })
        }
    })
}

module.exports = {getAll, getById, create, updateById, deleteById}
