document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     DARK MODE
  ========================= */

  const toggleBtn = document.getElementById("theme-toggle");
  const root = document.documentElement;

  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    root.setAttribute("data-theme", "dark");
    toggleBtn.textContent = "☀️";
  } else {
    toggleBtn.textContent = "🌙";
  }

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


  /* =========================
     GITHUB PROJECTS
  ========================= */

  const container = document.getElementById("projects-container");
  const username = "omERdem555";
  const branch = "master";
  const fallbackImage = "assets/images/default-project.jpg";

  fetch(`https://api.github.com/users/${username}/repos?sort=updated`)
    .then(res => res.json())
    .then(repos => {

      const filteredRepos = repos.filter(repo =>
        !repo.fork &&
        !repo.private &&
        repo.description
      );

      filteredRepos.forEach(repo => {

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

        container.appendChild(card);
      });

    })
    .catch(err => {
      container.innerHTML = "<p>Projects could not be loaded.</p>";
      console.error(err);
    });

});
