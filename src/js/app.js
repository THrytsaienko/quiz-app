import {
	ui
} from './ui';

const allQuestions = [{
		question: "How many languages and dialects are spoken by people all over the world?",
		answers: ["6,000", "9,000", "4,000", "1,000"],
		correct: "9,000"
	},
	{
		question: "The language with the richest vocabulary is:",
		answers: ["Hindi", "French", "English", "German"],
		correct: "English"
	},
	{
		question: "Which book has been printed in the maximum number of languages and these scripts?",
		answers: ["The Bible", "Hiraka Sutra", "The Super Book", "None of these"],
		correct: "The Bible"
	},
	{
		question: "Euclid was:",
		answers: ["Greek mathematician", "Contributor to the use of deductive principles of logic as the basis of geometry", "Propounded the geometrical theosems", "All the statements are correct"],
		correct: "All the statements are correct"
	},
	{
		question: "Who is known as the father of English poetry?",
		answers: ["Geoffrey Chaucer", "John Milton", "John Keats", "None of these"],
		correct: "Geoffrey Chaucer"
	},
	{
		question: "The American General who led the revolt against the British & declared American independence was:",
		answers: ["George Washington", "Bill Clinton", "George Bush", "None of these"],
		correct: "George Washington"
	},
	{
		question: "Marco Polo",
		answers: ["Discovered Greenland", "Traveled three China, India and other parts of Asia", "Traveled round the cape of Good Hope", "Discovered Canada"],
		correct: "Traveled three China, India and other parts of Asia"
	},
	{
		question: "Badminton is the national sport at:",
		answers: ["Malaysia", "Scotland", "China", "Former soviet Union"],
		correct: "Malaysia"
	},
	{
		question: "For which of the following disciplines in Nobel Prize awarded?",
		answers: ["Physics and chemistry", "Physiology or Medicine", "Literature, Peace and Economics", "All the above"],
		correct: "All the above"
	},
	{
		question: "The oldest printed work in the world, which dates back to AD 868 is:",
		answers: ["The Bible", "The Hirake Sutra", "The Ramayana", "The Mahabharata"],
		correct: "The Hirake Sutra"
	},
	{
		question: "How many people speak Chinese language?",
		answers: ["1 billion", "1 million", "1 lakh", "1 thousand"],
		correct: "1 billion"
	},
	{
		question: "The largest book, the super book, is ?? and weight is ??",
		answers: ["270 cm, 300 cm, 252 kg", "100 cm, 110 cm, 100 kg", "200 cm, 100 cm, 60 kg", "None of these"],
		correct: "270 cm, 300 cm, 252 kg"
	},
	{
		question: "The author of the book 'Time machine' is:",
		answers: ["Lewis Carroll", "Robert Louis Stevenson", "Charles Lamb", "H.G. Wells"],
		"correct": "H.G. Wells"
	},
	{
		question: "Galileo was an I talian astronomer who:",
		answers: ["Developed the telescope", "Discovered 4 satellites of Jupiter", "Discovered that the movement o f the pendulum produces a regular time measurement", "All are correct"],
		correct: "All are correct"
	},
	{
		question: "Who landed on the mainland of South America for the First time?",
		answers: ["Discovered Greenland", "Landed on the mainland of south America", "Discovered the sea route from Europe to India", "None of these"],
		correct: "Landed on the mainland of south America"
	}
]


// Add event listeners
// document.addEventListener('DOMContentLoaded', getQuestions);

document.querySelector('.user-submit').addEventListener('click', submitUser);
document.querySelector('#submit').addEventListener('click', submitAnswer);
document.querySelector('#next').addEventListener('click', submitNext);
document.querySelector('#restart').addEventListener('click', restartQuiz);


let currentQuestionIndex = 1;
let globalIndex;
let questionsCurrentQuiz = [];
let userName;
let numberQuestions;

function getQuestion(randomNumber) {
	questionsCurrentQuiz = allQuestions.filter((q, index) => {
		if (questionsCurrentQuiz.length === 0){
			if (index === randomNumber){
				q.currentIndex = index;
				return q;
			}
		} else {
			if (questionsCurrentQuiz.indexOf(randomNumber) === -1){
				if (index === randomNumber) {
					q.currentIndex = index;
					return q;
				}
			} else {
				getRandomNumber();
			}
		}
	});

	ui.getQuestions(questionsCurrentQuiz, userName, numberQuestions);

	console.log(questionsCurrentQuiz);

	// http.get('http://localhost:3000/questions?_limit=' + numberQuestions)
	// 	.then(data => ui.getQuestions(data, userName, numberQuestions))
	// 	.catch(err => console.log(err));
};

function submitUser(e) {
	let radioNumbers = document.querySelector('.numbers');
	numberQuestions = radioNumbers.querySelector('input[type=radio]:checked').value;
	userName = document.querySelector('.user-name').value;

	if (userName.trim() === '') {
		ui.showAlert('Please add your name!', 'alert alert-danger');
	} else {
		// getQuestions(numberQuestions, userName);
		getRandomNumber();
		e.preventDefault();
	}
};

function getRandomNumber() {
	let randomNumber = Math.floor(Math.random() * 15);
	getQuestion(randomNumber);
	console.log(randomNumber);
}

function submitAnswer(e) {
	ui.submitAnswer(globalIndex);
	e.preventDefault();
}

function submitNext(e) {
	let radioAnswer = document.querySelector('.answers');
	let answer = radioAnswer.querySelector('input[type=radio]:checked').value;

	const nextText = document.querySelector('#next').innerHTML;
	if (nextText === 'Finish') {
		globalIndex = currentQuestionIndex++;
		ui.countAnswers(globalIndex, answer);
		ui.showResults();
	} else {
		globalIndex = currentQuestionIndex;
		console.log(globalIndex);
		ui.showNextQuestion(globalIndex);
		ui.countAnswers(globalIndex, answer);
		globalIndex = currentQuestionIndex++;
	}

	e.preventDefault();
}

function restartQuiz(e) {
	const restartText = document.querySelector('#restart').innerHTML;
	if (restartText === 'Restart') {
		ui.showFinish();
	} else {
		ui.newQuiz();
	}

	e.preventDefault();
}