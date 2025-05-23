import React, { useState } from 'react';

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [useDirectLyrics, setUseDirectLyrics] = useState(true);
  const [tone, setTone] = useState('cryptic');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { sender: 'user', text: input }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('https://congenial-octo-system-g86a.onrender.com/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: input,
          direct_lyrics: useDirectLyrics,
          tone: tone
          });
      const data = await response.json();
      setMessages(prev => [...prev, { sender: 'bot', text: data.reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { sender: 'bot', text: "Sorry, something went wrong." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={{
      padding: '2rem',
      fontFamily: 'sans-serif',
      background: '#0d0d0d',
      color: '#fff',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: '#39ff14', fontFamily: 'monospace' }}>21 Copilots</h1>
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
          <div key={i} style={{ marginBottom: '0.5rem' }}>
            <strong style={{ color: msg.sender === 'user' ? '#39ff14' : '#1e90ff' }}>
              {msg.sender === 'user' ? 'You' : '21 Copilot'}:
            </strong>
            <div style={{
              display: 'inline-block',
              marginLeft: '0.5rem',
              padding: '0.5rem',
              borderRadius: '10px',
              background: msg.sender === 'user' ? '#263238' : '#1a1a1a',
              color: '#fff'
            }}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div style={{ color: '#888', fontStyle: 'italic' }}>21 Copilot is thinking...</div>
        )}
      </div>
      <div>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Say something..."
          rows={2}
          style={{
            width: '70%',
            padding: '0.5rem',
            borderRadius: '5px',
            marginRight: '0.5rem',
            resize: 'none',
            background: '#1c1c1c',
            color: '#fff',
            border: '1px solid #444'
          }}
        />
        <button
          onClick={handleSend}
          style={{
            padding: '0.5rem 1rem',
            background: '#39ff14',
            color: '#000',
            border: 'none',
            borderRadius: '5px',
            fontWeight: 'bold'
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
