import React, { useState } from 'react';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault();

        const response = await fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            // Cadastro bem-sucedido
            alert('Usuário cadastrado com sucesso!');
        } else {
            // Trate o erro
            alert('Erro ao cadastrar usuário.');
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <div>
                <label>E-mail:</label>
                <input
                    type="email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Cadastrar</button>
        </form>
    );
};

export default Register;
