// Enhanced quiz.js dengan sistem poin dan soal matching
const questions = [
  {
    type: 'image',
    src: 'song/G-elang.jpg',
    question: 'Hewan apakah ini?',
    choices: ['Singa', 'Elang', 'Serigala', 'Kucing'],
    answer: 'Elang',
    points: 10,
  },
  {
    type: 'image',
    src: 'song/serigala.webp',
    question: 'Hewan apakah ini?',
    choices: ['Panda', 'Beruang Kutub', 'Serigala', 'Harimau'],
    answer: 'Serigala',
    points: 10,
  },
  {
    type: 'audio',
    src: 'song/kucing.mp3',
    question: 'Dari suara ini, hewan apa yang kamu dengar?',
    choices: ['Rubah', 'Serigala', 'Kucing', 'Burung'],
    answer: 'Kucing',
    points: 10,
  },
  {
    type: 'match',
    question: 'Cocokkan hewan dengan makanannya!       . ',
    pairs: [
      { animal: 'song/harimau.jpeg', answer: 'song/rusa.jpg' },
      { animal: 'song/hiu.avif', answer: 'song/tuna.jpg' },
      { animal: 'song/G-elang.jpg', answer: 'song/tikus.jpg' },
    ],
    choices: [
      { img: 'song/rusa.jpg', name: 'Rusa' },
      { img: 'song/tuna.jpg', name: 'Ikan' },
      { img: 'song/tikus.jpg', name: 'Tikus' },
    ],
    points: 30,
  },
  {
    type: 'image',
    src: 'song/king.jpg',
    question: 'Raja hutan ini adalah?',
    choices: ['Harimau', 'Singa', 'Macan Tutul', 'Serigala'],
    answer: 'Singa',
    points: 10,
  },
  {
    type: 'image',
    src: 'song/Pbear.jpg',
    question: 'Hewan yang hidup di kutub ini adalah?',
    choices: ['Beruang Coklat', 'Beruang Kutub', 'Panda', 'Serigala'],
    answer: 'Beruang Kutub',
    points: 10,
  },
  {
    type: 'image',
    src: 'song/hiu.avif',
    question: 'Predator laut ini adalah?',
    choices: ['Paus', 'Lumba-lumba', 'Hiu', 'Piranha'],
    answer: 'Hiu',
    points: 10,
  },
  {
    type: 'image',
    src: 'song/komodo.webp',
    question: 'Kadal raksasa Indonesia ini adalah?',
    choices: ['Iguana', 'Komodo', 'Cicak', 'Tokek'],
    answer: 'Komodo',
    points: 10,
  },
];

let currentQuestion = 0;
let totalScore = 0;
let maxScore = questions.reduce((sum, q) => sum + q.points, 0);
let hasAnswered = false;
let history = [];

const questionArea = document.getElementById('question-area');
const choicesArea = document.getElementById('choices-area');
const nextBtn = document.getElementById('next-btn');
const resultContainer = document.getElementById('result-container');
const resultText = document.getElementById('result-text');
const resultSticker = document.getElementById('result-sticker');

function showQuestion() {
  const q = questions[currentQuestion];
  hasAnswered = false;

  // Reset area pertanyaan
  questionArea.innerHTML = '';
  choicesArea.innerHTML = '';

  // Tampilkan nomor soal dan poin
  const questionNumber = document.createElement('div');
  questionNumber.innerHTML = `<h3>Soal ${currentQuestion + 1}/${
    questions.length
  } - Poin: ${q.points}</h3>`;
  questionNumber.style.color = '#2c3e50';
  questionNumber.style.marginBottom = '15px';
  questionArea.appendChild(questionNumber);

  // Tampilkan skor saat ini
  const scoreDisplay = document.createElement('div');
  scoreDisplay.innerHTML = `<p><strong>Skor Saat Ini: ${totalScore}/${maxScore}</strong></p>`;
  scoreDisplay.style.backgroundColor = '#e8f5e8';
  scoreDisplay.style.padding = '10px';
  scoreDisplay.style.borderRadius = '10px';
  scoreDisplay.style.marginBottom = '20px';
  scoreDisplay.style.border = '2px solid #4CAF50';
  questionArea.appendChild(scoreDisplay);

  // Tampilkan pertanyaan
  const qText = document.createElement('h2');
  qText.innerText = q.question;
  qText.style.animation = 'fadeInDown 0.8s ease-out';
  qText.style.color = '#2c3e50';
  qText.style.marginTop = '20px';
  questionArea.appendChild(qText);

  // Handle different question types
  if (q.type === 'image') {
    showImageQuestion(q);
  } else if (q.type === 'audio') {
    showAudioQuestion(q);
  } else if (q.type === 'match') {
    showMatchingQuestion(q);
  }
}

