const url = "getData.php";
const form = document.querySelector(".form");

const getData = fetch(url).then((response) => {
  if (response.ok) {
    return response.json();
  } else {
    alert(`Ошибки при получении данных: ${response.status}`);
  }
});

form.addEventListener("submit", function (e) {
  let inputEmail = document.querySelector("#email").value;
  let inputPassword = document.querySelector("#password").value;
  e.preventDefault();
  let i = 0;
  const jsonArr = async () => {
    await getData.then((data) => {
      while (i < data.length) {
        let obj = data[i];

        if (obj.email === inputEmail) {
          if (obj.password === inputPassword) {
            localStorage.setItem('id', obj.id)
            window.location.href = "game.php";
            return false;
          } else {
            document.querySelector("#password").classList.add("error");
            return alert("Неверный пароль");
          }
        } else {
          i++;
        }

        if (i === data.length) {
          document.querySelector("#email").classList.add("error");
          alert("Неверно введен Email");
        }
      }
    });
  };
  jsonArr();
});
