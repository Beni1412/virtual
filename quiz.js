const questions = [
  {
    type: 'image',
    src: 'song/G-elang.jpg',
    question: 'Hewan apakah ini?',
    choices: ['Singa', 'Elang', 'Serigala', 'Kucing'],
    answer: 'Elang',
  },
  {
    type: 'image',
    src: 'song/serigala.webp',
    question: 'Hewan apakah ini?',
    choices: ['Panda', 'Beruang Kutub', 'Serigala', 'Harimau'],
    answer: 'Serigala',
  },
  {
    type: 'audio',
    src: 'song/kucing.mp3',
    question: 'Dari suara ini, hewan apa yang kamu dengar?',
    choices: ['Rubah', 'Serigala', 'Kucing', 'Burung'],
    answer: 'Kucing',
  },
  {
    type: 'image',
    src: 'song/harimau.jpeg',
    question: 'Hewan apakah ini?',
    choices: ['Singa', 'Harimau', 'Kucing', 'Macan Tutul'],
    answer: 'Harimau',
  },
  {
    type: 'audio',
    src: 'song/owl.mp3',
    question: 'Hewan apakah ini?',
    choices: ['Serigala', 'Anjing', 'Burung Hantu', 'Beruang'],
    answer: 'Burung Hantu',
  },
];

let currentQuestion = 0;
let score = 0;

const questionArea = document.getElementById('question-area');
const choicesArea = document.getElementById('choices-area');
const nextBtn = document.getElementById('next-btn');
const resultContainer = document.getElementById('result-container');
const resultText = document.getElementById('result-text');
const resultSticker = document.getElementById('result-sticker');

function showQuestion() {
  const q = questions[currentQuestion];
  questionArea.innerHTML = '';

  if (q.type === 'image') {
    const img = document.createElement('img');
    img.src = q.src;
    img.alt = 'Gambar Hewan';
    img.style.width = '250px';
    img.style.borderRadius = '15px';
    questionArea.appendChild(img);
  } else if (q.type === 'audio') {
    const audio = document.createElement('audio');
    audio.src = q.src;
    audio.controls = true;
    questionArea.appendChild(audio);
  }

  const qText = document.createElement('h2');
  qText.innerText = q.question;
  questionArea.appendChild(qText);

  choicesArea.innerHTML = '';
  q.choices.forEach((choice) => {
    const btn = document.createElement('button');
    btn.innerText = choice;
    btn.className = 'nav-btn';
    btn.onclick = () => checkAnswer(choice);
    choicesArea.appendChild(btn);
  });
}

function checkAnswer(selected) {
  if (selected === questions[currentQuestion].answer) {
    score++;
  }
  nextBtn.disabled = false;
}

nextBtn.addEventListener('click', () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
    nextBtn.disabled = true;
  } else {
    showResult();
  }
});

function showResult() {
  document.getElementById('quiz-container').style.display = 'none';
  resultContainer.style.display = 'block';
  const percentage = (score / questions.length) * 100;
  if (percentage >= 50) {
    resultText.innerText = `🎉 Selamat! Skormu ${percentage}% 🎉`;
    resultSticker.src =
      'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmo3c3l5ODh3ZGN6NHhhaDE2Mjg1ZjkwOXczdDFxbWM3dTBtaW9zaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/9XY4f3FgFTT4QlaYqa/giphy.gif';
  } else {
    resultText.innerText = `💪 Belajar lagi ya! Skormu ${percentage}% 💪`;
    resultSticker.src =
      'https://media.giphy.com/media/VM1fcpu2bKs1e2Kdbj/giphy.gif';
  }
}

showQuestion();
nextBtn.disabled = true;
