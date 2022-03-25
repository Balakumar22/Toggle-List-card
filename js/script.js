const containerEl = document.getElementsByClassName("container")[0];
const showTable = document.getElementsByClassName("list-icon")[0];
const showCard = document.getElementsByClassName("card-icon")[0];

// RENDER ITEMS

const url = "http://localhost:3000/details";

let details = [];

// FETCH DATA FUCTION

async function fetchDetails() {
  const response = await fetch(url);
  const res = await response.json();
  return res;
}

// STORE DATA AS A ARRAY FUNCTION

function displayDetails() {
  fetchDetails().then((c) => {
    details = c;
    display();
  });
}

// RENDER DATA IN HTML FUNCTION

function display() {
  const cardContainer = document.getElementsByClassName("card-container")[0];
  const tableContainer = document.getElementsByClassName("grid-container")[0];
  cardContainer.innerHTML = null;
  tableContainer.innerHTML = `<div class="row table-header">
  <p>Name</p>
  <p>ID</p>
  <p>Skills</p>
  <p>Project</p>
  <p>HCM</p>
  <p>Operation</p>
</div>`;
  details.map((d) => {
    const name = d.Name;
    const id = d.id;
    const skills = d.Skills;
    const project = d.Project;
    const hcm = d.HCM;
    const gender = d.gender === "M" ? "Male" : "Female";
    const img = `${gender.toLowerCase()}.png`;
    const imgClass = gender === "M" ? "card-img" : "card-img female-img";

    // CARD DATA RENDERING
    cardContainer.innerHTML += `<div class="card">
        <ion-icon class="close-icon" name="close" onclick="deleteCard(${id})"></ion-icon>
        <div class="card-header">
          <img class="${imgClass}" src="img/${img}" alt="${gender} icon" />
        </div>
        <div class="card-body">
          <p class="name">
            Name : ${name}
          </p>
          <p class="id">
            ID : ${id}
          </p>
          <p class="skills">
            Skills :
            <input
              type="text"
              id="skills${id}"
              value="${skills}"
              disabled
            />
          </p>
          <p class="project">
            Project : ${project}
          </p>
          <p class="hcm">
            HCM : ${hcm}
          </p>
        </div>
        <div class="card-footer">
          <button id="edit${id}" class="btn active" onclick="cardEdit(${id})">
            Edit
          </button>
          <button id="save${id}" class="btn" onclick="cardSave(${id})">Save</button>
        </div>
      </div>`;

    // TABLE DATA RENDERING
    tableContainer.innerHTML += `<div class="row">
        <p>${name}</p>
        <p>${id}</p>
        <p class="skills">
            <input
              type="text"
              id="tskills${id}"
              value="${skills}"
              disabled
            />
          </p>
        <p>${project}</p>
        <p>${hcm}</p>
        <p><ion-icon id="tedit${id}" class="edit-icon active" name="create-sharp" onclick="tableEdit(${id})"></ion-icon>
        <ion-icon id="tsave${id}" class="save-icon" name="save-sharp" onclick="tableSave(${id})"></ion-icon>
        <ion-icon class="delete-icon" name="close" onclick="deleteCard(${id})"></ion-icon></p>
      </div>`;
  });
}

// TOGGLE TABLE
showTable.addEventListener("click", function () {
  showTable.classList.remove("active");
  if (containerEl.classList.contains("table-close")) {
    containerEl.classList.remove("table-close");
  }
  showCard.classList.add("active");
  containerEl.classList.add("card-close");
});

// TOGGLE CARD

showCard.addEventListener("click", function () {
  showCard.classList.remove("active");
  if (containerEl.classList.contains("card-close")) {
    containerEl.classList.remove("card-close");
  }
  showTable.classList.add("active");
  containerEl.classList.add("table-close");
});

// CARD EDIT

function cardEdit(id) {
  document.getElementById(`edit${id}`).classList.remove("active");
  document.getElementById(`save${id}`).classList.add("active");
  const skills = document.getElementById(`skills${id}`);

  //enable the input Boxs
  skills.disabled = false;
}

// CARD SAVE

function cardSave(id) {
  document.getElementById(`save${id}`).classList.remove("active");
  document.getElementById(`edit${id}`).classList.add("active");
  const Skills = document.getElementById(`skills${id}`);
  fetch(url + `/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      Skills: Skills.value,
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => displayDetails())
    .catch((err) => alert(err));

  //enable the input Boxs
  Skills.disabled = true;
}

// TABLE EDIT

function tableEdit(id) {
  document.getElementById(`tedit${id}`).classList.remove("active");
  document.getElementById(`tsave${id}`).classList.add("active");
  const skills = document.getElementById(`tskills${id}`);

  //enable the input Boxs
  skills.disabled = false;
}

// TABLE SAVE

function tableSave(id) {
  document.getElementById(`tsave${id}`).classList.remove("active");
  document.getElementById(`tedit${id}`).classList.add("active");
  const Skills = document.getElementById(`tskills${id}`);
  fetch(url + `/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      Skills: Skills.value,
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => displayDetails())
    .catch((err) => alert(err));

  //enable the input Boxs
  Skills.disabled = true;
}

// DELETE CARD AND TABLE

function deleteCard(id) {
  fetch(url + `/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => displayDetails())
    .catch((err) => alert(err));
}
