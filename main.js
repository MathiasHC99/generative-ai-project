const button = document.querySelector('#generateBtn');
const ageInput = document.querySelector('#age');
const heightInput = document.querySelector('#height');
const weightInput = document.querySelector('#weight');
const workoutCheckboxes = document.querySelectorAll('input[name="workoutType"]');
const routineDisplay = document.querySelector('.routine');

let isFormComplete = false;

button.addEventListener('click', async (event) => {
    event.preventDefault();

    if (!isFormComplete) {
        if (!validateForm()) {
            routineDisplay.textContent = 'Please fill in all fields.';
            return;
        } else {
            isFormComplete = true;
        }
    }

    routineDisplay.textContent = 'Generating workout routine';
    let dots = 0;

    const interval = setInterval(() => {
        dots = (dots + 1) % 4;
        routineDisplay.textContent = `Generating workout routine${'.'.repeat(Math.min(dots, 3))}`;
    }, 500);

    const selectedWorkouts = [...workoutCheckboxes]
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);
    const workoutText = selectedWorkouts.join(', ');

    try {
        const generatedText = await getGeneratedText(
            `Here's a workout routine for a person who is ${ageInput.value} years old, ${heightInput.value} cm tall, ${weightInput.value} kg heavy, and prefers ${workoutText} exercises.`
        );
        clearInterval(interval);
        routineDisplay.textContent = `${generatedText}${generatedText ? '...' : ''}`;
    } catch (error) {
        console.error('Error:', error);
        clearInterval(interval);
        routineDisplay.textContent = 'Failed to generate workout routine.';
    }
});

function validateForm() {
    return ageInput.value && heightInput.value && weightInput.value && [...workoutCheckboxes].some(checkbox => checkbox.checked);
}