function showImageQuestion(q) {
  const img = document.createElement('img');
  img.src = q.src;
  img.alt = 'Gambar Hewan';
  img.style.width = '250px';
  img.style.borderRadius = '15px';
  img.style.boxShadow = '0 4px 10px rgba(0,0,0,0.3)';
  img.style.animation = 'zoomIn 0.6s ease-out';
  img.style.transition = 'transform 0.3s ease';
  img.onmouseover = () => (img.style.transform = 'scale(1.05)');
  img.onmouseout = () => (img.style.transform = 'scale(1)');
  questionArea.appendChild(img);

  setTimeout(() => {
    showChoices(q);
  }, 400);
}

function showAudioQuestion(q) {
  const audioContainer = document.createElement('div');
  audioContainer.style.margin = '20px 0';
  audioContainer.style.padding = '20px';
  audioContainer.style.backgroundColor = '#f0f8ff';
  audioContainer.style.borderRadius = '15px';
  audioContainer.style.border = '3px dashed #2196F3';

  const audioIcon = document.createElement('div');
  audioIcon.innerHTML = '🎵';
  audioIcon.style.fontSize = '48px';
  audioIcon.style.marginBottom = '10px';

  const audio = document.createElement('audio');
  audio.src = q.src;
  audio.controls = true;
  audio.style.width = '100%';
  audio.style.marginTop = '10px';

  audioContainer.appendChild(audioIcon);
  audioContainer.appendChild(audio);
  questionArea.appendChild(audioContainer);

  setTimeout(() => {
    showChoices(q);
  }, 400);
}

function showChoices(q) {
  q.choices.forEach((choice, index) => {
    const btn = document.createElement('button');
    btn.innerText = choice;
    btn.className = 'nav-btn choice-btn';
    btn.style.animation = `slideInUp 0.5s ease-out ${index * 0.1}s both`;
    btn.style.transition = 'all 0.3s ease';
    btn.style.margin = '8px';
    btn.style.fontSize = '1.1em';
    btn.style.minWidth = '120px';

    btn.onmouseover = () => {
      if (!hasAnswered) {
        btn.style.transform = 'translateY(-3px) scale(1.05)';
        btn.style.boxShadow = '0 6px 15px rgba(0,0,0,0.3)';
      }
    };

    btn.onmouseout = () => {
      if (!hasAnswered) {
        btn.style.transform = 'translateY(0) scale(1)';
        btn.style.boxShadow = '2px 2px 5px rgba(0,0,0,0.2)';
      }
    };

    btn.onclick = () => checkAnswer(choice, btn, q.points);
    choicesArea.appendChild(btn);
  });
}

