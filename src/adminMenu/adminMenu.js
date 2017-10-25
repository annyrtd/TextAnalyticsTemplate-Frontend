class CustomAdminMenu {
  constructor() {
    const settingsButton = document.getElementById('ta-menu--settings');
    const settingsContainer = document.querySelector('.report-settings-options');

    settingsButton.onclick = function () {
      if (settingsContainer.classList.contains('hidden-menu')) {
        settingsContainer.classList.remove('hidden-menu')
      } else {
        settingsContainer.classList.add('hidden-menu');
      }
    };

    window.onclick = function (e) {
      if (e.target === settingsContainer || e.target === settingsButton) {
        e.stopPropagation();
        return;
      }

      settingsContainer.classList.add('hidden-menu');
    };
  }
}

export default CustomAdminMenu;
