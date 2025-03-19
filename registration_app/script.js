function togglePassword(id) {
    let input = document.getElementById(id);
    if (input.type === "password") {
        input.type = "text";
    } else {
        input.type = "password";
    }
}

document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault(); 

    let email = document.querySelector("input[name='email']").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirm_password").value;

    if (password !== confirmPassword) {
        document.getElementById("message").className = "error";
        document.getElementById("message").innerText = "Passwords do not match!";
        return;
    }


    fetch("register.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&confirm_password=${encodeURIComponent(confirmPassword)}`,
    })
    .then(response => response.text())
    .then(data => {
        if (data.includes("Successfully Registered!")) {
            document.getElementById("message").className = "success";
            document.getElementById("message").innerText = "Successfully Registered!";
        } else if (data.includes("Email already exists!")) {
            document.getElementById("message").className = "error";
            document.getElementById("message").innerText = "Email already exists!";
        }
    })
    .catch(error => {
        console.error("Error:", error);
    });
});