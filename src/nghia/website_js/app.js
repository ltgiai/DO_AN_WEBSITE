//Giao dien (Ket hop CSS)
let inputs = document.querySelectorAll(".input-field");
let toggle_btn = document.querySelectorAll(".toggle");
let main = document.querySelector("#main-form");
let eyes = document.querySelectorAll(".eye");
let users = {
  email:"newemail@gmail.com",
  username:"newname",
  password:"newpassword",
}
const userCredentials = {};

//Hieu ung nhap Input
inputs.forEach((inp) => {
  inp.addEventListener("focus", () => {
    inp.classList.add("active");
  });
  inp.addEventListener("blur", () => {
    if (inp.value != "") return;
    inp.classList.remove("active");
  });
});

//Hieu ung chuyen trang form
toggle_btn.forEach((btn) => {
  btn.addEventListener("click",() => {
    main.classList.toggle("sign-up-mode");
  });
});

//Hieu ung xem mat khau
eyes.forEach((eye) => {
  eye.addEventListener("click",() => {
    let parent = eye.parentElement;
    let input = parent.querySelector(".input-field");
    if (input.getAttribute('type') === 'password') {
      input.setAttribute('type','text');
      eye.innerHTML = `<i class="fas fa-eye"></i>`;
    } else {
      input.setAttribute('type','password');
      eye.innerHTML = `<i class="fas fa-eye-slash"></i>`;
    }
  });
});

//Hiệu ứng đóng mở popup
const openModalForm = document.getElementById('btn-form');
console.log(openModalForm);

const modal_form = document.getElementById('modal-form');
console.log(modal_form);

function getModal_container(modal) {
    return modal.parentElement;
}
console.log(getModal_container(modal_form));


function openModal(modal_btn, modal_box) {
    modal_btn.addEventListener('click', ()=>{
        getModal_container(modal_box).classList.add('show');
    });

    return true;
}

function closeModal(modal_box) {
    let modal_container = getModal_container(modal_box);
    modal_container.addEventListener('click', (e)=>{
        if(e.target === modal_container){
            modal_container.classList.remove('show');
        }
    });

    return true;
}

openModal(openModalForm, modal_form);
closeModal(modal_form);

const modal_warning = document.getElementById("warning");
console.log(modal_warning);
const content_warning = document.getElementById("warning-content");
console.log(content_warning);

function warning(message) {
    let warning_box = getModal_container(modal_warning);
    warning_box.classList.add('show');
    content_warning.innerText = message;
    closeModal(modal_warning);
    
}

//KIEM TRA DU LIEU NHAP VAO
//SIGN-IN
let SI_form = document.querySelector(".sign-in-form");
let SI_username = document.getElementById("sign-in-username");
let SI_password = document.getElementById("sign-in-password");
let SI_email = document.getElementById("sign-in-mail")

//SIGN-UP
let SU_form = document.querySelector(".sign-up-form");
let SU_username = document.getElementById("sign-up-username");
let SU_email = document.getElementById("sign-up-email");
let SU_password = document.getElementById("sign-up-password");
let SU_confirmPass = document.getElementById("sign-up-confirm-pass");
let SU_agree = document.getElementById("agree");

//THONG BAO LOI
function showError(input,message) {
  let parent = input.parentElement;
  let small = parent.querySelector("small");

  parent.classList.add("error");
  input.classList.add("error");
  input.classList.remove("success");
  small.innerText = message;
};

//THONG BAO THANH CONG
function showSuccess(input) {
  let parent = input.parentElement;
  let small = parent.querySelector("small");
  parent.classList.remove("error");
  input.classList.remove("error");
  small.innerText = ``;
  if (!parent.classList.contains("error")) {
    input.classList.add("success");
  }
};

//KIEM TRA DONG Y DKSD
function checkAgree(input) {
  let isAgreed = false;
  if (!input.checked) {
    warning("VUI LÒNG XÁC NHẬN ĐỒNG Ý VỚI CÁC ĐIỀU KHOẢN SỬ DỤNG");
  } else {
    isAgreed = true;
  }

  return isAgreed;
}

//KIEM TRA DINH DANG EMAIL
function checkEmailError(input) {
  let isEmailError = true;
  input.value = input.value.trim();

  const regexEmail = 
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  if (input.value == ``) {
    showError(input,`Không được bỏ trống`);
    return isEmailError;
  }

  if (!regexEmail.test(input.value)) {
    showError(input,`Email Không hợp lệ`);
    return isEmailError;
  }
  
  isEmailError = false;
  showSuccess(input);
  return isEmailError;
}

//KIEM TRA DINH DANG USERNAME
function checkUsernameError(input, min, max) {
  let isUsernameError = true;
  input.value = input.value.trim();

  if (input.value == ``) {
    showError(input, `Không được bỏ trống`);
    return isUsernameError;
  }

  if (input.value.length < min) {
    showError(input,`Tên đăng nhập cần tối thiểu ${min} ký tự`);
    return isUsernameError;
  }

  if (input.value.length > max) {
    showError(input,`Tên đăng nhập không vượt quá ${max} ký tự`);
    return isUsernameError;
  }

  isUsernameError = false;
  showSuccess(input);
  return isUsernameError;
}



