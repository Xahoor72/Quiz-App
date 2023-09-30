# Quiz App README

This is a simple interactive quiz web application created using HTML, CSS, and JavaScript.

## Getting Started

To run the quiz app, follow these instructions:

1. Clone the repository to your local machine using Git:
2. Navigate to the project directory:
3. Open the `index.html` file in a web browser to launch the quiz app.

## Features

### Quiz Questions

The quiz app includes a set of multiple-choice questions from various categories, including General Knowledge (GK), Mathematics, Literature, and more.

### Interactive Interface

- When you open the app, the first question is displayed along with answer options.
- Select an answer by clicking on one of the options.
- The app provides instant feedback on whether your answer is correct or incorrect.
- You can navigate through the questions using "Next" and "Previous" buttons.
- Your current score is displayed as you progress through the quiz.

### Timer (Bonus Feature)

- Each question has a timer that limits the time for answering. You have 30 seconds per question.
- If you don't answer within the time limit, the app automatically moves to the next question.

### Restart Option (Bonus Feature)

- After completing the quiz or at any time, you can restart the quiz using the "Restart" button.
- This allows you to retake the quiz from the beginning.

### Responsive Design

- The quiz app is designed to be responsive and adapt to various screen sizes, including mobile devices.

## Customize Questions

You can customize the quiz questions by modifying the `quizQuestions` array in the JavaScript code. Each question includes a `question`, `options`, `correctAnswer`, and `category`.

```javascript
const quizQuestions = [
{
 question: "What is the capital of France?",
 options: ["Berlin", "Madrid", "London", "Paris"],
 correctAnswer: "Paris",
 category: "GK"
},
// Add more questions here...
];
## Author
Zahoor
