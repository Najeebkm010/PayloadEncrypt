// Vercel serverless function to serve encryption keys
export default function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'GET') {
        const publicKey = process.env.PUBLIC_KEY;
        const privateKey = process.env.PRIVATE_KEY;

        if (!publicKey || !privateKey) {
            return res.status(500).json({ error: 'Encryption keys not configured' });
        }

        res.status(200).json({
            publicKey: publicKey,
            privateKey: privateKey
        });
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}