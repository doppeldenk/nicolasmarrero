function setTheme(mode) {
    if (mode === 'dark') {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light';
    }
}

function handleThemeToggle() {
    const currentTheme = localStorage.theme === 'dark' ? 'dark' : 'light';
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
}

window.handleThemeToggle = handleThemeToggle;
