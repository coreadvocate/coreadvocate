import type { NextApiRequest, NextApiResponse } from 'next';
import { callGroq } from '../../lib/groq';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'No message provided' });
  }

  try {
    const reply = await callGroq(message);
    res.status(200).json({ reply });
  } catch (error) {
    res.status(500).json({ error: 'Groq call failed' });
  }
}
