//No terminal, digite mysql.server start para iniciar o servidor
//Depois realize a conexao com o banco para poder visualizar no terminal as modificações mysql -h localhost -u root -p
//Ao finalizar, digite mysql.server stop para parar o servidor

const mysql = require('mysql2')

//Conectar com o banco
const conexao = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '002488123',
  database: 'agendapetShop'
})

module.exports = conexao