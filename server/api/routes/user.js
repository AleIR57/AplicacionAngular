const express = require('express');
const router = express.Router();

const mysqlConnection = require('../connection/connection');

const jwt = require('jsonwebtoken');


router.get('/', (req,res) =>{
    mysqlConnection.query('select * from Usuario', (err,rows,fields) => {
        if(!err){
            res.json(rows);
        }
        else{
            console.log(err);
        }
    })
});


router.post('/singin', (req, res) =>{
    const { correo, contrasena}  = req.body;
    mysqlConnection.query("Select idUsuario, nombre, correo, contrasena, idRol from Usuario where correo=? and contrasena=?", 
    [correo, contrasena],
    (err, rows, fields) =>{
        if(!err){
            if(rows.length > 0){
                let data = JSON.stringify(rows[0]);
                const token = jwt.sign(data, 'sujeto');
                res.json({token});
            }
            else{
                res.json("Correo o clave incorrecta");
            }
        }
        else{
            console.log(err);
        }
    }
    )
})

router.post('/test', verifyToken, (req,res) =>{
    console.log(req.data);

    res.json("Información secreta");
})


function verifyToken(req,res, next){
    if(!req.headers.authorization) return res.status(401).json("No autorizado");

    const token = req.headers.authorization.substr(7);
    if(token !== ''){
        const content = jwt.verify(token, 'sujeto');
        req.data = content;
        next();
    }
    else{
        res.status(401).json("Token vacío");
    }
}


module.exports = router;