import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [message, setMessage] = useState('');
    const [dados, setDados] = useState([]);

    useEffect(() => {
        axios.get('http://appback.good.tec.br:3000/atualizar-previsao')
            .then(response => {
                setMessage('Dados salvos com sucesso!');
                setDados(response.data);
            })
            .catch(error => {
                setMessage(`Erro: ${error.message}`);
            });
    }, []);

    return (
        <div className="App">
            <h1>Atualização de Previsão do Tempo</h1>
            <p>{message}</p>
            {dados.length > 0 && (
                <div>
                    <h2>Dados Gravados:</h2>
                    <ul>
                        {dados.map((dado, index) => (
                            <li key={index}>
                                País: {dado.country}, Data: {dado.date}, Descrição: {dado.text}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default App;
