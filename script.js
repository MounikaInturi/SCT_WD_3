const questions = [
  {
    type: 'single',
    question: 'What is the powerhouse of the cell?',
    options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Chloroplast'],
    answer: 'Mitochondria'
  },
  {
    type: 'multi',
    question: 'Which of these are parts of a plant cell but NOT an animal cell?',
    options: ['Cell Wall', 'Chloroplast', 'Nucleus', 'Large Central Vacuole'],
    answer: ['Cell Wall', 'Chloroplast', 'Large Central Vacuole']
  },
  {
    type: 'fill',
    question: 'The process by which plants make food using sunlight is called _____',
    answer: 'photosynthesis'
  },
  {
    type: 'single',
    question: 'How many chambers does a human heart have?',
    options: ['2', '3', '4', '5'],
    answer: '4'
  },
  {
    type: 'multi',
    question: 'Select all the components of DNA:',
    options: ['Adenine', 'Glucose', 'Thymine', 'Guanine', 'Cytosine'],
    answer: ['Adenine', 'Thymine', 'Guanine', 'Cytosine']
  },
  {
    type: 'fill',
    question: 'DNA stands for Deoxyribo_____ Acid',
    answer: 'nucleic'
  },
  {
    type: 'single',
    question: 'Which blood type is known as the universal donor?',
    options: ['A', 'B', 'AB', 'O'],
    answer: 'O'
  }
];

let currentQ = 0;
let score = 0;
let userAnswers = [];
let answered = false;

const qText = document.getElementById('questionText');
const qCount = document.getElementById('qCount');
const qType = document.getElementById('qType');
const answerArea = document.getElementById('answerArea');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progressBar');
const feedback = document.getElementById('feedback');
const quizScreen = document.getElementById('quizScreen');
const resultsScreen = document.getElementById('resultsScreen');

function loadQuestion(){
  answered = false;
  nextBtn.disabled = true;
  feedback.classList.remove('show');

  const q = questions[currentQ];
  qCount.textContent = `Question ${currentQ + 1} of ${questions.length}`;
  qText.textContent = q.question;
  progressBar.style.width = `${((currentQ) / questions.length) * 100}%`;

  const types = {
    'single': 'Single Choice',
    'multi': 'Multiple Choice',
    'fill': 'Fill in the Blank'
  };
  qType.textContent = types[q.type];

  answerArea.innerHTML = '';

  if(q.type === 'single'){
    const opts = document.createElement('div');
    opts.className = 'options';
    q.options.forEach(opt => {
      const div = document.createElement('div');
      div.className = 'option';
      div.innerHTML = `<input type="radio" name="answer" value="${opt}"><span>${opt}</span>`;
      div.onclick = () => selectSingle(div, opt);
      opts.appendChild(div);
    });
    answerArea.appendChild(opts);

  } else if(q.type === 'multi'){
    const opts = document.createElement('div');
    opts.className = 'options';
    q.options.forEach(opt => {
      const div = document.createElement('div');
      div.className = 'option';
      div.innerHTML = `<input type="checkbox" value="${opt}"><span>${opt}</span>`;
      div.onclick = (e) => {
        if(e.target.tagName!== 'INPUT') {
          const checkbox = div.querySelector('input');
          checkbox.checked =!checkbox.checked;
        }
        selectMulti();
      };
      opts.appendChild(div);
    });
    answerArea.appendChild(opts);

  } else if(q.type === 'fill'){
    const div = document.createElement('div');
    div.className = 'fill-blank';
    div.innerHTML = `<input type="text" id="fillInput" placeholder="Type your answer here...">`;
    answerArea.appendChild(div);
    document.getElementById('fillInput').oninput = () => {
      nextBtn.disabled = false;
    };
  }
}

function selectSingle(el, val){
  if(answered) return;
  document.querySelectorAll('.option').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  el.querySelector('input').checked = true;
  nextBtn.disabled = false;
}

function selectMulti(){
  if(answered) return;
  document.querySelectorAll('.option').forEach(opt => {
    const checkbox = opt.querySelector('input');
    opt.classList.toggle('selected', checkbox.checked);
  });
  const anyChecked = document.querySelector('.option input:checked');
  nextBtn.disabled =!anyChecked;
}

