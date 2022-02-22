//Arquivo responsável por administrar as rotas do atendimento
//E o que cada rota deve fazer

const Atendimentos = require('../models/atendimentos')

module.exports = app => {
  //Lista todos os atendimentos cadastrados
  app.get('/atendimentos', (req, res) => {
    Atendimentos.lista(res)
  })

  //Pesquisa um atendimento especifico
  app.get('/atendimentos/:id', (req, res) => {
    const id = parseInt(req.params.id)

    Atendimentos.buscaPorId(id, res)
  })

  //Cadastrar um atendimento
  app.post('/atendimentos' , (req, res) => {
    //Recebe as informações do atendimento (cliente, serviço e etc...)
    const atendimento = req.body

    //Usa o método da classe Atendimento para adicionar esse atendimento no banco de dados
    Atendimentos.adiciona(atendimento, res)
  })

  //Modificar um atendimento
  app.patch('/atendimentos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const modificacoes = req.body

    Atendimentos.alterar(id, modificacoes, res)
  })

  //Deletar um atendimento
  app.delete('/atendimentos/:id', (req, res) => {
    const id = parseInt(req.params.id)

    Atendimentos.deletar(id, res)
  })
}