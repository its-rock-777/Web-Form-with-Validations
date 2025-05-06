const form = document.getElementById('candidateForm');
const saveBtn = document.getElementById('saveBtn');
const phoneToggle = document.getElementById('phoneToggle');
const phoneGroup = document.getElementById('phoneGroup');
const successMsg = document.getElementById('successMsg');

const toast = document.createElement("div");
toast.id = "toast";
toast.style.position = "fixed";
toast.style.top = "20px";
toast.style.right = "20px";
toast.style.zIndex = "9999";
toast.style.padding = "15px 25px";
toast.style.borderRadius = "8px";
toast.style.fontSize = "14px";
toast.style.fontWeight = "600";
toast.style.color = "#fff";
toast.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
document.body.appendChild(toast);

['name', 'email', 'phone', 'password', 'about', 'language'].forEach(id => {
  document.getElementById(id).addEventListener('input', validateForm);
});
document.getElementById('language').addEventListener('change', validateForm);
phoneToggle.addEventListener('change', () => {
  phoneGroup.style.display = phoneToggle.checked ? 'block' : 'none';
  validateForm();
});

function validateForm() {
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  const password = document.getElementById('password');
  const about = document.getElementById('about');
  const language = document.getElementById('language');

  let valid = true;

  const nameRegex = /^[A-Za-z ]{2,}$/;
  if (!nameRegex.test(name.value.trim())) {
    setError(name, "Name must be at least 2 letters.");
    valid = false;
  } else clearError(name);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value.trim())) {
    setError(email, "Enter a valid email.");
    valid = false;
  } else clearError(email);

  if (phoneToggle.checked) {
    if (!/^\d{10}$/.test(phone.value.trim())) {
      setError(phone, "Phone must be exactly 10 digits.");
      valid = false;
    } else clearError(phone);
  } else {
    phone.value = "";
    clearError(phone);
  }

  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
  if (!passRegex.test(password.value)) {
    setError(password, "Password must have 8+ chars, upper, lower, digit, special char.");
    valid = false;
  } else clearError(password);

  if (about.value.trim().length < 50 || about.value.trim().length > 500) {
    setError(about, "About must be 50–500 characters.");
    valid = false;
  } else clearError(about);

  if (!language.value) valid = false;

  saveBtn.disabled = !valid;
}

function setError(input, message) {
  const error = input.nextElementSibling;
  error.textContent = message;
  error.style.display = "block";
}

function clearError(input) {
  const error = input.nextElementSibling;
  error.textContent = "";
  error.style.display = "none";
}

function showToast(message, type = "success") {
  toast.style.backgroundColor = type === "success" ? "#4caf50" : "#f44336";
  toast.textContent = message;
  toast.style.opacity = "1";
  setTimeout(() => {
    toast.style.transition = "opacity 0.5s ease";
    toast.style.opacity = "0";
  }, 3000);
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  validateForm();
  if (saveBtn.disabled) return;

  const originalText = saveBtn.textContent;
  saveBtn.innerHTML = `<span class="spinner"></span> Saving...`;
  saveBtn.disabled = true;

  const formData = {
    name: document.getElementById('name').value.trim(),
    email: document.getElementById('email').value.trim(),
    phone: phoneToggle.checked ? document.getElementById('phone').value.trim() : "",
    password: document.getElementById('password').value,
    lang: document.getElementById('language').value,
    about: document.getElementById('about').value.trim(),
  };

  try {
    const res = await fetch("https://admin-staging.whydonate.dev/whydonate/assignment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.status === 200) {
      showToast("Saved successfully!");
      form.reset();
      phoneGroup.style.display = "none";
      validateForm();
    } else {
      showToast("Submission failed.", "error");
      saveBtn.disabled = false;
    }
  } catch (err) {
    showToast("Network error occurred.", "error");
    saveBtn.disabled = false;
  } finally {
    saveBtn.innerHTML = originalText;
  }
});

validateForm();
