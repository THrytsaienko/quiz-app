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
		question: "Who was first to sail sound the strait, reached the Philippines and named the Pacific Ocean?",
		answers: ["Ferdinand Magelion", "Jacques Carter", "William Janszoom", "Vasco da Gama"],
		correct: "Ferdinand Magelion"
	}
]


// Add event listeners
// document.addEventListener('DOMContentLoaded', getQuestions);

document.querySelector('.user-submit').addEventListener('click', submitUser);
document.querySelector('#submit').addEventListener('click', submitAnswer);
document.querySelector('#next').addEventListener('click', submitNext);
document.querySelector('#restart').addEventListener('click', restartQuiz);


let currentQuestionIndex = 0;
let questionCount;
let questionsCurrentQuiz = [];
let numberQuestions;
let userName;
let randomQuestion;

function getQuestion(questionCount) {
	randomQuestion = getRandomQuestion();

	if (questionsCurrentQuiz.length === 0) {
		allQuestions.filter((q, index) => {
			if (index === randomQuestion) {
				ui.showQuestionBlock(userName, numberQuestions);
				q.currentIndex = index;
				questionsCurrentQuiz.push(q);
			}
			ui.showQuestion(questionsCurrentQuiz, 0);
		});
	} else if (questionsCurrentQuiz.length > 0) {
		let errorArray = questionsCurrentQuiz.filter((item) => {
			if (item.currentIndex === randomQuestion) {
				return 1;
			}
		});
		if (errorArray.length === 0) {
			allQuestions.filter((q, index) => {
				if (index === randomQuestion) {
					q.currentIndex = index;
					// console.log(q);
					questionsCurrentQuiz.push(q);
				}
				ui.showQuestion(questionsCurrentQuiz, questionCount);
			});
		} else {
			getQuestion(questionCount);
		}
	};
};

function submitUser(e) {
	let radioNumbers = document.querySelector('.numbers');
	numberQuestions = radioNumbers.querySelector('input[type=radio]:checked').value;
	userName = document.querySelector('.user-name').value;

	if (userName.trim() === '') {
		ui.showAlert('Please add your name!', 'alert alert-danger');
	} else {
		getQuestion(0);
		e.preventDefault();
	}
};

function getRandomQuestion() {
	return Math.floor(Math.random() * 15);
}

function submitAnswer(e) {
	ui.submitAnswer(questionCount);
	e.preventDefault();
}

function submitNext(e) {
	let radioAnswer = document.querySelector('.answers');
	let answer = radioAnswer.querySelector('input[type=radio]:checked').value;

	const nextText = document.querySelector('#next').innerHTML;

	currentQuestionIndex = currentQuestionIndex + 1;
	questionCount = currentQuestionIndex;
	if (questionCount === Number(numberQuestions)) {
		ui.countAnswers(questionCount, answer);
		ui.showResults();
	} else {
		ui.countAnswers(questionCount, answer);
		getQuestion(questionCount);
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