let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';
// Questions 
let questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "London", "Paris"],
       answer: "Paris",
        category: "GK"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Venus", "Earth", "Jupiter"],
       answer: "Mars",
        category: "GK"
    },
    {
        question: "What is the square of 9?",
        options: ["81", "64", "49", "36"],
       answer: "81",
        category: "Math"
    },
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        options: ["William Shakespeare", "Jane Austen", "Charles Dickens", "Leo Tolstoy"],
       answer: "William Shakespeare",
        category: "GK"
    },
    {
        question: "What is the formula for the area of a circle?",
        options: ["2πr", "πr^2", "2πr^2", "πr"],
       answer: "πr^2",
        category: "Math"
    },
    {
        question: "What is the formula for calculating the area of a rectangle?",
        options: ["length × width", "2 × (length + width)", "πr^2", "length × length"],
       answer: "length × width",
        category: "Math"
      },
      {
        question: "Who is known as the 'Father of Modern Physics'?",
        options: ["Isaac Newton", "Galileo Galilei", "Albert Einstein", "Stephen Hawking"],
       answer: "Albert Einstein",
        category: "Science"
      },
      {
        question: "Which country is known as the 'Land of the Rising Sun'?",
        options: ["China", "Japan", "South Korea", "Vietnam"],
       answer: "Japan",
        category: "Geography"
      },
      {
        question: "What is the chemical symbol for gold?",
        options: ["Go", "Au", "Gd", "Ag"],
       answer: "Au",
        category: "Science"
      },

      {
        question: "What is the tallest mountain in the world?",
        options: ["Mount Kilimanjaro", "Mount Everest", "Mount McKinley", "Mount Fuji"],
        answer: "Mount Everest",
        category: "Geography"
      }
];
                           



let res_choose = new Array();
let res_correct = new Array(questions.length);


let Question_Rules = `
1. You will have only 15 seconds per  question.
2. Once you select your answer, it can't be undone.
3. You can't select any option once time goes off.
4. You'll get points on the basis of your correct answers.
      
      `;
function repeat() {

    let text;
    if (Question_Rules === "") {
        text = "Please speak";
    } else {
        text = Question_Rules;
    }


    msg = new SpeechSynthesisUtterance(text);


    msg.lang = "en-IN";

    const voices = speechSynthesis.getVoices().filter(voice => voice.lang === "en-IN");
    msg.voice = voices[0];
    msg.volume = 1;
    msg.rate = 0.9;
    msg.pitch = 1;
    window.speechSynthesis.cancel(msg);
    window.speechSynthesis.speak(msg);

    window.addEventListener("beforeunload", () => {
        window.speechSynthesis.cancel(msg);
    });

}






for (let i = 0; i < questions.length; i++) {
    res_correct[i] = questions[i].answer;
}
//selecting all required elements
const starter = document.querySelector(".start_btn");
const start_btn = document.querySelector(".start_btn button");

const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector(".header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");
restart_quiz.style.display = "none";
quit_quiz.style.display = "none";

continue_btn.addEventListener("click", () => {
    window.speechSynthesis.cancel();
});
exit_btn.addEventListener("click", () => {
    window.speechSynthesis.cancel();
});

// if startQuiz button clicked
start_btn.onclick = () => {
    info_box.classList.add("activeInfo");
    info_box.style.display = "block"
    starter.style.display = "none"
    quiz_box.style.display = "none"
    //show info box

}

// if exitQuiz button clicked
exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); //hide info box
    info_box.style.display = "none"
    starter.style.display = "block"
    quiz_box.style.display = "none"
}
let start_time;
// if continueQuiz button clicked
continue_btn.onclick = () => {
    info_box.style.display = "none"
    quiz_box.style.display = "block"
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz"); //show quiz box
    start_time = new Date().getTime();
    showQuetions(0); //calling showQestions function
    queCounter(1); //passing 1 parameter to queCounter
    startTimer(15); //calling startTimer function
    startTimerLine(0); //calling startTimerLine function
}
// counters
let timeValue = 15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter = 0;
let counterLine;
let widthValue = 0;


// if restartQuiz button clicked
restart_quiz.onclick = () => {
    quiz_box.classList.add("activeQuiz"); //show quiz box
    result_box.classList.remove("activeResult"); //hide result box
    timeValue = 15;
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); //calling showQestions function
    queCounter(que_numb); //passing que_numb value to queCounter
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    startTimer(timeValue); //calling startTimer function
    startTimerLine(widthValue); //calling startTimerLine function
    timeText.textContent = "Time Left"; //change the text of timeText to Time Left
    next_btn.classList.remove("show"); //hide the next button
}

