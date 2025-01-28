const express = require('express');
const router = express.Router();
const getConnection = require('../conexion');


router.get('/buscarUsuarioCedula/:cedula', (req, res) => {
    getConnection(function (err, connection) {
        const { cedula } = req.params;

        if (err) {
            return res.sendStatus(400);
        }
        
        connection.query('SELECT * FROM usuario WHERE cedulausuario = ?', [cedula], function (err, rows) {
            if (err) {
                return res.status(400).send('No se pudo realizar la consulta');
            }
            res.send(rows);
            connection.release();
        });
    });
});


//Insertar un nuevo usuario
router.post('/insertarUsuario/', (req, res, next) => {
    const data = {
        nombreusuario : req.body.nombreusuario,
        cedulausuario : req.body.cedulausuario,
        correousuario : req.body.correousuario,
        telefonousuario : req.body.telefonousuario,
        direccionusuario : req.body.direccionusuario
    }

    const query = "INSERT INTO usuario (nombreusuario, cedulausuario, telefonousuario, direccionusuario, correousuario) VALUES (?, ?, ?, ?, ?)";

    const params = [data.nombreusuario, data.cedulausuario, data.telefonousuario, data.direccionusuario, data.correousuario];

    getConnection(function (err, user){
        if(err){
            console.log("No se puede realizar la conexion a la BDD " + err);
        }
        user.query(query, params, function (err, result){
            if(!err){
                res.json({ status: 'Registro exitoso'})
            }else{
                console.log(err);
            }
        })
    })
});

//Consultar todos los usuarios de la tabla
router.get('/buscarUsuarios/', (req, res) => {
    getConnection(function (err, conn) {
        if (err) {
            return res.sendStatus(400);
        }   
        
        conn.query('SELECT * FROM usuario', function (err, rows) {
            if (err) {
                return res.sendStatus(400).send('No se pudo realizar la consulta');
            }
            res.send(rows);
            conn.release();
        });
    });
});


// Eliminar un usuario por cédula
router.delete('/usuario/delete/:cedula', (req, res) => {
    const { cedula } = req.params;

    getConnection(function (err, conn) {
        if (err) {
            console.log("No se puede conectar a la Base de Datos");
            res.status(500).json({ error: 'Error de conexión a la base de datos' });
        } else {
            const query = 'DELETE FROM usuario WHERE cedulausuario = ?';

            conn.query(query, [cedula], function (err, result) {
                if (err) {
                    conn.release();
                    console.log(err);
                    res.status(500).json({ error: 'Error al eliminar el usuario' });
                } else {
                    if (result.affectedRows > 0) {
                        res.json({ status: 'Usuario eliminado exitosamente' });
                    } else {
                        res.status(404).json({ error: 'Usuario no encontrado' });
                    }
                    conn.release();
                }
            });
        }
    });
});

// Consulta usuario por ID
router.get('/usuario/getById/:id', (req, res) => {
    getConnection((err, conn) => {
        if (err) {
            return res.sendStatus(400);
        } else {
            const { id } = req.params;
            conn.query('SELECT * FROM usuario WHERE idusuario = ?', [id], (err, rows) => {
                if (err) {
                    conn.release();
                    return res.status(500).send('No se puede conectar a la base de datos');
                } else {
                    res.send(rows);
                    conn.release();
                }
            });
        }
    });
});


// Actualizar por id
router.put('/usuario/update/:id', (req, res) => {
    const { id } = req.params;
    const data = {
        nombreusuario: req.body.nombreusuario,
        cedulausuario: req.body.cedulausuario,
        telefonousuario: req.body.telefonousuario,
        direccionusuario: req.body.direccionusuario,
        correousuario: req.body.correousuario
    };

    const query = `UPDATE usuario SET nombreusuario = ?, cedulausuario = ?, 
                   telefonousuario = ?, direccionusuario = ?, correousuario = ? 
                   WHERE idusuario = ?`;

    getConnection(function(err, conn) {
        if (err) {
            console.log("No se puede conectar a la Base de Datos");
            res.status(500).json({ error: 'Error de conexión a la base de datos' });
        } else {
            conn.query(query, [data.nombreusuario, data.cedulausuario,
                data.telefonousuario, data.direccionusuario, data.correousuario, id],
                function(err, result) {
                    if (err) {
                        conn.release();
                        console.log(err);
                        res.status(500).json({ error: 'Error al actualizar el usuario' });
                    } else {
                        if (result.affectedRows > 0) {
                            res.status(200).json({ status: 'Usuario actualizado exitosamente' });
                        } else {
                            res.status(404).json({ error: 'Usuario no encontrado' });
                        }
                        conn.release();
                    }
                });
        }
    });
});

// Eliminar un usuario por ID
router.delete('/usuario/delete/:id', (req, res) => {
    const { id } = req.params;

    getConnection(function (err, conn) {
        if (err) {
            console.log("No se puede conectar a la Base de Datos");
            res.status(500).json({ error: 'Error de conexión a la base de datos' });
        } else {
            const query = 'DELETE FROM usuario WHERE idusuario = ?';

            conn.query(query, [id], function (err, result) {
                if (err) {
                    conn.release();
                    console.log(err);
                    res.status(500).json({ error: 'Error al eliminar el usuario' });
                } else {
                    if (result.affectedRows > 0) {
                        res.json({ status: 'Usuario eliminado exitosamente' });
                    } else {
                        res.status(404).json({ error: 'Usuario no encontrado' });
                    }
                    conn.release();
                }
            });
        }
    });
});


module.exports = router;