const HUGGINGFACE_TOKEN = "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";

async function getGeneratedText(query) {
    try {
        const response = await fetch(
            'https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct',
            {
                headers: {
                    Authorization: `Bearer ${HUGGINGFACE_TOKEN}`,
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({ inputs: query }),
            }
        );
        const data = await response.json();
        return (data && data[0] && data[0].generatedText !== undefined) ? data[0].generatedText : '';
    } catch (error) {
        throw new Error('Failed to fetch data from the API.');
    }
}
