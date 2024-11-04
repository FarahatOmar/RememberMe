document
  .getElementById("login-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Clear previous error message
    document.getElementById("login-error").innerText = "";

    // Basic validation for empty fields
    if (!email || !password) {
      document.getElementById("login-error").innerText =
        "Please fill in all fields.";
      return;
    }

    const loginButton = document.querySelector("button[type='submit']");
    loginButton.disabled = true;
    loginButton.textContent = "Logging in...";

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token); // Store JWT token
        window.location.href = "./index.html"; // Redirect on successful login
      } else {
        const error =
          response.status === 401
            ? await response.json()
            : { message: "An unexpected error occurred. Please try again." };
        document.getElementById("login-error").innerText = error.message;
      }
    } catch (err) {
      console.error("Login failed:", err);
      document.getElementById("login-error").innerText =
        "Login failed. Please try again.";
    } finally {
      loginButton.disabled = false;
      loginButton.textContent = "Login";
    }
  });
