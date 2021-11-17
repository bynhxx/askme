/* 

Tecnologias do projeto: 
EJS -> renderiza o html e permite o uso do JS no template 
MySQL, Node, Sequelize, Bootstrap, 
bodyparser -> trabalhar com formulários


<%- include('./partials/header.ejs') %>


=> MODEL
Estrutura de dados que representa a tabela do Banco de Dados. 
Para salvar dados dentro de uma tabela: 
chamar o model invocando o método create() (insert into..)

Para exibir os dados, basta também trabalhar com os seus respectivos models
1) buscar dados com findAll()
2) enviar para o front através do método render


*/