function showMatchingQuestion(q) {
  const container = document.createElement('div');
  container.style.position = 'relative';
  container.style.height = '450px';
  container.style.display = 'flex';
  container.style.justifyContent = 'space-between';
  container.style.alignItems = 'center';
  container.style.gap = '40px';
  container.style.margin = '20px 0';

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '450');
  svg.style.position = 'absolute';
  svg.style.top = '0';
  svg.style.left = '0';
  svg.style.pointerEvents = 'none';
  svg.style.zIndex = '1';

  const leftCol = document.createElement('div');
  leftCol.style.display = 'flex';
  leftCol.style.flexDirection = 'column';
  leftCol.style.alignItems = 'center';
  leftCol.style.gap = '30px';
  leftCol.style.zIndex = '2';
  leftCol.style.position = 'relative';

  const rightCol = document.createElement('div');
  rightCol.style.display = 'flex';
  rightCol.style.flexDirection = 'column';
  rightCol.style.alignItems = 'center';
  rightCol.style.gap = '30px';
  rightCol.style.zIndex = '2';
  rightCol.style.position = 'relative';

  container.appendChild(svg);
  container.appendChild(leftCol);
  container.appendChild(rightCol);

  let matchCount = 0;
  let correctMatches = 0;
  let selectedAnimal = null;

  setTimeout(() => {
    q.pairs.forEach((pair, index) => {
      const img = document.createElement('img');
      img.src = pair.animal;
      img.alt = 'Hewan';
      img.style.width = '150px';
      img.style.borderRadius = '15px';
      img.style.cursor = 'pointer';
      img.style.transition = 'all 0.3s ease';
      img.style.border = '3px solid transparent';
      img.style.animation = `fadeInUp 0.6s ease-out ${index * 0.2}s both`;
      img.dataset.index = index;
      img.dataset.animal = pair.animal;

      img.onmouseover = () => {
        if (!img.classList.contains('selected-animal')) {
          img.style.transform = 'scale(1.05)';
          img.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
        }
      };

      img.onmouseout = () => {
        if (!img.classList.contains('selected-animal')) {
          img.style.transform = 'scale(1)';
          img.style.boxShadow = 'none';
        }
      };

      img.onclick = () => selectAnimal(index, img);
      leftCol.appendChild(img);
    });

    q.choices.forEach((food, i) => {
      const foodContainer = document.createElement('div');
      foodContainer.style.display = 'flex';
      foodContainer.style.flexDirection = 'column';
      foodContainer.style.alignItems = 'center';
      foodContainer.style.cursor = 'pointer';
      foodContainer.style.transition = 'all 0.3s ease';
      foodContainer.style.animation = `fadeInUp 0.6s ease-out ${
        (i + 0.5) * 0.2
      }s both`;
      foodContainer.style.padding = '10px';
      foodContainer.style.borderRadius = '15px';
      foodContainer.style.border = '2px solid transparent';
      foodContainer.dataset.food = food.img;

      const img = document.createElement('img');
      img.src = food.img;
      img.alt = food.name;
      img.style.width = '120px';
      img.style.height = '120px';
      img.style.objectFit = 'cover';
      img.style.borderRadius = '10px';
      img.style.border = '3px solid #ddd';

      const label = document.createElement('p');
      label.innerText = food.name;
      label.style.margin = '8px 0 0 0';
      label.style.fontWeight = 'bold';
      label.style.fontSize = '1em';
      label.style.color = '#2c3e50';

      foodContainer.appendChild(img);
      foodContainer.appendChild(label);

      foodContainer.onmouseover = () => {
        if (selectedAnimal) {
          foodContainer.classList.add('hover-food');
        }
        foodContainer.style.transform = 'translateY(-3px) scale(1.05)';
        foodContainer.style.boxShadow = '0 6px 15px rgba(0,0,0,0.3)';
        img.style.border = '3px solid #4CAF50';
      };

      foodContainer.onmouseout = () => {
        foodContainer.classList.remove('hover-food');
        foodContainer.style.transform = 'translateY(0) scale(1)';
        foodContainer.style.boxShadow = 'none';
        if (!foodContainer.classList.contains('matched')) {
          img.style.border = '3px solid #ddd';
        }
      };

      foodContainer.onclick = () => selectFood(food.img, foodContainer);
      rightCol.appendChild(foodContainer);
    });
  }, 600);

  questionArea.appendChild(container);

  function selectAnimal(index, imgEl) {
    document.querySelectorAll('.selected-animal').forEach((el) => {
      el.classList.remove('selected-animal');
      el.style.transform = 'scale(1)';
      el.style.boxShadow = 'none';
    });

    selectedAnimal = { index, el: imgEl };
    imgEl.classList.add('selected-animal');
    imgEl.style.animation = 'pulse 1s infinite';
  }

  function selectFood(food, foodEl) {
    if (selectedAnimal !== null) {
      const animalEl = selectedAnimal.el;
      const isCorrect = q.pairs[selectedAnimal.index].answer === food;

      animalEl.classList.remove('selected-animal');
      animalEl.style.animation = 'none';

      const line = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'line'
      );

      const containerRect = container.getBoundingClientRect();
      const rect1 = animalEl.getBoundingClientRect();
      const rect2 = foodEl.getBoundingClientRect();

      const x1 = rect1.right - containerRect.left;
      const y1 = rect1.top + rect1.height / 2 - containerRect.top;
      const x2 = rect2.left - containerRect.left;
      const y2 = rect2.top + rect2.height / 2 - containerRect.top;

      line.setAttribute('x1', x1);
      line.setAttribute('y1', y1);
      line.setAttribute('x2', x2);
      line.setAttribute('y2', y2);
      line.setAttribute('stroke', isCorrect ? '#4CAF50' : '#f44336');
      line.setAttribute('stroke-width', '4');
      line.setAttribute('stroke-linecap', 'round');
      line.style.animation = 'drawLine 1s ease-out forwards';

      svg.appendChild(line);

      if (isCorrect) {
        animalEl.style.animation = 'zoomIn 0.5s ease-out';
        foodEl.style.animation = 'zoomIn 0.5s ease-out';
        foodEl.style.backgroundColor = '#c8e6c9';
        foodEl.style.border = '2px solid #4CAF50';
        foodEl.classList.add('matched');
        animalEl.style.border = '3px solid #4CAF50';

        createParticles(foodEl, '#4CAF50');
        correctMatches++;

        setTimeout(() => {
          animalEl.style.opacity = '0.7';
          foodEl.style.opacity = '0.7';
          animalEl.style.pointerEvents = 'none';
          foodEl.style.pointerEvents = 'none';
        }, 1000);
      } else {
        animalEl.style.animation = 'shake 0.5s ease-out';
        foodEl.style.animation = 'shake 0.5s ease-out';
        foodEl.style.backgroundColor = '#ffcdd2';
        foodEl.style.border = '2px solid #f44336';

        setTimeout(() => {
          line.style.opacity = '0.3';
        }, 2000);
      }

      history.push({
        questionNumber: currentQuestion + 1,
        question: q.question,
        type: 'match',
        animal: q.pairs[selectedAnimal.index].animal,
        selectedFood: food,
        correctFood: q.pairs[selectedAnimal.index].answer,
        isCorrect: isCorrect,
        pointsEarned: 0,
        totalScore: totalScore,
      });

      matchCount++;
      selectedAnimal = null;

      if (matchCount === q.pairs.length) {
        hasAnswered = true;
        const earnedPoints = Math.round(
          (correctMatches / q.pairs.length) * q.points
        );
        totalScore += earnedPoints;

        // Update history with final points
        history[history.length - 1].pointsEarned = earnedPoints;
        history[history.length - 1].totalScore = totalScore;

        showScoreAnimation(`+${earnedPoints} Poin!`, '#4CAF50');

        setTimeout(() => {
          nextBtn.disabled = false;
          nextBtn.style.animation = 'pulse 1s infinite';
          nextBtn.style.backgroundColor = '#4CAF50';
          nextBtn.style.color = 'white';
        }, 1500);
      }
    }
  }
}

