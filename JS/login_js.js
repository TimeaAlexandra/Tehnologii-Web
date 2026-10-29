let loginForm = document.getElementById("loginForm");
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");

loginForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    // Format UVT: prenume.nume[max 2 cifre]@e-uvt.ro
    const emailRegex = /^[a-zA-Z]+\.[a-zA-Z]+\d{0,2}@e-uvt\.ro$/i;

    // Parola: minim 7 caractere, litere mari, mici, cifre si caracter special
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{7,}$/;

    if (!emailRegex.test(email)) {
        alert("Adresa de email trebuie sa respecte formatul UVT: prenume.nume[optional 2 cifre]@e-uvt.ro");
        return;
    }

    if (!passwordRegex.test(password)) {
        alert("Parola trebuie sa contina cel putin 7 caractere, inclusiv litere mari, mici, cifre si un caracter special!");
        return;
    }

    alert("Login reusit!");
    window.location.href = "home.html";
});