function checkAnswer(){
  if(answered) return;
  answered = true;

  const q = questions[currentQ];
  let isCorrect = false;
  let userAns = null;

  if(q.type === 'single'){
    userAns = document.querySelector('.option input:checked')?.value;
    isCorrect = userAns === q.answer;

    document.querySelectorAll('.option').forEach(opt => {
      const val = opt.querySelector('input').value;
      if(val === q.answer) opt.classList.add('correct');
      if(opt.classList.contains('selected') && val!== q.answer) opt.classList.add('wrong');
    });

  } else if(q.type === 'multi'){
    userAns = Array.from(document.querySelectorAll('.option input:checked')).map(i => i.value);
    isCorrect = userAns.length === q.answer.length && userAns.every(v => q.answer.includes(v));

    document.querySelectorAll('.option').forEach(opt => {
      const val = opt.querySelector('input').value;
      if(q.answer.includes(val)) opt.classList.add('correct');
      if(opt.querySelector('input').checked &&!q.answer.includes(val)) opt.classList.add('wrong');
    });

  } else if(q.type === 'fill'){
    userAns = document.getElementById('fillInput').value.trim().toLowerCase();
    isCorrect = userAns === q.answer.toLowerCase();
    document.getElementById('fillInput').disabled = true;
  }

  userAnswers.push({
    question: q.question,
    userAns: userAns,
    correctAns: q.answer,
    isCorrect: isCorrect
  });

  if(isCorrect){
    score++;
    feedback.textContent = '✓ Correct! Well done!';
    feedback.className = 'feedback show correct';
  } else {
    feedback.textContent = `✗ Wrong! Correct answer: ${Array.isArray(q.answer)? q.answer.join(', ') : q.answer}`;
    feedback.className = 'feedback show wrong';
  }

  nextBtn.textContent = currentQ === questions.length - 1? 'See Results' : 'Next Question';
  nextBtn.disabled = false;
}

nextBtn.onclick = () => {
  if(!answered){
    checkAnswer();
  } else {
    currentQ++;
    if(currentQ < questions.length){
      loadQuestion();
      nextBtn.textContent = 'Next Question';
    } else {
      showResults();
    }
  }
};

function showResults(){
  quizScreen.style.display = 'none';
  resultsScreen.style.display = 'block';

  const percentage = Math.round((score / questions.length) * 100);
  document.getElementById('finalScore').textContent = score;
  document.getElementById('totalQ').textContent = questions.length;

  let msg = '';
  if(percentage === 100) msg = 'Perfect Score! 🧬 You\'re a biology pro!';
  else if(percentage >= 80) msg = 'Excellent work! 🌿';
  else if(percentage >= 60) msg = 'Good job! 🧪 Keep studying!';
  else if(percentage >= 40) msg = 'Not bad! 📚 Review and try again!';
  else msg = 'Keep learning! 💪 You\'ll get it next time!';
  document.getElementById('resultMsg').textContent = msg;

  const review = document.getElementById('review');
  review.innerHTML = '<h3 style="margin-bottom:15px;">Review:</h3>';
  userAnswers.forEach((ans, i) => {
    const item = document.createElement('div');
    item.className = `review-item ${ans.isCorrect? 'correct' : 'wrong'}`;
    const userAnsStr = Array.isArray(ans.userAns)? ans.userAns.join(', ') : ans.userAns || 'No answer';
    const correctAnsStr = Array.isArray(ans.correctAns)? ans.correctAns.join(', ') : ans.correctAns;
    item.innerHTML = `
      <div class="review-q">Q${i+1}: ${ans.question}</div>
      <div class="review-a">Your answer: ${userAnsStr} ${ans.isCorrect? '✓' : `✗ (Correct: ${correctAnsStr})`}</div>
    `;
    review.appendChild(item);
  });

  progressBar.style.width = '100%';
}

function restartQuiz(){
  currentQ = 0;
  score = 0;
  userAnswers = [];
  quizScreen.style.display = 'block';
  resultsScreen.style.display = 'none';
  loadQuestion();
}

loadQuestion();