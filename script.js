(() => {
  const demo = document.querySelector("#workflow-demo");
  const menuToggle = document.querySelector(".menu-toggle");
  const primaryNavigation = document.querySelector("#primary-navigation");
  const accentToggle = document.querySelector("[data-accent-toggle]");
  const film = document.querySelector('#portfolio-film');
  const filmPlay = document.querySelector('[data-film-play]');
  const filmStatus = document.querySelector('[data-film-status]');

  if (film && filmPlay) {
    const updateFilmButton = () => {
      filmPlay.textContent = film.ended ? 'Replay film ↻' : film.paused ? 'Play film ▶' : 'Pause film Ⅱ';
    };
    filmPlay.addEventListener('click', async () => {
      if (!film.paused) { film.pause(); return; }
      try {
        if (film.ended) film.currentTime = 0;
        await film.play();
      } catch {
        filmStatus.textContent = 'Use the player controls or download the MP4.';
      }
    });
    ['play', 'pause', 'ended'].forEach(event => film.addEventListener(event, updateFilmButton));
  }

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

  if (!demo) return;

  const choices = [...demo.querySelectorAll('[data-scenario-select]')];
  const panels = [...demo.querySelectorAll('[data-scenario-panel]')];
  const status = demo.querySelector('#workflow-status');

  const selectScenario = (scenario, { focus = false, announce = true } = {}) => {
    const selectedChoice = choices.find((choice) => choice.dataset.scenarioSelect === scenario);
    if (!selectedChoice) return;

    choices.forEach((choice) => {
      const selected = choice === selectedChoice;
      choice.classList.toggle('is-selected', selected);
      choice.setAttribute('aria-pressed', String(selected));
    });

    panels.forEach((panel) => {
      const selected = panel.dataset.scenarioPanel === scenario;
      panel.hidden = !selected;
      panel.classList.toggle('is-visible', selected);
    });

    if (focus) selectedChoice.focus();
    if (announce && status) {
      const label = selectedChoice.querySelector('.scenario-choice-copy strong')?.textContent?.trim() || 'Scenario';
      status.textContent = `${label} selected. The shared 0.8× seven-day reported ROAS calls for a different next question in this context.`;
    }
  };

  choices.forEach((choice) => {
    choice.addEventListener('click', () => selectScenario(choice.dataset.scenarioSelect));
    choice.addEventListener('keydown', (event) => {
      const currentIndex = choices.indexOf(choice);
      let destination = currentIndex;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') destination = (currentIndex + 1) % choices.length;
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') destination = (currentIndex - 1 + choices.length) % choices.length;
      else if (event.key === 'Home') destination = 0;
      else if (event.key === 'End') destination = choices.length - 1;
      else return;

      event.preventDefault();
      const nextChoice = choices[destination];
      if (nextChoice) selectScenario(nextChoice.dataset.scenarioSelect, { focus: true });
    });
  });

  const initialScenario = choices.find((choice) => choice.getAttribute('aria-pressed') === 'true')?.dataset.scenarioSelect || choices[0]?.dataset.scenarioSelect;
  if (initialScenario) selectScenario(initialScenario, { announce: false });
})();
