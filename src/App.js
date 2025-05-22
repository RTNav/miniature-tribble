import React, { useState } from 'react';

export default function App() {
  console.log("App loaded");

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [useDirectLyrics, setUseDirectLyrics] = useState(true);
  const [tone, setTone] = useState('cryptic');

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { sender: 'user', text: input }]);
    setInput('');

    const response = await fetch('https://congenial-octo-system-g86a.onrender.com/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: input, direct_lyrics: useDirectLyrics, tone })
    });

    const data = await response.json();
    setMessages(prev => [...prev, { sender: 'bot', text: data.reply }]);
  };

  console.log("Messages:", messages);
  
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', background: '#000', color: '#fff', minHeight: '100vh' }}>
      <h1 style={{ color: '#FFD700' }}>21 Copilots</h1>
      <div style={{ marginBottom: '1rem' }}>
        <label>
          Mode:&nbsp;
          <select value={tone} onChange={e => setTone(e.target.value)}>
            <option value="cryptic">Cryptic</option>
            <option value="hopeful">Hopeful</option>
            <option value="dark">Dark</option>
            <option value="chaotic">Chaotic</option>
            <option value="philosophical">Philosophical</option>
          </select>
        </label>
        <label style={{ marginLeft: '1rem' }}>
          <input type="checkbox" checked={useDirectLyrics} onChange={e => setUseDirectLyrics(e.target.checked)} />
          &nbsp;Use Direct Lyrics
        </label>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left', marginBottom: '0.5rem' }}>
            <div style={{ display: 'inline-block', padding: '0.5rem', borderRadius: '10px', background: msg.sender === 'user' ? '#FFD700' : '#333' }}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Say something..."
          style={{ width: '70%', padding: '0.5rem', borderRadius: '5px', marginRight: '0.5rem' }}
        />
        <button onClick={handleSend} style={{ padding: '0.5rem 1rem', background: '#FFD700', border: 'none', borderRadius: '5px' }}>Send</button>
      </div>
    </div>
  );
}
