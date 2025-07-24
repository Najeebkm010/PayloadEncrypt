export default function handler(req, res) {
    // Only allow GET requests
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Get keys from environment variables
    const publicKey = process.env.PUBLIC_KEY;
    const privateKey = process.env.PRIVATE_KEY;

    // Check if keys exist
    if (!publicKey || !privateKey) {
        return res.status(500).json({ error: 'Keys not configured' });
    }

    // Return keys
    res.status(200).json({
        publicKey,
        privateKey
    });
}