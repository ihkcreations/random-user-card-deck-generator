const firstNames = [
  "anna", "bjorn", "cecilie", "david",
  "elena", "felix", "greta", "hans",
  "ida", "johan", "katrin", "lars",  
  "mona", "nils", "olga", "peter"
];

const lastNames = [
  "andersen", "berg", "dahl", "falk",
  "holm", "jensen", "lange", "moen",
  "olsen", "persson", "quist", "ring",  
  "sand", "thomsen", "vang", "wahl"
];

const roles = [
  "engineer", "analyst", "designer",
  "operator", "architect", "researcher"
];  

let currentDeck = [];

const btnGenerate = document.getElementById("btn-generate");
const btnExport = document.getElementById("btn-export");
const searchInput = document.getElementById("search-input");
const cardContainer = document.getElementById("card-container");  
const cardCount = document.getElementById("card-count");

function randomItem(arr) {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateUser() {
  const first = randomItem(firstNames);
  const last = randomItem(lastNames);  
  const name = `${first} ${last}`;
  const role = randomItem(roles);
  const id = randomInt(1000, 9999);
  const clearance = `lvl-${randomInt(1, 4)}`;
  const status = Math.random() > 0.2 ? "active" : "idle";
  const initials = `${first[0]}${last[0]}`;
  return { name, role, id, clearance, status, initials };  
}

function renderDeck(users) {
  cardContainer.innerHTML = "";
  users.forEach(function(user) {
    const card = document.createElement("div");
    card.className = "user-card";  
    const header = document.createElement("div");
    header.className = "user-header";
    const avatar = document.createElement("div");
    avatar.className = "user-avatar";
    avatar.textContent = user.initials;
    const info = document.createElement("div");
    info.className = "user-info";  
    const nameEl = document.createElement("div");
    nameEl.className = "user-name";
    nameEl.textContent = user.name;
    const roleEl = document.createElement("div");
    roleEl.className = "user-role";
    roleEl.textContent = user.role;
    info.appendChild(nameEl);  
    info.appendChild(roleEl);
    header.appendChild(avatar);
    header.appendChild(info);
    card.appendChild(header);
    const details = document.createElement("div");
    details.className = "user-details";
    details.appendChild(createDetailRow("id", user.id));  
    details.appendChild(createDetailRow("clearance", user.clearance));
    details.appendChild(createDetailRow("status", user.status));
    card.appendChild(details);
    cardContainer.appendChild(card);
  });
  cardCount.textContent = users.length;
  if (users.length > 0) {  
    btnExport.removeAttribute("disabled");
  } else {
    btnExport.setAttribute("disabled", "true");
  }
}

function createDetailRow(label, value) {  
  const row = document.createElement("div");
  row.className = "detail-row";
  const labelSpan = document.createElement("span");
  labelSpan.className = "detail-label";
  labelSpan.textContent = label;
  const valSpan = document.createElement("span");
  valSpan.textContent = value;  
  row.appendChild(labelSpan);
  row.appendChild(valSpan);
  return row;
}

function handleGenerate() {
  currentDeck = [];  
  const count = randomInt(6, 12);
  for (let i = 0; i < count; i++) {
    currentDeck.push(generateUser());
  }
  filterAndRender();
}

function filterAndRender() {
  const query = searchInput.value.toLowerCase().trim();
  const filtered = currentDeck.filter(function(user) {
    const matchName = user.name.toLowerCase().includes(query);
    const matchRole = user.role.toLowerCase().includes(query);
    return matchName || matchRole;
  });  
  renderDeck(filtered);
}

function handleExport() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentDeck, null, 2));
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", dataStr);  
  downloadAnchor.setAttribute("download", "user-deck.json");
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

btnGenerate.addEventListener("click", handleGenerate);  
btnExport.addEventListener("click", handleExport);
searchInput.addEventListener("input", filterAndRender);
handleGenerate();


