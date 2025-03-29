document.getElementById("page1").addEventListener("click", function () {
    if (this.classList.contains("flipped")) {
      this.style.transform = "rotateY(0deg)";
      this.style.opacity = "1";
      this.classList.remove("flipped");
    } else {
      this.style.transform = "rotateY(-180deg)";
      this.style.opacity = "0.4";
      this.classList.add("flipped");
    }
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    const profileImgs = document.querySelectorAll(".profileImage");
    const modals = document.querySelectorAll(".profileModal");
    const closeBtns = document.querySelectorAll(".close");
  
    profileImgs.forEach((img, index) => {
      img.addEventListener("click", () => {
        modals[index].style.display = "block";
      });
    });
  
    closeBtns.forEach((btn, index) => {
      btn.addEventListener("click", () => {
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
