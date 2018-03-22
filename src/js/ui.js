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
		this.questionsReceived = [];
		this.userName;
		this.answers = [];
		this.total = 10;
		this.done = 0;
		this.left;
	}

	showQuestionBlock(userName) {
		this.userName = userName;

		this.userInfo.style.display = "none";
		this.card.style.display = "block";
		this.buttonGroup.classList.remove('d-none');
		this.buttonGroup.classList.add('d-flex');

		const welcomeMessage = document.createElement('h3');
		welcomeMessage.className = 'text-center welcome-message';
		welcomeMessage.appendChild(document.createTextNode(`Welcome to Quiz, ${userName}!`));
		// Get parent
		const parent = document.querySelector('.total');
		// Get element before
		const elBefore = document.querySelector('.total-info');
		// Insert new element
		parent.insertBefore(welcomeMessage, elBefore);

		this.showQuestion(this.questionsReceived, 0);
	}

	showAlert(message, classes) {
		this.clearAlert();
		const alertMessage = document.createElement('div');
		alertMessage.className = classes;
		alertMessage.appendChild(document.createTextNode(message));

		// Parent
		// Get parent
		const parent = document.querySelector('.total');
		// Get element before
		const elBefore = document.querySelector('.total-info');
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

	getQuestions(questions) {
		this.questionsReceived = questions;
	}

	showNextQuestion(currentQuestionIndex) {
		this.showQuestion(this.questionsReceived, currentQuestionIndex);
	}

	showQuestion(questions, currentQuestionIndex) {
		let output = '';

		// console.log(questions);
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
							<input type="radio" id="customRadioInline1" name="customRadioInline1" class="custom-control-input" value="${q.answers[0].answer}">
							<label class="custom-control-label" for="customRadioInline1">${q.answers[0].answer}</label>
						</div>
							<div class="custom-control custom-radio custom-control-inline">
								<input type="radio" id="customRadioInline2" name="customRadioInline1" class="custom-control-input" value="${q.answers[1].answer}">
								<label class="custom-control-label" for="customRadioInline2">${q.answers[1].answer}</label>
							</div>
								<div class="custom-control custom-radio custom-control-inline">
								<input type="radio" id="customRadioInline3" name="customRadioInline1" class="custom-control-input" value="${q.answers[2].answer}">
								<label class="custom-control-label" for="customRadioInline3">${q.answers[2].answer}</label>
							</div>
								<div class="custom-control custom-radio custom-control-inline">
									<input type="radio" id="customRadioInline4" name="customRadioInline1" class="custom-control-input" value="${q.answers[3].answer}">
									<label class="custom-control-label" for="customRadioInline4">${q.answers[3].answer}</label>
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
		if (this.questionsReceived.length === currentQuestionIndex + 1) {
			this.showResults();
		}
	}

	showFinish() {
		if (confirm('Are you sure you want to restart quiz?')) {
			this.newQuiz();
			// this.userInfo.style.display = "flex";
			// this.card.style.display = "none";
			// this.buttonGroup.classList.remove('d-flex'); 
			// this.buttonGroup.classList.add('d-none'); 
			// document.querySelector('.welcome-message').style.display = "none";
		} else {
			// Do nothing!
		}
	}

	newQuiz() {
		location.reload();
		// this.userInfo.style.display = "flex";
		// this.card.style.display = "none";
		// this.buttonGroup.classList.remove('d-flex');
		// this.buttonGroup.classList.add('d-none');
		// this.submitButton.classList.remove('d-none');
		// this.nextButton.classList.remove('d-none');
		// this.questionsDone.innerHTML = 0;
		// this.questionsLeft.innerHTML = 10;
		// this.restartButton.innerHTML = 'Restart';
		// // this.restartButton.style.display = 'none';
		// document.querySelector('.congratulation-message').style.display = "none";
		// document.querySelector('.welcome-message').style.display = "none";
		// // this.userInfo.style.display = "flex";
		// // this.card.style.display = "none";
		// // this.buttonGroup.classList.remove('d-flex');
		// // this.buttonGroup.classList.add('d-none');
		// // this.questionsDone.innerHTML = 0;
		// // this.questionsLeft.innerHTML = 10;
		// // document.querySelector('.congratulation-message').style.display = "none";
	}

	showResults() {
		document.querySelector('.welcome-message').style.display = "none";

		const congratulationMessage = document.createElement('h3');
		congratulationMessage.className = 'text-center congratulation-message';
		congratulationMessage.appendChild(document.createTextNode(`Congratulations, ${this.userName}!`));
		// Get parent
		const parent = document.querySelector('.total');
		// Get element before
		const elBefore = document.querySelector('.total-info');
		// Insert new element
		parent.insertBefore(congratulationMessage, elBefore);

		this.submitButton.classList.add('d-none');
		this.nextButton.classList.add('d-none');
		this.restartButton.innerHTML = 'Try Again!';        
		this.questionsDone.innerHTML = '-';        
		this.questionsLeft.innerHTML = '-';

		this.questionsAll.innerHTML = `
			<div class="results my-5 d-flex justify-content-around">
				<h4 class="results_correct">Correct Answers:
					<span class="number-done">10</span>
				</h4>
				<h4 class="results__wrong">Wrong Answers:
					<span class="number-left">0</span>
				</h4>
			</div>
		`;
	}

	countAnswers(currentIndex, answer){
		let currentQuestion = [];
		currentQuestion.push(answer);
		this.questionsReceived.filter((q, index) => {
			if (index === currentIndex-1){
				return currentQuestion.push(q.correct);
			}
		});
		this.answers.push(currentQuestion);
		console.log(currentQuestion);
		console.log(this.answers);

		this.done = this.done + 1;
		this.left = this.total - this.done;

		console.log(this.done);
		console.log(this.left);
	}
}

export const ui = new UI();