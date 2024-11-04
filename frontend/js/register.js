document
  .getElementById("register-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementsByName("email")[0].value;
    const password = document.getElementsByName("password")[0].value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Email validation
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Password validation
    if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    const submitButton = document.querySelector("button[type='submit']");
    submitButton.disabled = true;
    submitButton.textContent = "Registering...";

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful!");
        document.getElementById("register-form").reset();
        // redirect:
        window.location.href = "/login";
      } else {
        const errorMessage =
          data.message ||
          data.msg ||
          "Unknown error occurred during registration.";
        alert("Registration failed: " + errorMessage);
        console.error(
          `Registration failed with status ${response.status}:`,
          data
        );
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed: " + error.message);
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Register";
    }
  });