function checkAnswer(selected, buttonEl, questionPoints) {
  if (hasAnswered) return;

  hasAnswered = true;
  const q = questions[currentQuestion];
  const isCorrect = selected === q.answer;

  const allButtons = document.querySelectorAll('.choice-btn');
  allButtons.forEach((btn) => {
    btn.style.pointerEvents = 'none';
    btn.style.opacity = '0.7';

    if (btn.innerText === selected) {
      if (isCorrect) {
        btn.style.backgroundColor = '#c8e6c9';
        btn.style.border = '3px solid #4CAF50';
        btn.style.animation = 'zoomIn 0.5s ease-out';
        btn.style.transform = 'scale(1.1)';
        createParticles(btn, '#4CAF50');
      } else {
        btn.style.backgroundColor = '#ffcdd2';
        btn.style.border = '3px solid #f44336';
        btn.style.animation = 'shake 0.5s ease-out';
      }
    } else if (btn.innerText === q.answer) {
      btn.style.backgroundColor = '#c8e6c9';
      btn.style.border = '3px solid #4CAF50';
      btn.style.boxShadow = '0 0 15px #4CAF50';
      btn.style.opacity = '1';
    }
  });

  if (isCorrect) {
    totalScore += questionPoints;
    showScoreAnimation(`+${questionPoints} Poin!`, '#4CAF50');
  } else {
    showScoreAnimation('Jawaban Salah!', '#f44336');
  }

  history.push({
    questionNumber: currentQuestion + 1,
    question: q.question,
    selectedAnswer: selected,
    correctAnswer: q.answer,
    isCorrect: isCorrect,
    pointsEarned: isCorrect ? questionPoints : 0,
    totalScore: totalScore,
  });

  setTimeout(() => {
    showExplanation(isCorrect, q.answer, questionPoints);
  }, 1500);

  setTimeout(() => {
    nextBtn.disabled = false;
    nextBtn.style.animation = 'pulse 1s infinite';
    nextBtn.style.backgroundColor = '#4CAF50';
    nextBtn.style.color = 'white';
  }, 2000);
}

