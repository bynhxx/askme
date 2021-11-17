const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const connection = require('./database/database')
const Pergunta = require('./database/Pergunta')
const Resposta = require('./database/Resposta')

connection
    .authenticate()
    .then(() => {console.log("Conexao BD feita com sucesso")})
    .catch((err) => {console.log(err)})

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())



//rotas
app.get('/', (req, res) => {
    //buscando as perguntas e exibindo-as
    //select all from Pergunta
    //raw: nao buca informações "desnecessárias"
    Pergunta.findAll({raw: true, order: [['id', 'DESC']]})
        .then(perguntas => {            
            //criando uma variavel que recebe as perguntas do BD
            res.render("index", {
                perguntas: perguntas
            })
        })
})

app.get("/perguntar", (req, res) => {
    res.render('perguntar')
})

app.post('/salvarpergunta', (req, res) => {
    let title = req.body.titulo
    let description = req.body.descricao

    //salvando no BD (INSERT)
    Pergunta.create(
        {
            titulo: title, 
            descricao: description
        }
    ).then(() => {
        res.redirect("/")
    })
})


app.get('/pergunta/:id', (req, res) => {
    let id = req.params.id; 
    Pergunta.findOne({
        where: {id: id}, 
    }).then(pergunta => {
        if(pergunta != undefined) {

            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order: [['id', 'DESC']]
            }).then( (respostas) => {
                res.render("pergunta", {
                    pergunta: pergunta, 
                    respostas: respostas
                })
            })

        } else {
            res.redirect("/")
        }
    })
    //findOne() procura pela pergunta que passe no teste
})

app.post("/responder", (req, res) => {
    let corpo = req.body.corpo
    let perguntaId = req.body.pergunta

    Resposta.create({
        corpo: corpo, 
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/"+perguntaId)
    })
})

app.listen(3333, () => {
    console.log("Servidor inicializado :)")
}) 