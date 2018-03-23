import {
	http
} from './http';
import {
	ui
} from './ui';


// Add event listeners
document.addEventListener('DOMContentLoaded', getQuestions);

document.querySelector('.user-submit').addEventListener('click', submitUser);
document.querySelector('#submit').addEventListener('click', submitAnswer);
document.querySelector('#next').addEventListener('click', submitNext);
document.querySelector('#restart').addEventListener('click', restartQuiz);

let currentQuestionIndex = 1;
let globalIndex;

function getQuestions() {
	http.get('http://localhost:3000/questions')
		.then(data => ui.getQuestions(data))
		.catch(err => console.log(err));
};

function submitUser(e) {
	const userName = document.querySelector('.user-name').value;
	if (userName.trim() === '') {
		ui.showAlert('Please add your name!', 'alert alert-danger');
	} else {
		document.querySelector('.user-name').value = '';
		ui.showQuestionBlock(userName);
		e.preventDefault();
	}
};

function submitAnswer(e) {
	ui.submitAnswer(globalIndex);
	e.preventDefault();
}

function submitNext(e) {
	var answer = document.querySelector('input[type=radio]:checked').value;

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