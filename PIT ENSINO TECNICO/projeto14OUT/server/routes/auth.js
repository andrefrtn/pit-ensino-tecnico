const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

const jwtSecret = process.env.JWT_SECRET || 'secreta'; // Use uma variável de ambiente para a chave secreta

// Rota para registrar um novo usuário
router.post('/cadastro', async (req, res) => {
  try {
    const { username, email, senha, cpf } = req.body;

    // Verificar se o e-mail já está em uso
    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(400).json({ error: 'E-mail já cadastrado' });
    }

    // Verificar se o CPF já está em uso
    const existingCPF = await User.findOne({ where: { cpf } });
    if (existingCPF) {
      return res.status(400).json({ error: 'CPF já cadastrado' });
    }

    // Verificar se o nome de usuário já está em uso
    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) {
      return res.status(400).json({ error: 'Nome de usuário já cadastrado' });
    }

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Criar o novo usuário
    const user = await User.create({
      username,
      email,
      cpf,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error); // Adicione um log para ajudar na depuração
    res.status(500).json({ error: 'Erro ao cadastrar usuário' });
  }
});

// Rota para login de usuário
router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Verificar se o usuário existe
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Verificar se a senha está correta
    const isPasswordValid = await bcrypt.compare(senha, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Senha inválida' });
    }

    // Gerar um token JWT
    const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error('Erro ao fazer login:', error); // Adicione um log para ajudar na depuração
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
});

// Middleware para proteger rotas (apenas exemplo, opcional)
const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' });

    const token = authHeader.split(' ')[1];

    jwt.verify(token, jwtSecret, (err, user) => {
      if (err) return res.status(403).json({ error: 'Token inválido' });

      if (roles.length && !roles.includes(user.role)) {
        return res.status(403).json({ error: 'Acesso negado' });
      }

      req.user = user;
      next();
    });
  };
};

// Exportar as rotas e o middleware (se necessário)
module.exports = router;
