const cube = document.querySelector("#cube");
const obstacle = document.querySelector("#obstacleWrap");
const btn = document.querySelector(".btn");
var scoreBoard = document.querySelector(".score");
var score = 0;
let prevScore = 0;
let id = localStorage.getItem("id");
scoreBoard.textContent = score;

document.addEventListener("DOMContentLoaded", async () => {
  const getData = fetch("getScore.php").then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      alert(`Ошибки при получении данных: ${response.status}`);
    }
  });
  const jsonArr = async () => {
    await getData.then((data) => {
      let i = 0;
      while (i < 10) {
        const ol = document.querySelector("ol");
        let li = document.createElement("li");
        let obj = data[i];
        ol.append(li);
        li.textContent = `${obj.name}: ${obj.score}`;
        i++;
      }
    });
  };
  await jsonArr();
  const getScore = async () => {
    await getData.then((data) => {
      let i = 0;
      while (i < data.length) {
        let obj = data[i];
        if (obj.id == id) {
          prevScore = obj.score;
          return false;
        } else {
          i++;
        }
      }
    });
  };
  await getScore();
});

let isAlive = setInterval(function () {
  let cubeTop = parseInt(window.getComputedStyle(cube).getPropertyValue("top")); //parseInt делает из строки число, getComputedStyle возвращает значения всех сss свойств, getPropertyValue возврвщвет только нужное значение в виде строки
  let obstacleLeft = parseInt(
    window.getComputedStyle(obstacle).getPropertyValue("left")
  );

  if (obstacleLeft < 54 && obstacleLeft > 0 && cubeTop >= 130) {
    async function useFetch() {
      let formData = new FormData();
      formData.append("id", Number(id));
      formData.append("score", score);
      await fetch("sendScore.php", {
        method: "POST",
        body: formData,
      })
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
    }

    if (score > prevScore) {
      useFetch();
    }

    obstacle.classList.remove("started");
    scoreBoard.textContent = "0";
    score = 0;
    clearInterval(interval);
    btn.disabled = false;
    alert("GAME OVER!");
  }
}, 10);

if (document.documentElement.clientWidth < 1024) {
  document.addEventListener("click", function (event) {
    jump();
  });
}

document.addEventListener("keydown", function (event) {
  jump();
});

btn.addEventListener("click", () => {
  obstacle.classList.add("started");
  interval = setInterval(function () {
    scoreBoard.textContent = score;
    score++;
  }, 150);
  btn.classList.add("clicked");
  setTimeout(() => {
    btn.classList.remove("clicked");
  }, 200);
  btn.disabled = true;
});

function jump() {
  if (cube.classList != "jump") {
    cube.classList.add("jump");
  }
  setTimeout(function () {
    cube.classList.remove("jump");
  }, 800);
}

if (document.documentElement.clientWidth > 1024) {
  let bg = document.querySelector(".gameParallax");
  window.addEventListener("mousemove", function (e) {
    let x = e.clientX / window.innerWidth;
    let y = e.clientY / window.innerHeight;
    bg.style.transform = "translate(-" + x * 30 + "px, -" + y * 20 + "px)";
  });
}
