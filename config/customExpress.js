//Configurações do Express

const express = require('express')
const consign = require('consign')


module.exports = () => {
  const app = express()

  //Quais tipos de dados ele deve aceitar:
  app.use(express.urlencoded({extended: true}))
  app.use(express.json())

  //Ainda não entendi ao certo, mas ele faz com que os arquivos da pasta controlers, possam utilizar o objeto app
  consign()
    .include('controlers')
    .into(app)

  return app
}

  