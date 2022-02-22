const moment = require('moment')

//Classe responsável por realizar as operações com o banco de dados envolvendo os Atendimentos
//Objeto da conexao com o banco 
const conexao = require('../infraestrutura/conexao')


class Atendimento {
  //Método que adiciona um atendimento no banco
  adiciona(atendimento, res){

    //Formatação das datas para o formato aceito pelo banco
    const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
    const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

    //Armazena um bool indicando se tal dado é válido
    const dataValida = moment(data).isSameOrAfter(dataCriacao)
    const clienteValido = atendimento.cliente.length >= 5

    //Array de objetos que guarda as mensagens de erros e o campo que deve ser alterado
    const validacoes = [
      {
        nome: 'data',
        valido: dataValida, 
        mensagem: 'Data deve ser maior ou igual que a data atual'
      },
      {
        nome: 'cliente',
        valido: clienteValido,
        mensagem: 'Cliente deve ter pelo menos cinco caracteres'
      }
    ]

    //Um filtro que armazena em um array todos os objetos em que o campo "valido" seja igual a  "false"
    const erros = validacoes.filter(campo => !campo.valido)
    //Checa se existem objetos com erro
    const existemErros = erros.length

    if(existemErros){
      res.status(400).json()
    } else {
        //Cria o objeto com as datas no formato aceito pelo banco
        const atendimentoComData = {
          ...atendimento,
          dataCriacao,
          data
        }
        //Comando SQL
        const sql = 'INSERT INTO Atendimentos SET ?'
    
        //Utilização do método query para rodar o comando SQL
        //conexao.query(Comando SQL, Objeto com os dados, funçao callback)
        conexao.query(sql, atendimentoComData, (err, resultados) => {
          if(err){
            res.status(400).json(err)
          } else {
            res.status(201).json(atendimento)
          }
        })
    }
  }

  //Método que lista todos os atendimentos cadastrados
  lista(res){
    const sql = 'SELECT * FROM Atendimentos'

    conexao.query(sql, (erro, resultados) => {
      if(erro){
        res.status(400).json()
      } else {
        res.status(200).json(resultados)
      }
    })
  }

  //Método que pesquisa um atendimento especifico pelo seu ID
  buscaPorId(id, res){
    const sql = `SELECT * FROM Atendimentos WHERE id=${id}`

    conexao.query(sql, (erro, resultados) => {
      const atendimento = resultados[0]
      if(erro){
        res.status(400).json()
      } else {
        res.status(200).json(atendimento)
      }
    })
  }

  //Método que realiza alterações em um atendimento pelo seu ID
  alterar(id, modificacoes, res){

    //Se a data irá sofrer uma modificação, formate a nova data para o padrão aceito pelo banco
    if(modificacoes.data){
      modificacoes.data = moment(modificacoes.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
    }
    const sql = 'UPDATE Atendimentos SET ? WHERE id=?'

    conexao.query(sql, [modificacoes, id], (erro, resultados) => {
      if(erro){
        res.status(400).json()
      } else {
        //Retorne um objeto com todas as modificações junto com o ID
        res.status(200).json({...modificacoes, id})
      }
    })
  }

  //Método que deleta um atendimento pelo seu ID
  deletar(id, res){
    const sql = 'DELETE FROM Atendimentos WHERE id=?'

    conexao.query(sql, id, (erro, resultados) => {
      if(erro){
        res.status(400).json()
      } else {
        res.status(200).json({'deletado': id})
      }
    })
  }
}
//Exportando a classe ja instanciada
module.exports = new Atendimento