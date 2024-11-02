import { FaUser, FaLock } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import axios from 'axios';
import "./Login.css";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {

    const [userName, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const navigate = useNavigate();

    // Recuperar credenciais do localStorage ao montar o componente
    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        const storedPassword = localStorage.getItem('password');

        if (storedUsername) {
            setUsername(storedUsername);
        }

        if (storedPassword) {
            setPassword(storedPassword);
        }
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        try {
            const response = await axios.post<{ message: string }>('http://localhost:5000/login', {
                userName,
                password,
            });

            // Mensagem de sucesso
            setMessage(response.data.message);
            navigate('/home');
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                // Mensagem de erro vinda do servidor
                setMessage(error.response.data.message);
            } else {
                setMessage('Erro no servidor');
            }
        }
        console.log("Envio");
    };

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <h1>Acesse o Sistema</h1>
                <div>
                    <input type="email" placeholder="E-mail"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <FaUser className='icon'></FaUser>
                </div>
                <div>
                    <input type='password' placeholder='Senha'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <FaLock className='icon'></FaLock>
                </div>

                <div className="recall-forget">
                    <Link to="/forgot-password">Esqueceu a senha?</Link>
                </div>

                <button type='submit'>Entrar</button>

                {message && <p>{message}</p>} {/* Exibe mensagem de erro ou sucesso */}

                <div className="signup-link">
                    <p>
                        Não tem uma conta?
                        <Link to="/register"> Cadastre-se aqui</Link>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default Login
