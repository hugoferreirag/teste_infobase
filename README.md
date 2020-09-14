# Back End Teste Info base

## Instalar dependencias
```
npm i
```

### Compilação em dev
```
node app.js 

OBS: utlizei a lib "Nodemon" instalado globalmente em desenvolvimento.

```
### Configuração dotEnv: Configurar .env inserindo a porta que o sistema ira rodar e o link para o banco de dados mongoDB, exemplo:
```
PORT='NUMERO_DA_PORTA'
DB=http://url_do_banco_de_dados/nome_do_banco
```

### Ferramentas utilizadas:
```
Node.js, Javascript, Express, cors, bodyParser, bcrypt, jsonwebtoken.
```

### Endpoint de Authenticação e Usuários para acesso

##### Endpoint para criar usuário de acesso
```
METHOD: POST
url: https://infobaseteste.herokuapp.com/signup

REQUEST BODY 
{
    "name":"testando",
    "email":"teste@gmail.com",
    "password": "1s34",
    "phones": [
        {
            "number":"999-3455",
            "ddd":"11"
        },
        {
            "number":"999-3455",
            "ddd":"11"
        }
    ]
    }

```
##### Endpoint para acessar o sistema "LOGIN"
```
METHOD: POST
url: https://infobaseteste.herokuapp.com/signin
REQUEST BODY 
{
email: algumemail@gmail.com,
password: senha123
}
```
##### Endpoint para buscar usuario
```
HEADERS:
Authorization Bearer {{token_jwt}}

METHOD: GET
url: https://infobaseteste.herokuapp.com/finduser/:user_id

REQUEST BODY 
{}
```




