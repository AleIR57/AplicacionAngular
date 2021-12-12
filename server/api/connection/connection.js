const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    pasword: '',
    database: 'subasya',
});

mysqlConnection.connect( err =>{
    if(err){
        console.log('Error en db: ', err);
        return;
    }
    else{
        console.log("Db ok");
    }
});

module.exports = mysqlConnection;