function showScoreAnimation(text, color) {
  const scoreAnim = document.createElement('div');
  scoreAnim.innerText = text;
  scoreAnim.style.position = 'fixed';
  scoreAnim.style.top = '50%';
  scoreAnim.style.left = '50%';
  scoreAnim.style.transform = 'translate(-50%, -50%)';
  scoreAnim.style.fontSize = '2em';
  scoreAnim.style.fontWeight = 'bold';
  scoreAnim.style.color = color;
  scoreAnim.style.zIndex = '1000';
  scoreAnim.style.animation = 'scoreFloat 2s ease-out forwards';
  scoreAnim.style.textShadow = '2px 2px 4px rgba(0,0,0,0.3)';
  scoreAnim.style.backgroundColor = 'rgba(255,255,255,0.9)';
  scoreAnim.style.padding = '10px 20px';
  scoreAnim.style.borderRadius = '15px';
  scoreAnim.style.border = `3px solid ${color}`;

  document.body.appendChild(scoreAnim);

  setTimeout(() => {
    scoreAnim.remove();
  }, 2000);
}

function showExplanation(isCorrect, correctAnswer, points) {
  const explanation = document.createElement('div');
  explanation.style.backgroundColor = isCorrect ? '#e8f5e8' : '#fff3e0';
  explanation.style.border = `3px solid ${isCorrect ? '#4CAF50' : '#FF9800'}`;
  explanation.style.borderRadius = '15px';
  explanation.style.padding = '15px';
  explanation.style.margin = '20px 0';
  explanation.style.animation = 'fadeInUp 0.6s ease-out';

  if (isCorrect) {
    explanation.innerHTML = `
      <h3 style="color: #4CAF50; margin: 0 0 10px 0;">✅ Benar!</h3>
      <p style="margin: 0; font-size: 1.1em;">Kamu mendapat <strong>${points} poin</strong>!</p>
    `;
  } else {
    explanation.innerHTML = `
      <h3 style="color: #FF9800; margin: 0 0 10px 0;">❌ Kurang Tepat!</h3>
      <p style="margin: 0; font-size: 1.1em;">Jawaban yang benar adalah: <strong>${correctAnswer}</strong></p>
    `;
  }

  questionArea.appendChild(explanation);
}

function createParticles(element, color) {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  for (let i = 0; i < 12; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.left = centerX + 'px';
    particle.style.top = centerY + 'px';
    particle.style.width = '10px';
    particle.style.height = '10px';
    particle.style.backgroundColor = color;
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '1000';

    const angle = (i / 12) * Math.PI * 2;
    const distance = 80 + Math.random() * 40;
    const endX = Math.cos(angle) * distance;
    const endY = Math.sin(angle) * distance;

    particle.style.transition = 'all 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    document.body.appendChild(particle);

    setTimeout(() => {
      particle.style.transform = `translate(${endX}px, ${endY}px)`;
      particle.style.opacity = '0';
      particle.style.transform += ' scale(0.2)';
    }, 10);

    setTimeout(() => {
      particle.remove();
    }, 1500);
  }
}

nextBtn.addEventListener('click', () => {
  nextBtn.style.animation = 'none';
  nextBtn.style.backgroundColor = '#c1fba4';
  nextBtn.style.color = '#2c3e50';

  currentQuestion++;
  if (currentQuestion < questions.length) {
    questionArea.style.transition = 'opacity 0.3s ease';
    choicesArea.style.transition = 'opacity 0.3s ease';
    questionArea.style.opacity = '0';
    choicesArea.style.opacity = '0';

    setTimeout(() => {
      showQuestion();
      questionArea.style.opacity = '1';
      choicesArea.style.opacity = '1';
      nextBtn.disabled = true;
    }, 300);
  } else {
    showFinalResult();
  }
});

