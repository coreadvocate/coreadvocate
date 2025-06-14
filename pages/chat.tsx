import { useState } from 'react';

export default function ChatPage() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResponse('');

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    setResponse(data.reply);
    setLoading(false);
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">CoreAdvocate™ Chat</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full p-3 border rounded"
          rows={4}
          placeholder="Ask me something..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Thinking...' : 'Ask CoreAdvocate'}
        </button>
      </form>

      {response && (
        <div className="mt-6 p-4 bg-gray-100 border rounded">
          <h2 className="font-semibold mb-2">Response:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}