// if quitQuiz button clicked
quit_quiz.onclick = () => {


    window.location.reload(); //reload the current window
}
var st = new Date();
var end = new Date();
const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// if Next Que button clicked
next_btn.onclick = () => {
    if (que_count < questions.length - 1) { //if question count is less than total question length
        que_count++; //increment the que_count value
        que_numb++; //increment the que_numb value
        st = new Date()
        showQuetions(que_count); //calling showQestions function
        queCounter(que_numb); //passing que_numb value to queCounter
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        startTimer(timeValue); //calling startTimer function
        startTimerLine(widthValue); //calling startTimerLine function
        timeText.textContent = "Time Left"; //change the timeText to Time Left
        next_btn.classList.remove("show"); //hide the next button
    } else {
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        showResult(); //calling showResult function
    }
}

// getting questions and options from array
function showQuetions(index) {

    const que_text = document.querySelector(".que_text");
    const img = document.querySelector("#main-img");
    //creating a new span and div tag for question and option and passing the value using array index
    let que_tag = questions[que_count].question;

    let option_tag = '<div class="option"><span>' + questions[index].options[0] + '</span></div>'
        + '<div class="option"><span>' + questions[index].options[1] + '</span></div>'
        + '<div class="option"><span>' + questions[index].options[2] + '</span></div>'
        + '<div class="option"><span>' + questions[index].options[3] + '</span></div>';
    que_text.innerHTML = que_tag; //adding new span tag inside que_tag
    option_list.innerHTML = option_tag; //adding new div tag inside option_tag

    const option = option_list.querySelectorAll(".option");

    // set onclick attribute to all available options
    for (i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }

}

//if user clicked on option
function optionSelected(answer) {



    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    let userAns = answer.textContent; //getting user selected option
    res_choose.push(userAns)
  

    let correcAns = questions[que_count].answer; //getting correct answer from array
    const allOptions = option_list.children.length; //getting all option items

    if (userAns == correcAns) { //if user selected option is equal to array's correct answer
        userScore += 1; //upgrading score value with 1
        answer.classList.add("correct"); //adding green color to correct selected option
        answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option

    } else {
        answer.classList.add("incorrect"); //adding red color to correct selected option
        answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option


        for (i = 0; i < allOptions; i++) {
            if (option_list.children[i].textContent == correcAns) { //if there is an option which is matched to an array answer 
                option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option

            }
        }
    }
    for (i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    next_btn.classList.add("show"); //show the next button if user selected any option
}

function showResult() {

    quit_quiz.style.display = "block";
    restart_quiz.style.display="block"
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    result_box.classList.add("activeResult"); //show result box
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 5) { // if user scored more than 3
        //creating a new span tag and passing the user score number and total question number
        let scoreTag = '<span>and congrats! 🎉, You got <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
    }
    else if (userScore > 1) { // if user scored more than 1
        let scoreTag = '<span>and nice 😎, You got <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else { // if user scored less than 1
        let scoreTag = '<span>and sorry 😐, You got only <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time; //changing the value of timeCount with time value
        time--; //decrement the time value
        if (time < 9) { //if timer is less than 9
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero; //add a 0 before time value
        }
        if (time < 0) { //if timer is less than 0
            clearInterval(counter); //clear counter
            timeText.textContent = "Time Off"; //change the time text to time off
            const allOptions = option_list.children.length; //getting all option items
            let correcAns = questions[que_count].answer; //getting correct answer from array
            for (i = 0; i < allOptions; i++) {
                if (option_list.children[i].textContent == correcAns) { //if there is an option which is matched to an array answer
                    option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option

                }
            }
            for (i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
            }
            next_btn.classList.add("show"); //show the next button if user selected any option
        }
    }
}
// setting timer 
var length = (quiz_box.clientWidth);
var speed = (683 * 23) / (length);


function startTimerLine(time) {
    counterLine = setInterval(timer, speed);
    function timer() {
        time += 1; //upgrading time value with 1
        time_line.style.width = time + "px"; //increasing width of time_line with px by time value
        if (time > length) {
            clearInterval(counterLine); //clear counterLine
        }
    }
}

// Question counter
function queCounter(index) {

    let totalQueCounTag = '<span><p>' + index + '</p> of <p>' + questions.length + '</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;
}