import { useState } from 'react';
import axios from 'axios';

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();

        try {
            const response = await axios.post<{ message: string }>('http://localhost:5000/forgot-password', {
                email,
            });
            setMessage(response.data.message);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setMessage(error.response.data.message);
            } else {
                setMessage('Erro no servidor');
            }
        }
    };

    return (
        <div className="forgot-password-container">
            <h1>Esqueceu a Senha?</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Digite seu e-mail"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />
                <button type="submit">Enviar link de redefinição</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default ForgotPassword;
