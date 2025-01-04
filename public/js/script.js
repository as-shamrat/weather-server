console.log("hello world2");

const weatherForm = document.querySelector("form");
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e.target);
  const formData = new FormData(e.currentTarget);
  const location = formData.get("location");
  fetch("/weather?address=" + location)
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
});
