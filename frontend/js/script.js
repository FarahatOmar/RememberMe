document.addEventListener("DOMContentLoaded", () => {
  const nameForm = document.getElementById("name-form");
  const nameList = document.getElementById("name-list");
  const token = localStorage.getItem("token");
  const searchInput = document.getElementById("search-input");

  async function loadSavedNames(searchQuery = "") {
    try {
      const response = await fetch(
        `/api/names?search=${encodeURIComponent(searchQuery)}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();

      if (response.ok) {
        renderNames(data.names);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error loading names:", error);
    }
  }

  function renderNames(names) {
    nameList.innerHTML = "";
    names.forEach((name) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div class="name-content">
          <strong>Name:</strong> ${name.name} <br>
          <strong>Location:</strong> ${name.location} <br>
          <strong>Unique Detail:</strong> ${name.uniqueDetail}
        </div>
        <div class="button-container">
          <button class="edit-button" data-id="${name._id}">Edit</button>
          <button class="delete-button" data-id="${name._id}">Delete</button>
        </div>`;
      nameList.appendChild(li);
    });

    document.querySelectorAll(".edit-button").forEach((button) => {
      button.addEventListener("click", editName);
    });
    document.querySelectorAll(".delete-button").forEach((button) => {
      button.addEventListener("click", deleteName);
    });
  }

  document.getElementById("logout-button").addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  });

  async function handleAdd(event) {
    event.preventDefault();
    const name = document.getElementById("name-input").value.trim();
    const location = document.getElementById("where-input").value.trim();
    const uniqueDetail = document.getElementById("unique-input").value.trim();

    try {
      const response = await fetch("/api/names", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, location, uniqueDetail }),
      });
      const result = await response.json();
      if (response.ok) {
        alert("Name added successfully!");
        loadSavedNames();
        nameForm.reset();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error saving name:", error);
    }
  }

  nameForm.addEventListener("submit", handleAdd);

  async function editName(event) {
    const id = event.target.dataset.id;
    const li = event.target.closest("li");
    const nameContent = li.querySelector(".name-content");

    const nameMatch = nameContent.innerHTML.match(
      /<strong>Name:<\/strong> (.*?) <br>/
    );
    const locationMatch = nameContent.innerHTML.match(
      /<strong>Location:<\/strong> (.*?) <br>/
    );
    const uniqueDetailMatch = nameContent.innerHTML.match(
      /<strong>Unique Detail:<\/strong>\s*(.*?)\s*(?:<\/div>|$)/
    );

    if (!nameMatch || !locationMatch || !uniqueDetailMatch) {
      console.error("Failed to match name details.");
      alert("Unable to edit this entry. Please try again.");
      return;
    }

    const nameInput = document.getElementById("name-input");
    const whereInput = document.getElementById("where-input");
    const uniqueInput = document.getElementById("unique-input");

    nameInput.value = nameMatch[1];
    whereInput.value = locationMatch[1];
    uniqueInput.value = uniqueDetailMatch[1];

    nameForm.removeEventListener("submit", handleAdd);
    nameForm.addEventListener("submit", (event) => handleUpdate(event, id), {
      once: true,
    });
  }

  async function handleUpdate(event, id) {
    event.preventDefault();
    const name = document.getElementById("name-input").value.trim();
    const location = document.getElementById("where-input").value.trim();
    const uniqueDetail = document.getElementById("unique-input").value.trim();

    try {
      const response = await fetch(`/api/names/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, location, uniqueDetail }),
      });
      const result = await response.json();
      if (response.ok) {
        alert("Name updated successfully!");
        loadSavedNames();
        nameForm.reset();

        nameForm.removeEventListener("submit", handleUpdate);
        nameForm.addEventListener("submit", handleAdd);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error updating name:", error);
    }
  }

  async function deleteName(event) {
    const id = event.target.dataset.id;
    if (confirm("Are you sure you want to delete this name?")) {
      try {
        const response = await fetch(`/api/names/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        const result = await response.json();
        if (response.ok) {
          alert("Name deleted successfully!");
          loadSavedNames();
        } else {
          alert(result.message);
        }
      } catch (error) {
        console.error("Error deleting name:", error);
      }
    }
  }

  loadSavedNames();

  searchInput.addEventListener("input", (event) => {
    loadSavedNames(event.target.value.trim());
  });
});

function confirmLogout() {
  if (confirm("Are you sure you want to logout?")) {
    // Add logout functionality here
    localStorage.removeItem("token");
    window.location.href = "./login.html";
  }
}
