const HUGGINGFACE_TOKEN = "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";

async function generateWorkout(userData) {
    try {
        const generatedText = await fetchWorkout(userData);
        return generatedText;
    } catch (error) {
        throw new Error(error.message);
    }
}

function fetchWorkout(userData) {
    const query = {
        inputs: {
            exercise: userData.exercise,
            height: userData.height,
            weight: userData.weight,
            age: userData.age,
            frequency: userData.frequency,
            workoutType: userData.workoutType
        }
    };

    return fetch(
        "https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct",
        {
            headers: {
                Authorization: `Bearer ${HUGGINGFACE_TOKEN}`,
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(query),
        }
    )
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok.");
            }
            return response.json();
        })
        .then(data => {
            const generatedText = data[0].generated_text || data.generated_text;
            return generatedText;
        })
        .catch(error => {
            throw new Error(error.message);
        });
}
