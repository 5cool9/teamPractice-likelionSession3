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

const answers = {
  "김선화": [true, true, true, false],
  "김시원": [false, false, true, true],
  "최영": [false, false, false, true]
};

const userAnswers = [null, null, null];

function calculateSimilarity(user, actual) {
  let match = 0;
  for (let i = 0; i < user.length; i++) {
    if (user[i] === actual[i]) match++;
  }
  return (match / actual.length) * 100;
}

function findMostSimilar(userAnswers) {
  let max = -1;
  let name = "";
  for (const [member, ans] of Object.entries(answers)) {
    const sim = calculateSimilarity(userAnswers, ans);
    if (sim > max) {
      max = sim;
      name = member;
    }
  }
  return { name, percent: max };
}

function updateProgress() {
  const answered = userAnswers.filter((a) => a !== null).length;
  const progress = (answered / 4) * 100;
  document.getElementById("progressBar").style.width = `${progress}%`;
}

document.querySelectorAll(".select-box").forEach((box, index) => {
  const oBtn = box.querySelector(".o-btn");
  const xBtn = box.querySelector(".x-btn");

  oBtn.addEventListener("click", () => {
    box.classList.remove("no");
    box.classList.add("yes");
    userAnswers[index] = true;
    updateProgress();
    checkDone();
  });

  xBtn.addEventListener("click", () => {
    box.classList.remove("yes");
    box.classList.add("no");
    userAnswers[index] = false;
    updateProgress();
    checkDone();
  });
});

let animationInterval; 

function checkDone() {
  if (userAnswers.length === 4 && userAnswers.every(answer => answer !== null))  {
    const result = findMostSimilar(userAnswers);
    const resultBox = document.getElementById("result");
    const resultImageContainer = document.getElementById("result-image-container");
    const resultImage = document.getElementById("result-image");

    
    resultBox.innerHTML = `<strong>${result.name}</strong> 님의 공부 계획과 가장 닮은 타입 !<br>`;
    resultBox.style.display = "block";


    if (animationInterval) {
      clearInterval(animationInterval);
    }

    resultImageContainer.style.display = "block";

    
    const images = {
      "김선화": ["image/sunhwa3.png", "image/sunhwa4.png", "image/sunhwa5.png", "image/sunhwa6.png", "image/sunhwa7.png"],
      "김시원": ["image/siwon3.png", "image/siwon4.png", "image/siwon5.png", "image/siwon6.png", "image/siwon7.png"],
      "최영": ["image/young3.png", "image/young4.png", "image/young5.png", "image/young6.png", "image/young7.png"],
    };

    const frames = images[result.name]; 
    let frameIndex = 0;


    animationInterval = setInterval(() => {
      resultImage.src = frames[frameIndex];
      frameIndex = (frameIndex + 1) % frames.length; 
    }, 300); 

   
    setTimeout(() => {
      resultImageContainer.classList.add("show");
    }, 100);
  }
}
