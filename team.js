let isFlipped = false; 

document.getElementById("page1").addEventListener("click", function () {
  if (!isFlipped) { 
    if (this.classList.contains("flipped")) {
      this.style.transform = "rotateY(0deg)";
      this.style.opacity = "1";
      this.classList.remove("flipped");
    } else {
      this.style.transform = "rotateY(-180deg)";
      this.classList.add("flipped");
    }
    isFlipped = true; 
  }
});

// 호버 효과
document.querySelectorAll(".profileImage").forEach((img) => {
  const originalSrc = img.src;
  const hoverSrc = img.getAttribute("data-hover");

  img.addEventListener("mouseover", () => {
    img.src = hoverSrc;
  });

  img.addEventListener("mouseout", () => {
    img.src = originalSrc;
  });
});



document.addEventListener("DOMContentLoaded", () => {
  const profileName = document.querySelectorAll(".profileName");
  const modals = document.querySelectorAll(".profileModal");
  const closeBtns = document.querySelectorAll(".close");

  profileName.forEach((img, index) => {
    img.addEventListener("click", () => {
      event.stopPropagation();
      modals[index].style.display = "block";
    });
  });

  closeBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      event.stopPropagation();
      modals[index].style.display = "none";
    });
  });

  window.addEventListener("click", (event) => {
    modals.forEach((modal) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  });
});


// 예/아니오 값을 true/false로 변환하는 함수
function convertAnswer(answer) {
  return answer === "yes";
}

// 유사도 계산 함수
function calculateSimilarity(userAnswers, checklistAnswers) {
  let matchingAnswers = 0;
  const totalQuestions = checklistAnswers.length;

  // 각 항목에 대해 비교
  for (let i = 0; i < totalQuestions; i++) {
    if (userAnswers[i] === checklistAnswers[i]) {
      matchingAnswers++;
    }
  }

  // 퍼센트 계산
  const percentage = (matchingAnswers / totalQuestions) * 100;
  return percentage;
}

// 가장 유사한 사람 찾기
function findMostSimilar(answers, checklistAnswers) {
  let maxSimilarity = -1;
  let mostSimilarUser = "";

  // 각 운영진의 답안을 비교
  for (const [user, userAnswers] of Object.entries(answers)) {
    const similarity = calculateSimilarity(userAnswers, checklistAnswers);
    console.log(`${user}의 유사도: ${similarity}%`);

    if (similarity > maxSimilarity) {
      maxSimilarity = similarity;
      mostSimilarUser = user;
    }
  }

  return mostSimilarUser;
}

// 운영진 답안 
const answers = {
  "김선화": [true, false, true],
  "김시원": [false, true, false],
  "최영": [true, false, true]
};

// 제출 이벤트 리스너
document.getElementById("checklistForm").addEventListener("submit", function(event) {
  event.preventDefault(); // 폼이 제출되지 않도록 막음

  // 사용자가 선택한 답변을 가져오기
  const userAnswers = [
    convertAnswer(document.querySelector('input[name="q1"]:checked')?.value),
    convertAnswer(document.querySelector('input[name="q2"]:checked')?.value),
    convertAnswer(document.querySelector('input[name="q3"]:checked')?.value)
  ];

  // 가장 유사한 운영진 찾기
  const mostSimilarUser = findMostSimilar(answers, userAnswers);

  // 결과 출력
  document.getElementById("result").innerText = `가장 유사한 운영진은: ${mostSimilarUser}`;
});


// 예/아니오 값을 true/false로 변환하는 함수
function convertAnswer(answer) {
  return answer === "yes";
}

// 유사도 계산 함수
function calculateSimilarity(userAnswers, checklistAnswers) {
  let matchingAnswers = 0;
  const totalQuestions = checklistAnswers.length;

  // 각 항목에 대해 비교
  for (let i = 0; i < totalQuestions; i++) {
    if (userAnswers[i] === checklistAnswers[i]) {
      matchingAnswers++;
    }
  }

  // 퍼센트 계산
  const percentage = (matchingAnswers / totalQuestions) * 100;
  return percentage;
}

// 가장 유사한 사람 찾기
function findMostSimilar(answers, checklistAnswers) {
  let maxSimilarity = -1;
  let mostSimilarUser = "";

  // 각 운영진의 답안을 비교
  for (const [user, userAnswers] of Object.entries(answers)) {
    const similarity = calculateSimilarity(userAnswers, checklistAnswers);
    console.log(`${user}의 유사도: ${similarity}%`);

    if (similarity > maxSimilarity) {
      maxSimilarity = similarity;
      mostSimilarUser = user;
    }
  }

  return mostSimilarUser;
}

// 운영진 답안 
const answers = {
  "김선화": [true, false, true],
  "김시원": [false, true, false],
  "최영": [true, false, true]
};

// 제출 이벤트 리스너
document.getElementById("checklistForm").addEventListener("submit", function(event) {
  event.preventDefault(); // 폼이 제출되지 않도록 막음

  // 사용자가 선택한 답변을 가져오기
  const userAnswers = [
    convertAnswer(document.querySelector('input[name="q1"]:checked')?.value),
    convertAnswer(document.querySelector('input[name="q2"]:checked')?.value),
    convertAnswer(document.querySelector('input[name="q3"]:checked')?.value)
  ];

  // 가장 유사한 운영진 찾기
  const mostSimilarUser = findMostSimilar(answers, userAnswers);

  // 결과 출력
  document.getElementById("result").innerText = `가장 유사한 운영진은: ${mostSimilarUser}`;
});