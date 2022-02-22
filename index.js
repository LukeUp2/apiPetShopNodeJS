//Pasta responsavel por realizar as devidas conexoes e subir o servidor

//Importação do Express customizado
const customExpress = require('./config/customExpress')
//Objeto da conexao com o banco, que sera utilizado para se comunicar com ele
const conexao = require('./infraestrutura/conexao')
//Classe responsavel por criar as tabelas do banco de dados (foi exportado instanciado)
const Tabelas = require('./infraestrutura/tabelas')

conexao.connect((err) => {
  if(err){
    console.log(err)
  } else {
    console.log('Conectado com o banco!')

    //Cria as tabelas necessarias
    Tabelas.init(conexao)
    const app = customExpress()

    //Sobe o servidor
    app.listen(3000, () => {
    console.log('Servidor Rodando na porta 3000')
  })
  }
})