function showFinalResult() {
  const percentage = Math.round((totalScore / maxScore) * 100);

  document.getElementById('quiz-container').style.transition =
    'opacity 0.5s ease';
  document.getElementById('quiz-container').style.opacity = '0';

  setTimeout(() => {
    document.getElementById('quiz-container').style.display = 'none';
    resultContainer.style.display = 'block';
    resultContainer.style.opacity = '0';
    resultContainer.style.transform = 'scale(0.8)';
    resultContainer.style.transition = 'all 0.5s ease';

    setTimeout(() => {
      resultContainer.style.opacity = '1';
      resultContainer.style.transform = 'scale(1)';

      let message = '';
      let gif = '';

      if (percentage == 100) {
        message = `🏆 LUAR BIASA! KEREN Skor: ${totalScore}/${maxScore} (${percentage}%)`;
        resultText.style.color = '#FFD700';
        gif =
          'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExejhvMjFwbXVoaHA4ZHIya3k0cGpoNnhscWxsMDRycGJ4ZmozczJxNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/MCEneemI5TEZmzeiZk/giphy.gif';
        resultText.style.animation = 'zoomIn 0.8s ease-out';
      } else if (percentage >= 90) {
        message = `🏆 LUAR BIASA! Skor: ${totalScore}/${maxScore} (${percentage}%)`;
        resultText.style.color = '#FFD700';
        gif =
          'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdXpiN3djMWExN2s4Z3FxZ2J2dXkybzZjNnluZ3h1OTI1YTNjYndsbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/9V5fArpd99fLoemwn3/giphy.gif';
        resultText.style.animation = 'zoomIn 0.8s ease-out';
      } else if (percentage >= 70) {
        message = `🎉 BAGUS SEKALI! Skor: ${totalScore}/${maxScore} (${percentage}%)`;
        resultText.style.color = '#4CAF50';
        gif =
          'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXp6NzVpYnJpMjRmbm9rNjRlZXduMmUzY3NpOTk5dmQ0eDNpdjdvOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/QYjC3IJxPGNnhget13/giphy.gif';
        resultText.style.animation = 'fadeInDown 0.8s ease-out';
      } else if (percentage >= 50) {
        message = `👍 CUKUP BAIK! Skor: ${totalScore}/${maxScore} (${percentage}%)`;
        resultText.style.color = '#FF9800';
        gif = 'https://media.giphy.com/media/VM1fcpu2bKs1e2Kdbj/giphy.gif';
        resultText.style.animation = 'fadeInDown 0.8s ease-out';
      } else {
        message = `💪 TERUS BELAJAR! Skor: ${totalScore}/${maxScore} (${percentage}%)`;
        resultText.style.color = '#f44336';
        gif =
          'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGUxNjlvMnN1cmNoczNpeWgxeDNwcDJ3eXdjNGVxdXRzOTg4d2llbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/IbyhhY66Z8ovFt0Cv3/giphy.gif';
        resultText.style.animation = 'shake 0.8s ease-out';
      }

      resultText.innerHTML = message;
      resultSticker.src = gif;
    }, 100);

    setTimeout(() => {
      window.quizHistory = history;
      window.finalScore = {
        score: totalScore,
        maxScore: maxScore,
        percentage: percentage,
      };
    }, 2000);
  }, 500);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes scoreFloat {
    0% { 
      opacity: 1; 
      transform: translate(-50%, -50%) scale(0.8); 
    }
    50% { 
      opacity: 1; 
      transform: translate(-50%, -70%) scale(1.1); 
    }
    100% { 
      opacity: 0; 
      transform: translate(-50%, -90%) scale(1); 
    }
  }
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-8px); }
    75% { transform: translateX(8px); }
  }
  
  @keyframes zoomIn {
    from { opacity: 0; transform: scale(0.8); }
    to { opacity: 1; transform: scale(1); }
  }
  
  @keyframes slideInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes fadeInDown {
    from { opacity: 0; transform: translateY(-30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .choice-btn {
    position: relative;
    overflow: hidden;
  }
  
  .choice-btn:disabled {
    cursor: not-allowed !important;
  }
`;
document.head.appendChild(style);

// Initialize quiz
showQuestion();
nextBtn.disabled = true;
