import React, { useState } from 'react';
import { HomePage } from './HomePage';

export const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Simulating a simple login check
        const validEmail = 'user@example.com';
        const validPassword = 'password123';

        if (email === validEmail && password === validPassword) {
            setIsLoggedIn(true);
            setError('');
        } else {
            setError('Invalid email or password');
        }
    };

    if (isLoggedIn) {
        return <HomePage />;
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    data-testid="email-input"
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    data-testid="password-input"
                />

                <button type="submit" data-testid="submit-button">Login</button>
            </form>

            {error && <p data-testid="error-message">{error}</p>}
        </div>
    );
};
