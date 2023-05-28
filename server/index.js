// import data from './data.json' assert { type: 'json' };

const el = (id) => document.getElementById(id);

const inputId = el('userIdIn');
const inputName = el('name');
const inputEmail = el('email');
const inputPassword = el('password');
const allUsersBtn = el('getAllUsers');
const addUserBtn = el('addUser');
const deleteUserBtn = el('deleteSingleUser');
const userList = el('usersList');

// @desc       GET all users
const getAllUsers = async () => {
  userList.innerHTML = '';
  const data = await fetch(`http://localhost:5000/data`)
    .then((response) => response.json())
    .catch((error) => console.log(error));
  data.user?.map((e) => {
    const el = document.createElement('li');
    el.innerHTML = e.name;
    userList.appendChild(el);
  });
};

// @desc       POST create user
const addUser = async () => {
  const id = inputId.value;
  const name = inputName.value;
  const email = inputEmail.value;
  const password = inputPassword.value;
  console.log(id, name, email, password);
  const data = await fetch(`http://localhost:5000/data`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, name, email, password }),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
  console.log(data);
  data.user?.map((e) => {
    const el = document.createElement('li');
    el.innerHTML = e.name;
    userList.appendChild(el);
  });
  getAllUsers();
};

// @desc       DELETE single user
const deleteSingleUser = async () => {
  const id = inputId.value;
  await fetch(`http://localhost:5000/data/${id}`, {
    method: 'DELETE',
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
  getAllUsers();
};

allUsersBtn.addEventListener('click', getAllUsers);
addUserBtn.addEventListener('click', addUser);
deleteUserBtn.addEventListener('click', deleteSingleUser);
// document.addEventListener('DOMContentLoaded', getAllUsers);
