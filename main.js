document.addEventListener('DOMContentLoaded', function () {
    const generateButton = document.getElementById('generate-btn');
    const workoutOutput = document.getElementById('workout-output');
    const workoutButtons = document.querySelectorAll('.workout-type');

    generateButton.addEventListener('click', () => {
        const exercise = document.getElementById('exercise').value;
        const height = document.getElementById('height').value;
        const weight = document.getElementById('weight').value;
        const age = document.getElementById('age').value;
        const frequency = document.getElementById('frequency').value;

        let selectedWorkouts = [];
        workoutButtons.forEach(button => {
            if (button.classList.contains('selected')) {
                selectedWorkouts.push(button.getAttribute('data-type'));
                button.disabled = true;
            }
        });

        const userData = {
            exercise,
            height,
            weight,
            age,
            frequency,
            selectedWorkouts
        };

        generateWorkout(userData)
            .then(workout => {
                workoutOutput.innerHTML = `<p>Your custom workout plan:</p><p>${workout}</p>`;
            })
            .catch(error => {
                workoutOutput.innerHTML = `<p>Failed to generate workout: ${error.message}</p>`;
            });
    });

    workoutButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (!button.classList.contains('selected')) {
                button.classList.add('selected');
            } else {
                button.classList.remove('selected');
                button.disabled = false;
            }
        });
    });
});
