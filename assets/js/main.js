document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     DARK MODE
  ========================= */

  const toggleBtn = document.getElementById("theme-toggle");
  const root = document.documentElement;
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    root.setAttribute("data-theme", "dark");
    if (toggleBtn) toggleBtn.textContent = "☀️";
  } else {
    if (toggleBtn) toggleBtn.textContent = "🌙";
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const isDark = root.getAttribute("data-theme") === "dark";

      if (isDark) {
        root.removeAttribute("data-theme");
        localStorage.setItem("theme", "light");
        toggleBtn.textContent = "🌙";
      } else {
        root.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
        toggleBtn.textContent = "☀️";
      }
    });
  }


  /* =========================
     GITHUB PROJECTS
  ========================= */

  const projectsContainer = document.getElementById("projects-container");
  const liveContainer = document.getElementById("live-projects-container");

  const username = "omERdem555";
  const branch = "master";
  const fallbackImage = "assets/images/default-project.jpg";

  fetch(`https://api.github.com/users/${username}/repos?sort=updated`)
    .then(res => {
      if (!res.ok) {
        throw new Error("GitHub API request failed");
      }
      return res.json();
    })
    .then(repos => {

      if (!Array.isArray(repos)) {
        throw new Error("Invalid GitHub API response");
      }

      if (projectsContainer) projectsContainer.innerHTML = "";
      if (liveContainer) liveContainer.innerHTML = "";

      repos.forEach(repo => {

        const isValidRepo =
          !repo.fork &&
          !repo.private &&
          !repo.archived;

        /* ---------- PROJECT CARDS ---------- */

        if (
          isValidRepo &&
          projectsContainer
        ) {

          const imageUrl =
            `https://raw.githubusercontent.com/${username}/${repo.name}/${branch}/preview.jpeg`;

          const card = document.createElement("a");
          card.href = repo.html_url;
          card.target = "_blank";
          card.rel = "noopener noreferrer";
          card.className = "project-card";

          card.innerHTML = `
            <img 
              src="${imageUrl}" 
              alt="${repo.name}"
              onerror="this.onerror=null;this.src='${fallbackImage}';"
            >
            <div class="project-card-content">
              <h3>${repo.name}</h3>
              <p>${repo.description}</p>
            </div>
          `;

          projectsContainer.appendChild(card);
        }

        /* ---------- LIVE PROJECTS ---------- */

        if (
          isValidRepo &&
          repo.homepage &&
          repo.homepage.trim() !== "" &&
          liveContainer
        ) {

          const link = document.createElement("a");
          link.href = repo.homepage.trim();
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          link.className = "live-project-item";
          link.textContent = repo.name;

          liveContainer.appendChild(link);
        }

      });

    })
    .catch(error => {
      console.error("GitHub fetch error:", error);

      if (projectsContainer) {
        projectsContainer.innerHTML = "<p>Projects could not be loaded.</p>";
      }

      if (liveContainer) {
        liveContainer.innerHTML = "<p>Live projects could not be loaded.</p>";
      }
    });

});
