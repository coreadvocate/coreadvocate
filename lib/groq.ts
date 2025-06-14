export async function callGroq(prompt: string) {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: process.env.GROQ_MODEL || 'llama3-8b-8192',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2
    }),
  });

  const data = await res.json();
  return data?.choices?.[0]?.message?.content || 'No response.';
}
