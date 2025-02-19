import React, { useState } from 'react';

export const RegistrationForm: React.FC = () => {
 
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');


     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

 
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!name || !email || !password) {
            setError('All fields are required.');
        } else if (!emailRegex.test(email)) {
            setError('Please enter a valid email address.');
        } else {
            setError('');
           
            alert(`Name: ${name}, Email: ${email}`);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    data-testid="name-input"
                />

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

                <button type="submit" data-testid="submit-button">Submit</button>
            </form>

            {error && <p data-testid="error-message">{error}</p>}
        </div>
    );
};
