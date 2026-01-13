document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signupForm");

    if (!signupForm) return;

    signupForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirmPassword").value.trim();

        // Password match validation
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Mark registration as pending
        localStorage.setItem("continueRegistration", "true");

        // Redirect to home page
        window.location.href = "index.html";
    });

    const inputs = document.querySelectorAll("input[required]");

    inputs.forEach(input => {
        input.addEventListener("blur", function () {
            if (this.value.trim() === "") {
                this.style.borderColor = "#ff4444";
            } else {
                this.style.borderColor = "var(--light-gray)";
            }
        });

        input.addEventListener("input", function () {
            if (this.value.trim() !== "") {
                this.style.borderColor = "var(--light-gray)";
            }
        });
    });
});