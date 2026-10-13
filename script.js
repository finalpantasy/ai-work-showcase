(() => {
  const menuToggle = document.querySelector(".menu-toggle");
  const primaryNavigation = document.querySelector("#primary-navigation");
  const accentToggle = document.querySelector("[data-accent-toggle]");

  if (menuToggle && primaryNavigation) {
    const closeMenu = ({ restoreFocus = false } = {}) => {
      menuToggle.setAttribute("aria-expanded", "false");
      primaryNavigation.classList.remove("is-open");
      if (restoreFocus) menuToggle.focus();
    };

    menuToggle.addEventListener("click", () => {
      const willOpen = menuToggle.getAttribute("aria-expanded") !== "true";
      menuToggle.setAttribute("aria-expanded", String(willOpen));
      primaryNavigation.classList.toggle("is-open", willOpen);
    });

    primaryNavigation.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
        event.preventDefault();
        closeMenu({ restoreFocus: true });
      }
    });
  }

  if (accentToggle) {
    accentToggle.addEventListener("click", () => {
      const useAcid = document.body.dataset.accent !== "acid";
      if (useAcid) document.body.dataset.accent = "acid";
      else delete document.body.dataset.accent;
      accentToggle.setAttribute("aria-pressed", String(useAcid));
      accentToggle.querySelector(".accent-toggle-label").textContent = useAcid ? "Acid yellow" : "Electric cobalt";
    });
  }

})();
