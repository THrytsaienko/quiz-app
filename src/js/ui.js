class UI {
	constructor() {
		this.questionsAll = document.querySelector('#questionsAll');
		this.submitButton = document.querySelector('#submit');
		this.nextButton = document.querySelector('#next');
		this.restartButton = document.querySelector('#restart');
		this.userInfo = document.querySelector('.user-info');
		this.questionsDone = document.querySelector('.number-done');
		this.questionsLeft = document.querySelector('.number-left');
		this.card = document.querySelector('.card');
		this.buttonGroup = document.querySelector('.btn-group');
		this.numberQuestionsTotal = document.querySelector('.number-questions');
		this.numberDone = document.querySelector('.number-done');
		this.numberLeft = document.querySelector('.number-left');
		this.numberQuestions = document.querySelector('.choose-questions');
		this.questionsTotal = document.querySelector('.total');
		this.questionsReceived = [];
		this.userName;
		this.answers = [];
		this.total;
		this.done = 0;
		this.left = 0;
	}

	showQuestionBlock(userName, numberQuestions) {
		this.total = numberQuestions;
		this.userName = userName;

		this.userInfo.style.display = "none";
		this.card.style.display = "block";
		this.buttonGroup.classList.remove('d-none');
		this.buttonGroup.classList.add('d-flex');
		this.numberQuestions.classList.add('d-none');
		this.numberQuestions.classList.remove('d-flex');
		this.questionsTotal.classList.remove('d-none');

		const welcomeMessage = document.createElement('h3');
		welcomeMessage.className = 'text-center welcome-message';
		welcomeMessage.appendChild(document.createTextNode(`Welcome to Quiz, ${userName}!`));
		// Get parent
		// const parent = document.querySelector('.total');
		// questionsTotal
		// Get element before
		const elBefore = document.querySelector('.total-info');
		// Insert new element
		this.questionsTotal.insertBefore(welcomeMessage, elBefore);

		this.numberQuestionsTotal.innerHTML = this.total;
		this.numberLeft.innerHTML = this.total;
	}

	showAlert(message, classes) {
		this.clearAlert();
		const alertMessage = document.createElement('div');
		alertMessage.className = classes;
		alertMessage.appendChild(document.createTextNode(message));

		// Get parent
		const parent = document.querySelector('.choose-questions');
		// Get element before
		const elBefore = document.querySelector('.numbers');
		// Insert new element
		parent.insertBefore(alertMessage, elBefore);

		setTimeout(() => {
			this.clearAlert();
		}, 3000);
	}

	clearAlert() {
		const currentAlert = document.querySelector('.alert');

		if (currentAlert) {
			currentAlert.remove();
		}
	}

	showNextQuestion(currentQuestionIndex) {
		this.showQuestion(this.questionsReceived, currentQuestionIndex);
	}

	showQuestion(questions, currentQuestionIndex) {
		this.questionsReceived = questions;
		let output = '';

		questions.filter((q, index) => {
			if (index === currentQuestionIndex) {
				const num = index + 1;
				return output = `
				<div class="card-header">
					<h5>Question
					<span class="current-question">${num}</span>
					</h5>
				</div>
				<div class="card-body">
					<h5 class="card-title question">${q.question}</h5>
					<div class="answers my-4">
						<div class="custom-control custom-radio custom-control-inline">
							<input type="radio" id="radioAnswer1" name="radioAnswer" class="custom-control-input answer" value="${q.answers[0]}" checked>
							<label class="custom-control-label" for="radioAnswer1">${q.answers[0]}</label>
						</div>
							<div class="custom-control custom-radio custom-control-inline">
								<input type="radio" id="radioAnswer2" name="radioAnswer" class="custom-control-input answer" value="${q.answers[1]}">
								<label class="custom-control-label" for="radioAnswer2">${q.answers[1]}</label>
							</div>
								<div class="custom-control custom-radio custom-control-inline">
								<input type="radio" id="radioAnswer3" name="radioAnswer" class="custom-control-input answer" value="${q.answers[2]}">
								<label class="custom-control-label" for="radioAnswer3">${q.answers[2]}</label>
							</div>
								<div class="custom-control custom-radio custom-control-inline">
									<input type="radio" id="radioAnswer4" name="radioAnswer" class="custom-control-input answer" value="${q.answers[3]}">
									<label class="custom-control-label" for="radioAnswer4">${q.answers[3]}</label>
							</div>
					</div>
				</div>
			`;
			}
		});

		this.questionsAll.innerHTML = output;
		this.nextButton.classList.add('disabled');
	}

	submitAnswer(currentQuestionIndex) {
		this.nextButton.classList.remove('disabled');
		if (this.questionsReceived.length === Number(this.total)) {
			this.nextButton.innerHTML = 'Finish';
		}
	}

	showFinish() {
		if (confirm('Are you sure you want to restart quiz?')) {
			this.newQuiz();
		} else {
			// Do nothing!
		}
	}

	newQuiz() {
		location.reload();
	}

	showResults() {
		document.querySelector('.welcome-message').style.display = "none";

		const congratulationMessage = document.createElement('h3');
		congratulationMessage.className = 'text-center congratulation-message';
		congratulationMessage.appendChild(document.createTextNode(`Congratulations, ${this.userName}!`));
		// Get parent
		// const parent = document.querySelector('.total');
		// this.questionsTotal
		// Get element before
		const elBefore = document.querySelector('.total-info');
		// Insert new element
		this.questionsTotal.insertBefore(congratulationMessage, elBefore);

		this.submitButton.classList.add('d-none');
		this.nextButton.classList.add('d-none');
		this.restartButton.innerHTML = 'Try Again!';        
		this.questionsDone.innerHTML = this.done;        
		this.questionsLeft.innerHTML = this.total - this.done;

		let numberCorrect = 0;
		let numberWrong = 0;
		this.answers.forEach((answer) => {
			if (answer[0] === answer[1]) {
				numberCorrect++;
			} else {
				numberWrong++;
			}
		});

		this.questionsAll.innerHTML = `
			<div class="results my-5 d-flex justify-content-around">
				<h4 class="results_correct">Correct Answers:
					<span class="number-correct">${numberCorrect}</span>
				</h4>
				<h4 class="results__wrong">Wrong Answers:
					<span class="number-wrong">${numberWrong}</span>
				</h4>
			</div>
		`;
	}

	countAnswers(currentIndex, answer) {
		let currentQuestion = [];
		currentQuestion.push(answer);
		this.questionsReceived.filter((q, index) => {
			if (index === currentIndex - 1) {
				return currentQuestion.push(q.correct);
			}
		});
		this.answers.push(currentQuestion);

		this.done = this.done + 1;
		this.left = this.total - this.done;

		this.numberDone.innerHTML = this.done;
		this.numberLeft.innerHTML = this.left;
	}
}

export const ui = new UI();