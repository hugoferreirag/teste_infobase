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
DB=URL_DO_CLUSTER_MONGO_DB
```

### Ferramentas utilizadas:
```
Node.js, Javascript, Express, cors, bodyParser, bcrypt, jsonwebtoken e moment.js.
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
RESPONSE:
{
    "id": "5f5f600b9fcb53001741744e",
    "data_criacao": "14/09/2020 12:20:27",
    "data_atualizacao": "14/09/2020 12:20:27",
    "ultimo_login": "14/09/2020 12:20:27",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0ZXZhbkBnbWFpbC5jb20iLCJpYXQiOjE2MDAwODYwMjd9.F_fUOqBgxLTl7Od1ibS1h4h3g8hkLG4NGtpGLrCmqDc"
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

RESPONSE:
{
    "id": "5f5f600b9fcb53001741744e",
    "data_criacao": "14/09/2020 12:20:27",
    "data_atualizacao": "14/09/2020 12:20:27",
    "ultimo_login": "14/09/2020 12:20:50",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0ZXZhbkBnbWFpbC5jb20iLCJpYXQiOjE2MDAwODYwMjd9.F_fUOqBgxLTl7Od1ibS1h4h3g8hkLG4NGtpGLrCmqDc"
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

RESPONSE:
{
    "user_id": "5f5f600b9fcb53001741744e",
    "nome": "stevan",
    "email": "stevan@gmail.com",
    "telefones": [
        {
            "number": "999-3455",
            "ddd": "11"
        },
        {
            "number": "999-3455",
            "ddd": "11"
        }
    ],
    "data_criacao": "14/09/2020 12:20:27",
    "data_atualizacao": "14/09/2020 12:21:27",
    "ultimo_login": "14/09/2020 12:21:27"
}
```




