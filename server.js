const express = require('express');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const app = express();
app.use(express.json());

const SECRET_KEY = 'my_secret_key';

// Usuários fictícios para autenticação
const users = [
    { id: 1, username: 'user1', password: 'password1', role: 'user' },
    { id: 2, username: 'admin', password: 'adminpass', role: 'admin' }
];

// Função para gerar token JWT
function generateToken(user) {
    return jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
}

// Middleware de autenticação
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// Middleware de autorização baseado em papéis
function authorizeRole(role) {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.sendStatus(403);
        }
        next();
    };
}

// Rota de login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        const token = generateToken(user);
        res.json({ token });
    } else {
        res.sendStatus(401);
    }
});

// Rota de projetos protegida (apenas usuários autenticados)
app.get('/projects', authenticateToken, (req, res) => {
    res.json({ projects: ['Projeto A', 'Projeto B'] });
});

// Rota para obter o clima de um projeto (integração com API externa)
app.get('/projects/:id/weather', authenticateToken, (req, res) => {
    const city = 'São Paulo';  // Exemplo: cidade do projeto
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=166bff1a42b21993a7d6803bd84ce30e`)
        .then(response => {
            res.json({ weather: response.data });
        })
        .catch(error => {
            res.status(500).json({ error: 'Erro ao obter informações do clima' });
        });
});

// Rota para atualizar projeto (apenas admins)
app.put('/projects/:id', authenticateToken, authorizeRole('admin'), (req, res) => {
    res.send('Projeto atualizado com sucesso.');
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});