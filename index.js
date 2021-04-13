document.addEventListener("DOMContentLoaded", function () {
  const list = document.querySelector(".list");
  const acceptBtn = document.querySelector(".accept");
  const rejectBtn = document.querySelector(".reject");
  const modal = document.querySelector(".modal");
  const container = document.querySelector(".container");

  if (
    document.cookie
      .split("; ")
      .map((cookie) => cookie.split("=")[0])
      .includes("vendors") === false
  ) {
    modal.classList.remove("invisible");
    container.classList.add("blur");
  }

  fetch("/vendor-list.json")
    .then((response) => response.json())
    .then((data) => {
      let vendorsHtml = "";

      Object.values(data.vendors).forEach((value) => {
        vendorsHtml += `<li><input id="${value.id}" class="vendor-checkbox" type="checkbox" checked/><label for="${value.id}"> ${value.name}</label> (<a href="${value.policyUrl}">Policy Url</a>)</li>`;
      });

      list.innerHTML = vendorsHtml;
    });

  acceptBtn.addEventListener("click", function () {
    const allCheckboxes = document.querySelectorAll(".vendor-checkbox");
    let date = new Date(Date.now() + 86400e3);
    date = date.toUTCString();
    let vendorsId = "";
    allCheckboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        vendorsId += `${checkbox.id},`;
      }
      modal.classList.add("invisible");
      container.classList.remove("blur");
    });
    document.cookie = `vendors=${vendorsId} expires=${date}`;
  });

  rejectBtn.addEventListener("click", function () {
    let date = new Date(Date.now() + 86400e3);
    date = date.toUTCString();
    document.cookie = `vendors=false expires=${date}`;
    modal.classList.add("invisible");
    container.classList.remove("blur");
  });
});
