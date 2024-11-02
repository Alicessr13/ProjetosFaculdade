const bcrypt = require('bcryptjs');
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'CoinControl',
    password: '1234',
    port: 5432,
});

const addUser = async (email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10); // Criptografa a senha

    try {
        const result = await pool.query(
            'INSERT INTO usuarios (email, senha) VALUES ($1, $2)',
            [email, hashedPassword]
        );
        console.log('Usuário adicionado:', result);
    } catch (error) {
        console.error('Erro ao adicionar usuário:', error);
    } finally {
        pool.end(); // Fecha a conexão com o banco de dados
    }
};

// Chame a função com o email e a senha desejados
addUser('alicinhassribeiro@gmail.com', '1234');