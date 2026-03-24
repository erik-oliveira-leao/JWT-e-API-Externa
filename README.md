# Para rodar este código no VSCode, siga estes passos:

1. Crie um novo diretório para o projeto e navegue até ele.
   ```bash
   mkdir my-jwt-app
   cd my-jwt-app
   ```

2. Inicialize um novo projeto Node.js.
   ```bash
   npm init -y
   ```

3. Instale as dependências necessárias.
   ```bash
   npm install express jsonwebtoken body-parser
   ```

4. Instale as dependências necessárias.
   ```bash
   npm install axios
   ```

5. Crie um arquivo chamado `server.js` e cole o código fornecido.

6. No terminal, execute o servidor.
   ```bash
   node server.js
   ```

7. Use um cliente HTTP como Postman ou Thunder Client para testar as rotas.
   - Faça um POST para `http://localhost:3000/login` com um body JSON: `{ id: 1, username: 'user1', password: 'password1', role: 'user' }`
    `{ id: 2, username: 'admin', password: 'adminpass', role: 'admin' }`.
   - Copie o token retornado e faça um GET para `http://localhost:3000/projects` com o token no Auth `bearer`.
   - Depois faça um get para `http://localhost:3000/projects/:id/weather`