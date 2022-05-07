const dbConn = require('../../config/ccrmcadu.config')
const {errorHandler, resHandler} = require('../helpers/resHandler')

const getAll =  async (req, res)=>{
    dbConn.query("Select * from crm_cat_regimen_matrimonial", async (err, array) => {
        if(err){
            res.send(errorHandler(err.sqlMessage, 'Registros no encontrados'))
        }else{
            res.send(resHandler('Registros encontrados', await array))
        }
    })
}

const getById =  async (req, res)=> {
    dbConn.query("Select * from crm_cat_regimen_matrimonial where id = ? ", req.params.id, async (err, regimen) => {
            try{
                if (err) throw `${err.sqlMessage}`
                if (await regimen.length === 0) throw 'Id invalido'
                res.send(resHandler('Registro encontrado', await regimen))
            }catch(err){
                res.send(errorHandler(err, 'Registro no encontrado'))
            }
    })
}

const create =  async (req, res)=>{
    dbConn.query("INSERT INTO crm_cat_regimen_matrimonial set ?", req.body, (err, a) => {
        try{
            if (err) throw `${err.sqlMessage}`
            res.send(resHandler('Registro creado', req.body))
        }catch(err){
            res.send(errorHandler(err.sqlMessage, 'Error al crear registro'))
        }



        // if(err){
        //     res.send(errorHandler(err.sqlMessage, 'Error al crear registro'))
        // }else{
        //     res.send(resHandler('Registro creado', req.body))
        // }
    })
}

const updateById =  async (req, res)=>{
    dbConn.query("Select * from crm_cat_regimen_matrimonial where id = ? ", req.params.id, async (err, regimen) => {
        try{
            if (err) throw `${err.sqlMessage}`
            if (await regimen.length === 0) throw 'Id invalido'
            dbConn.query("UPDATE crm_cat_regimen_matrimonial SET regimen_matrimonial=?,descripcion=?,id_usuario_alta=?,id_usuario_edicion=?,eliminado=? WHERE id = ?", [req.body.regimen_matrimonial, req.body.descripcion, req.body.id_usuario_alta, req.body.id_usuario_edicion, req.body.eliminado, req.params.id], () => {
                        res.send(resHandler('Registro actualizado', req.body,))
                    })
        }catch(err){
            res.send(errorHandler(err, 'Registro no actualizado'))
        }
    })
}

const deleteById =  async (req, res)=>{
        dbConn.query("Select * from crm_cat_regimen_matrimonial where id = ? ", req.params.id, async (err, regimen) => {
            try{
                if (err) throw `${err.sqlMessage}`
                if (await regimen.length === 0) throw 'Id invalido'
                dbConn.query("UPDATE crm_cat_regimen_matrimonial SET eliminado= 1 WHERE id = ?", req.params.id, () => {
                    res.send(resHandler('Registro eliminado'))
                })
            }catch(err){
                res.send(errorHandler(err, 'Registro no eliminado'))
            }
        })
}

module.exports = {getAll, getById, create, updateById, deleteById}
