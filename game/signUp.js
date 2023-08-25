const btn = document.querySelector(".btn");

btn.addEventListener("click", () => {
  btn.classList.add("clicked");
  setTimeout(() => {
    btn.classList.remove("clicked");
  }, 200);
});

document.addEventListener("DOMContentLoaded", () => {
  const sendData = async (formData) => {
    const response = await fetch("sendData.php", {
      method: "POST",
      body: formData, // отправляем данные с полей формы обычным запрососм, благодаря fetch
    });
    if (!response.ok) {
      throw new Error(
        `Ошибка по адресу ${url}, статус ошибки ${response.status}` // генерируем ошибку с помощью throw new Error()
      );
    }
    return await response.text();
  };

  const getData = fetch("getData.php").then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      alert(`Ошибки при получении данных: ${response.status}`);
    }
  });

  let form = document.querySelector(".form");
  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      let email = document.querySelector("#email").value.trim();
      let name = document.querySelector("#name").value.trim();
      let password = document.querySelector("#password").value.trim();
      let coPassword = document.querySelector("#confirmPassword").value.trim();
      var re1 = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
      var re2 = /\d/;
      //валидация формы
      //проверка существует ли такой емэил в бд
      let i = 0;
      let emailExists = false;
      const jsonArr = async () => {
        await getData.then((data) => {
          while (i < data.length) {
            let obj = data[i];
            if (obj.email === email) {
              emailExists = true;
              return false;
            } else {
              i++;
            }
          }
        });
      };
      await jsonArr();
      console.log(emailExists);
      if (emailExists === true) {
        document.querySelector("#email").classList.add("error");
        return alert("Такой email уже существует");
      }
      if (!re1.test(email)) {
        document.querySelector("#email").classList.add("error");
        return alert("Неверно введен email");
      }
      if (name == "") {
        document.querySelector("#name").classList.add("error");
        return alert("Неверно введено имя");
      }
      if (password.split("").length < 5) {
        document.querySelector("#password").classList.add("error");
        return alert("Пароль слишком короткий, введите хотя-бы 5 символов");
      }
      if (!re2.test(password)) {
        document.querySelector("#password").classList.add("error");
        return alert("В пароле должна быть хотя-бы одна цифра");
      }
      if (password !== coPassword) {
        document.querySelector("#confirmPassword").classList.add("error");
        return alert("Пароли не совпадают");
      }
      const formData = new FormData(this); // new FormData собирает данные со всех полей формы
      await sendData(formData)
        //then начинает выполнение функции после получения промиса
        .then((response) => {
          form.reset();
          window.location.href = "signIn.php";
        })
        .catch((err) => console.error(err)); // обработаем ошибку вместо then
    });
  }
});

document.querySelector("#name").addEventListener("click", function () {
  this.classList.remove("error");
});

document.querySelector("#email").addEventListener("click", function () {
  this.classList.remove("error");
});

document.querySelector("#password").addEventListener("click", function () {
  this.classList.remove("error");
});

document
  .querySelector("#confirmPassword")
  .addEventListener("click", function () {
    this.classList.remove("error");
  });