//KIEM TRA DINH DANG PASSWORD
function checkPasswordError(input, min, max, isSignUp) {
  let isPasswordError = true;
  let pass = input.value.trim();

  if (pass == ``) {
    showError(input, isSignUp ? `Không được để trống` : `Mật khẩu không đúng`);
    return isPasswordError;
  }

  if(pass.length < min) {
    showError(input,isSignUp ? `Mật khẩu cần tối thiểu ${min} ký tự` : `Mật khẩu không đúng`);
    return isPasswordError;
  }

  if(!/[a-z]/.test(pass)) {
    showError(input, isSignUp ? `Mật khẩu cần có chữ cái thường` : `Mật khẩu không đúng`);
    return isPasswordError;
  }

  if(!/[A-Z]/.test(pass)) {
    showError(input,isSignUp ? `Mật khẩu cần có chữ in hoa` : `Mật khẩu không đúng`);
    return isPasswordError;
  }

  if(!/[0-9]/.test(pass)) {
    showError(input,isSignUp ? `Mật khẩu cần có chữ số` : `Mật khẩu không đúng`);
    return isPasswordError;
  }

  if(pass.length > max) {
    showError(input,`Mật khẩu không vượt qua ${max} ký tự`);
    return isPasswordError;
  }

  isPasswordError = false;
  showSuccess(input);
  return isPasswordError;
}

function checkConfirmPasswordError(password, cfPassword) {
  let isCfPasswordError = true;

  if (cfPassword.value == ``) {
    showError(cfPassword,`Không được để trống`);
    return isCfPasswordError;
  }

  if (password.value != cfPassword.value) {
    showError(cfPassword,`Mật khẩu không trùng khớp`);
    return isCfPasswordError;
  }

  isCfPasswordError = false;
  showSuccess(cfPassword);
  return isCfPasswordError;
}


function showLoginMessage() {
  alert("Vui lòng đăng nhập để tiếp tục mua sắm.");
}

//Hàm cập nhật phần đại diện của user + nút đăng xuất
//Cần sửa lại là chỉ làm trống logInUser chứ không phải xóa
function updateUI() {
  let userContainer = document.getElementById('user-container');
  let loginBtn = document.getElementById('btn-form');

  // Check if user is logged in
  if (isUserLoggedIn()) {
      let logInUser = getlogInUser();
      userContainer.innerHTML = `<p>Welcome, ${logInUser.username}!</p><button id="logout-btn">Đăng xuất</button>`;
      let logoutBtn = document.getElementById('logout-btn');
      logoutBtn.addEventListener('click', () => {
          localStorage.removeItem('logInUser');
          updateUI();
      });

      loginBtn.style.display = 'none';
  } else {
      userContainer.innerHTML = "";
      loginBtn.style.display = 'block';
  }
}
function requireLogin() {

  if (!isUserLoggedIn()) {
    showLoginMessage();
    return false;
  }

  return true;
}

//Đây là hàm sẽ nhận thông tin đăng nhập
function getlogInUser() {
  return JSON.parse(localStorage.getItem('logInUser'));
}
//Đây là hàm sẽ kiểm tra xem nếu như trong phần đăng kí user đã được đăng nhập chưa
function isUserLoggedIn() {
  return localStorage.getItem('logInUser') !== null;
}
//2 hàm trên được sử dụng trong updateUI (Nghĩa là cập nhật giao diện user khi đăng nhập)

