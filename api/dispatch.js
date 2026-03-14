export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');
    
    const { stream_key, video_id } = req.body;
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Vercel থেকে নিবে

    try {
        const response = await fetch(`https://api.github.com/repos/AutoStreamingBD/AutoLiveYT/dispatches`, {
            method: 'POST',
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                event_type: "start-live",
                client_payload: { stream_key, video_id }
            })
        });

        if (response.ok || response.status === 204) {
            res.status(200).json({ success: true });
        } else {
            res.status(500).json({ error: 'GitHub Dispatch Failed' });
        }
    } catch (e) {
        res.status(500).json({ error: 'Server Error' });
    }
}
