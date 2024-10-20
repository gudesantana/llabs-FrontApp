import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3000/atualizar-previsao')
            .then(response => {
                setMessage(response.data);
            })
            .catch(error => {
                setMessage(`Erro: ${error.message}`);
            });
    }, []);

    return (
        <div className="App">
            <h1>Atualização de Previsão do Tempo</h1>
            <p>{message}</p>
        </div>
    );
}

export default App;
