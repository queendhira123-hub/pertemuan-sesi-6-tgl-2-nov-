/* =========================================================
   script.js - Logika JavaScript Tugas Mandiri
   Fitur:
   1. Validasi form      -> fungsi validateName/Email/Password
   2. Manipulasi DOM     -> ubah teks (sapaan, pesan) & ubah style (meter, border)
   3. Event handling     -> click (tombol) & keyup (ketik di input)
   ========================================================= */

// ---------- Ambil elemen dari HTML ----------
const form = document.getElementById("registerForm");
const namaInput = document.getElementById("nama");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const namaError = document.getElementById("namaError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

const greeting = document.getElementById("greeting");
const greetingSub = document.getElementById("greetingSub");
const meterBar = document.getElementById("meterBar");
const meterText = document.getElementById("meterText");

const togglePasswordBtn = document.getElementById("togglePassword");
const themeToggleBtn = document.getElementById("themeToggle");
const resetBtn = document.getElementById("resetBtn");
const successBox = document.getElementById("successBox");
const successTitle = document.getElementById("successTitle");
const successText = document.getElementById("successText");

// ---------- 1. VALIDASI FORM ----------
// Setiap fungsi mengembalikan pesan error, atau "" jika input sudah benar.

function validateName(value) {
  if (value.trim() === "") return "Nama tidak boleh kosong.";
  return "";
}

function validateEmail(value) {
  // Pola sederhana: ada teks, tanda @, domain, titik, lalu akhiran
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (value.trim() === "") return "Email tidak boleh kosong.";
  if (!emailPattern.test(value)) return "Format email belum valid, contoh: nama@kampus.ac.id.";
  return "";
}

function validatePassword(value) {
  if (value.length < 8) return "Password minimal 8 karakter (sekarang " + value.length + ").";
  return "";
}

// Menampilkan hasil validasi pada satu field (ubah teks + ubah style)
function showFieldState(input, errorEl, message) {
  errorEl.textContent = message;                 // ubah teks
  input.classList.toggle("invalid", message !== ""); // ubah style
  input.classList.toggle("valid", message === "" && input.value !== "");
}

// ---------- 2. MANIPULASI DOM ----------

// Menghitung skor kekuatan password (0-4)
function getPasswordScore(value) {
  let score = 0;
  if (value.length >= 8) score++;
  if (/[A-Z]/.test(value) && /[a-z]/.test(value)) score++;
  if (/\d/.test(value)) score++;
  if (/[^A-Za-z0-9]/.test(value)) score++;
  return score;
}

// Mengubah lebar & warna bar serta teks kekuatan password
function updateMeter(value) {
  const levels = [
    { label: "belum diisi", color: "var(--danger)", width: "0%" },
    { label: "lemah", color: "var(--danger)", width: "25%" },
    { label: "cukup", color: "var(--warn)", width: "50%" },
    { label: "baik", color: "var(--ok)", width: "75%" },
    { label: "kuat", color: "var(--ok)", width: "100%" }
  ];
  const level = value === "" ? levels[0] : levels[Math.max(getPasswordScore(value), 1)];

  meterBar.style.width = level.width;            // ubah style
  meterBar.style.background = level.color;       // ubah style
  meterText.textContent = "Kekuatan password: " + level.label; // ubah teks
}

// Mengubah sapaan di sisi kiri mengikuti nama yang diketik
function updateGreeting(name) {
  const cleanName = name.trim();
  if (cleanName === "") {
    greeting.textContent = "Halo, calon peserta!";
    greetingSub.textContent = "Isi formulir di samping untuk mengamankan satu kursi di Workshop Web Dasar.";
  } else {
    greeting.textContent = "Halo, " + cleanName + "!";
    greetingSub.textContent = "Tinggal lengkapi email dan password, kursimu hampir siap.";
  }
}

// ---------- 3. EVENT HANDLING ----------

// Event KEYUP: validasi langsung saat mengetik
namaInput.addEventListener("keyup", function () {
  updateGreeting(namaInput.value);
  showFieldState(namaInput, namaError, validateName(namaInput.value));
});

emailInput.addEventListener("keyup", function () {
  showFieldState(emailInput, emailError, validateEmail(emailInput.value));
});

passwordInput.addEventListener("keyup", function () {
  updateMeter(passwordInput.value);
  showFieldState(passwordInput, passwordError, validatePassword(passwordInput.value));
});

// Event CLICK: tampilkan / sembunyikan password
togglePasswordBtn.addEventListener("click", function () {
  const isHidden = passwordInput.type === "password";
  passwordInput.type = isHidden ? "text" : "password";
  togglePasswordBtn.textContent = isHidden ? "Sembunyikan" : "Tampilkan";
});

// Event CLICK: ganti mode terang / gelap
themeToggleBtn.addEventListener("click", function () {
  const isDark = document.body.classList.toggle("dark");
  themeToggleBtn.textContent = isDark ? "Mode terang" : "Mode gelap";
});

// Event SUBMIT: cek semua field sekaligus
form.addEventListener("submit", function (event) {
  event.preventDefault(); // cegah halaman reload

  const namaMsg = validateName(namaInput.value);
  const emailMsg = validateEmail(emailInput.value);
  const passwordMsg = validatePassword(passwordInput.value);

  showFieldState(namaInput, namaError, namaMsg);
  showFieldState(emailInput, emailError, emailMsg);
  showFieldState(passwordInput, passwordError, passwordMsg);

  // Jika masih ada error, fokus ke field pertama yang salah
  if (namaMsg || emailMsg || passwordMsg) {
    const firstInvalid = form.querySelector(".invalid");
    if (firstInvalid) firstInvalid.focus();
    return;
  }

  // Semua valid: sembunyikan form, tampilkan pesan sukses
  successTitle.textContent = "Pendaftaran berhasil";
  successText.textContent = namaInput.value.trim() + ", konfirmasi dikirim ke " + emailInput.value.trim() + ".";
  form.hidden = true;
  successBox.hidden = false;
});

// Event CLICK: kembali ke formulir kosong
resetBtn.addEventListener("click", function () {
  form.reset();
  [namaInput, emailInput, passwordInput].forEach(function (input) {
    input.classList.remove("valid", "invalid");
  });
  namaError.textContent = "";
  emailError.textContent = "";
  passwordError.textContent = "";
  updateMeter("");
  updateGreeting("");
  form.hidden = false;
  successBox.hidden = true;
});