updateUI();
//Hàm lưu thông tin của người dùng vào localStorage nếu đã đăng kí thành công
function saveUserInfo(username, email, password) {
  
  let users = getUsers();

  if (isEmailRegistered(email)) {
    showError(SU_email, "Email đã được đăng ký. ");
    return;
  }

  users.push({ username, email, password });
  localStorage.setItem('users', JSON.stringify(users));
  return true;
}
//Valid Sign-In
SI_form.addEventListener("submit", function(e) {
  e.preventDefault();
  let enteredUsername = SI_username.value;
  let enteredPassword = SI_password.value;

  if (checkAdminCredentials(enteredUsername, enteredPassword)) {
    window.location.href = "/website_html/admin.html";
  } else {
    let isUsername = checkUsernameError(SI_username, 5, 20, false);
    let isPassword = checkPasswordError(SI_password, 8, 15, false );

    let user = getUserByUsername(enteredUsername);

    if ( user  && user.password === enteredPassword) {
      let enteredEmail = user.email || '';
      
      localStorage.setItem('logInUser', JSON.stringify({
        username: enteredUsername,
        password: enteredPassword,
        email: enteredEmail,
      }));

      updateUI();

      window.location.href = "/website_html/main.html";
    } else {
      if (!user) {
        let parent = SI_username.parentElement;
        let small = parent.querySelector("small");

        parent.classList.add("error");
        SI_username.classList.add("error");
        SI_username.classList.remove("success");
        small.innerText = "Tên đăng nhập không tồn tại.";
      } else {
        let parent = SI_password.parentElement;
        let small = parent.querySelector("small");

        parent.classList.add("error");
        SI_password.classList.add("error");
        SI_password.classList.remove("success");
        small.innerText = "Sai mật khẩu.";
      }
    }
  }
});
function getUserByUsername(username) {
  let users = getUsers();
  return users.find(user => user.username.toLowerCase() === username.toLowerCase());
}
function getUserByEmail(email) {
  let users = getUsers();
  return users.find(user => user.email === email);
}
function checkAdminCredentials(username, password) {
  const adminUsername = "admin";
  const adminPassword = "admin123";

  return username === adminUsername && password === adminPassword;
}
//Valid Sign-Up
SU_form.addEventListener("submit",function(e){
  e.preventDefault();
  let isUsername = !checkUsernameError(SU_username, 5, 20, true);
  let isEmail = !checkEmailError(SU_email);
  let isPassword = !checkPasswordError(SU_password, 8, 15, true);
  let isCfPassword = !checkConfirmPasswordError(SU_password, SU_confirmPass);
  let isAgreed = checkAgree(SU_agree);

  if (isAgreed && isCfPassword && isPassword && isEmail && isUsername) {
    if (saveUserInfo(SU_username.value, SU_email.value, SU_password.value)) {
      showRegistrationSuccessMessage();
      
      document.getElementById("sign-up-password").value ='';
      document.getElementById("sign-up-confirm-pass").value ='';
      document.getElementById("sign-up-username").value ='';
      document.getElementById("sign-up-email").value ='';
      
      resetInputStyles('sign-up-username');
      resetInputStyles('sign-up-email');
      resetInputStyles('sign-up-password');
      resetInputStyles('sign-up-confirm-pass');
    }
  }
});
//hàm kiểm tra email
function isEmailRegistered(email) {
  let users = getUsers();
  return users.some(user => user.email.toLowerCase() === email.toLowerCase());
}
//Hàm nhận thông tin từ localStorage
function getUsers() {
  let users = JSON.parse(localStorage.getItem('users')) || [];
  return users;
}
//Check thông tin
function checkCredentials(username, password) {
  let users = getUsers();

  let user = users.find(user => user.username === username && user.password === password);

  if (user) {
    showSuccess(SI_username);
    showSuccess(SI_password);
    return true;
  } else {
    showError(SI_username, "Tên đăng nhập hoặc mật khẩu không đúng.");
    showError(SI_password, "Tên đăng nhập hoặc mật khẩu không đúng.");
    return false;
  }
}
//Hiện thông báo đăng kí thành công và hàm timeout
function showRegistrationSuccessMessage() {
  let registrationSuccessMessage = document.getElementById('registration-success-message');
  registrationSuccessMessage.classList.add('show');
  setTimeout(() => {
    registrationSuccessMessage.classList.remove('show');
  }, 3000);
}
//Xóa thông báo sau khi hoàn tất chức năng
function resetInputStyles(inputId) {
  
  let input = document.getElementById(inputId);
  let parent = input.parentElement;
  let small = parent.querySelector("small");

  parent.classList.remove("error");
  input.classList.remove("error", "success");
  small.innerText = '';
}
//Quen mat khau
function openPopup() {
  document.getElementById('popup').style.display = 'flex';
}

function closePopup() {
  document.getElementById('popup').style.display = 'none';

  document.getElementById('email').value = '';
  document.getElementById('new-password').value = '';
  document.getElementById('confirm-new-pass').value = '';

  resetInputStyles('email');
  resetInputStyles('new-password');
  resetInputStyles('confirm-new-pass');
}

function submitForm() {
  let emailInput = document.getElementById('email')
  let newPasswordInput = document.getElementById('new-password')
  let confirmPasswordInput = document.getElementById('confirm-new-pass')

  let email = emailInput.value;
  let newPassword = newPasswordInput.value;
  let confirmPassword = confirmPasswordInput.value;

  if (!isEmailRegistered(email)) {
    showError(emailInput, 'Sai thông tin email.');
    return;
  }

  let isEmailValid = !checkEmailError(document.getElementById('email'));
  let isNewPasswordValid = !checkPasswordError(document.getElementById('new-password'), 8, 15, true);
  let isConfirmPasswordValid = !checkConfirmPasswordError(document.getElementById('new-password'), document.getElementById('confirm-new-pass'));

  if (isEmailValid && isNewPasswordValid && isConfirmPasswordValid) {
    if (updatePasswordInLocalStorage(email, newPassword)) {
      showSuccess(emailInput);
      showSuccess(newPasswordInput);
      showSuccess(confirmPasswordInput);
      closePopup();
    } else {
      showError(emailInput, 'Có lỗi xảy ra khi cập nhật mật khẩu.');
    }
  }
}
function updatePasswordInLocalStorage(email, newPassword) {
  let users = getUsers();
  let user = users.find(user => user.email.toLowerCase() === email.toLowerCase());

  if (user) {
    user.password = newPassword;
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  }

  return false;
}