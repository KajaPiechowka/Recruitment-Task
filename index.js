document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".container");
  console.log(container);

  //   const child = document.createElement("p");
  //   child.innerText = "dupa";
  //   container.appendChild(child);

  fetch("/vendor-list.json")
    .then((response) => response.json())
    .then(
      (data) =>
        console.log(data.vendors) ||
        Object.values(data.vendors).forEach((value) => {
          container.innerHTML += `<li>${value.name}</li>`;
        })
    );
});

document.cookie =
  "user=John; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT; secure";
