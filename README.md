
<p  align="center">

  

  

<a  href="http://nestjs.com/"  target="blank"><img  src="https://nestjs.com/img/logo_text.svg"  width="320"  alt="Nest Logo"  /></a>

  

  

</p>

  

  

  

## Descrição

  

  

  

Teste de backend feito em NestJS

  

  

Esta aplicação utiliza TypeORM e Postgres como banco de dados Principal.

  

  

Foram utilizadas as boas práticas conforme orientadas pelo framework, com o código dividido em módulos, onde cada módulo possui subpastas para alocar os *Controllers, Services, Repositories e Entities* entre outro. Dessa forma, têm-se agrupado os arquivos de mesmas categorias, ficando apenas os arquivos **.modules.ts* na raiz de cada módulo.

  

  

  

![Lista de Arquivos](assets/tree.png)

  

  

  

Também foi inserido o arquivo Dockerfile ao projeto para facilitar a criação de imagem Docker deste projeto.

  

  

## Instalação

  

  

  

Primeiro baixe o projeto usando o git

  

  

```bash
$ git clone <repo>
```

  

  

Após baixar o repositório, navegue até a pasta do projeto e dê o comando

  

```bash
$ npm install
```

  

  

  

## Configurações
Com um editor de texto de sua preferência, edite o arquivo `src\config\typeorm.config.ts` e insira as configurações referentes à conexão com o banco de dados Postgres.

  

  

  

![Configuração do Banco de Dados](assets/bdconfig.png)

  

  

  

## Execução

  

  

Para dar início à aplicação, escolha um dos três modos a seguir

  

  

```bash
# Desenvolvimento
$ npm run start

# Desenvolvimento com atualizações a cada alteração
$ npm run start:dev

# Produção
$ npm run start:prod
```

  

  

Quando executando em modo de desenvolvimento com atualizações a cada alteração, o terminal deve apresentar resultado semelhante à este:

  

  

![Terminal](assets/terminal.png)

  

  

## Acessando o sistema

O sistema irá executar em `http://localhost:3000`

A documentação das rotas disponíveis pode ser encontrada em `http://localhost:3000/swagger/`

  
  

![Swagger](assets/swagger.png)

  

É possível testar os endpoints da aplicação pela própria documentação ou por outros clientes rest, no caso dos prints a seguir, foi o usado o Insomnia.

  
##### Users index
![Users index](assets/index_users.png)

  
  
##### User Profile
![User Profile](assets/profile.png)

  
  
##### User Register
![User Register](assets/register.png)

  
  
##### Post Create
![Post Create](assets/post_create.png)

  
  
##### Posts Index
![Posts Index](assets/post_index.png)

  
  
  

## Testes

  

  

Para esta aplicação foram escritos testes unitários que verificam a integridade do código.

  

  

  

> Os testes devem executar sem apresentar erros.

  

  

  

```bash
# Testes unitários
$ npm run test
```

  

  

  

## Licença

  

  

  

Nest is [MIT licensed](LICENSE).
