const express = require('express');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
const cors = require('cors');
const nodemailer = require('nodemailer'); // Instale esta biblioteca
const crypto = require('crypto'); // Para gerar tokens

const app = express();
app.use(express.json());
app.use(cors());

// Configuração do PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'CoinControl',
    password: '1234',
    port: 5432,
});

// Endpoint de login
app.post('/login', async (req, res) => {
    const { userName, password } = req.body;

    try {
        const user = await pool.query('SELECT * FROM usuarios WHERE email = $1', [userName]);

        if (user.rows.length === 0) {
            return res.status(400).json({ message: 'Usuário não encontrado' });
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].senha);

        if (!validPassword) {
            return res.status(400).json({ message: 'Senha incorreta' });
        }

        res.status(200).json({ message: 'Login bem-sucedido' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro no servidor' });
    }
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Hash a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const result = await pool.query(
            'INSERT INTO usuarios (email, senha) VALUES ($1, $2) RETURNING id',
            [username, hashedPassword]
        );
        res.status(201).json({ id: result.rows[0].id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao cadastrar usuário' });
    }
});

app.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);

        if (user.rows.length === 0) {
            return res.status(400).json({ message: 'Usuário não encontrado' });
        }

        // Gerar um token de redefinição
        const token = crypto.randomBytes(20).toString('hex');

        // Aqui você deve armazenar o token no banco de dados com uma data de expiração
        await pool.query('UPDATE usuarios SET reset_token = $1, reset_expires = NOW() + INTERVAL \'1 hour\' WHERE email = $2', [token, email]);

        // Configurar o transportador do Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail', // ou outro serviço de email
            auth: {
                user: 'coincontrol0@gmail.com',
                pass: 'hppd kxwg eovt xxqx',
            },
        });

        // Configurar o email
        const mailOptions = {
            from: 'coincontrol0@gmail.com',
            to: email,
            subject: 'Redefinição de senha',
            text: `Você está recebendo este email porque recebemos uma solicitação de redefinição de senha para sua conta. \n\n` +
                `Por favor, clique no seguinte link para redefinir sua senha: \n` +
                `http://localhost:5000/reset-password/${token} \n\n` + // Atualize a porta se necessário
                `Se você não solicitou uma redefinição de senha, ignore este email.`
        };

        // Enviar o email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Erro ao enviar email:", error); // Adiciona log detalhado do erro
                return res.status(500).json({ message: 'Erro ao enviar email' });
            }
            res.status(200).json({ message: 'Email de redefinição enviado com sucesso' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro no servidor' });
    }
});

app.listen(5000, () => {
    console.log('Servidor rodando na porta 5000');
});
