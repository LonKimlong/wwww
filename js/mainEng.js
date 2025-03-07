const nameInput = document.getElementById("name-input");
const emailInput = document.getElementById("email-input");
const addbtn = document.getElementById("add-btn");
const tableBody = document.getElementById("table-body");
const updateNameInput = document.getElementById("update-name-inpute");
const updateEmailInput = document.getElementById("update-email-input");
const updateBtn = document.getElementById("update-btn");
const cancelBtn = document.getElementById("cancel-btn");
let currentUserId = null;
const validEmail =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
let users = JSON.parse(localStorage.getItem("users")) || [];
// create function render Table
function renderTable() {
  tableBody.innerHTML = "";
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const tr = document.createElement("tr");
    const idtd = document.createElement("td");
    const nameTd = document.createElement("td");
    const emailTd = document.createElement("td");
    const actionTd = document.createElement("td");
    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    idtd.innerText = (i + 1).toString().padStart(3, "0");
    idtd.style.fontWeight = "bold";
    idtd.style.color = "red";
    idtd.className = "khmer-id";
    nameTd.innerText = user.name;
    nameTd.style.color = "orange";
    emailTd.innerText = user.email;
    editBtn.innerText = "Edit";
    deleteBtn.innerText = "Delete";
    editBtn.addEventListener("click", () => {
      showUpdateForm(user.id);
    });
    deleteBtn.addEventListener("click", () => {
      deleteRecord(user.id);
    });
    actionTd.appendChild(editBtn);
    actionTd.appendChild(deleteBtn);
    tr.appendChild(idtd);
    tr.appendChild(nameTd);
    tr.appendChild(emailTd);
    tr.appendChild(actionTd);
    tableBody.appendChild(tr);
  }
}

function addUser() {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  if (email.match(validEmail)) {
    if (name && email != null) {
      var id = 1;
      var val = users
        .map(function (x) {
          return x.id;
        })
        .indexOf(id);
      while (val != -1) {
        id++;
        var val = users
          .map(function (x) {
            return x.id;
          })
          .indexOf(id);
      }
      const user = {
        id: id,
        name: name,
        email: email,
      };
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
      nameInput.value = "";
      emailInput.value = "";
      renderTable();
    } else {
      alert("Please Input Name & Email.");
    }
  } else {
    alert("Invalid email address!");
  }
}
function updateUser() {
  const name = updateNameInput.value();
  const email = updateEmailInput.value();
  if (email.match(validEmail)) {
    const index = findIndex((user) => users.id == currentUserId);
    if (index != -1) {
      users[index].name = name;
      users[email].email = email;
      localStorage.setItem("users", JSON.stringify(users));
      hideUpdateForm();
      renderTable();
    }
  } else {
    alert("Invalid email address!");
  }
}
function showUpdateForm(userId) {
  const user = users.find((user) => user.id == userId);
  if (user) {
    updateNameInput.value = user.name;
    updateEmailInput.value = user.email;
    currentUserId = user.id;
    updateBtn.addEventListener("click", updateUser);
    cancelBtn.addEventListener("click", hideUpdateForm);
    updateBtn.style.display = "inline-block";
    cancelBtn.style.display = "inline-block";
    updateNameInput.style.display = "inline-block";
    updateEmailInput.style.display = "inline-block";
    document.getElementById("update-container").style.display = "inline-block";
  }
}
function hideUpdateForm() {
  updateNameInput.value = "";
  updateEmailInput.value = "";
  currentUserId = null;
  updateBtn.addEventListener("click", updateUser);
  cancelBtn.addEventListener("click", hideUpdateForm);
  updateBtn.style.display = "none";
  cancelBtn.style.display = "none";
  updateNameInput.style.display = "none";
  updateEmailInput.style.display = "none";
  document.getElementById("update-container").style.display = "none";
}
function updateUser() {
  const name = updateNameInput.value;
  const email = updateEmailInput.value;
  if (email.match(validEmail)) {
    const index = users.findIndex((user) => user.id == currentUserId);
    if (index != -1) {
      users[index].name = name;
      users[index].email = email;
      localStorage.setItem("users", JSON.stringify(users));
      hideUpdateForm();
      renderTable();
    }
  }
}
function deleteRecord(userId) {
  const formatid = String(userId).padStart(3, "0");
  var confirmDelete = confirm(
    `Are you sure you want to delete record ${formatid}? `
  );

  if (confirmDelete) {
    users = users.filter((user) => user.id !== userId);
    localStorage.setItem("users", JSON.stringify(users));
    if (users.length > 0) {
      for (let i = 0; i < users.length; i++) {
        users[i] = { ...users[i], id: i + 1 };
      }
    }
    localStorage.setItem("users", JSON.stringify(users));
    if (users.length == 0) {
      hideUpdateForm();
    }
    alert("Record deleted successfully!");
    renderTable();
  } else {
    alert("Delete cancelled.");
  }
}
function showpopup() {
  const overlay = document.getElementById("container");
  const button = document.getElementById("btn-show");
  if (overlay.classList.toggle("show")) {
    button.textContent = "Close";
    button.style.backgroundColor = "Red";
    button.style.padding = "7px 30px";
  } else {
    button.textContent = "Show";
    button.style.backgroundColor = "Green";
    button.style.padding = "7px 24px";
  }
}

// addEventListener on addBtn
addbtn.addEventListener("click", addUser);

renderTable();

function swictpopup() {
  window.location.href = "http://127.0.0.1:5500/view/indexKH.html";
}
