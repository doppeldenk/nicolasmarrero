function setTheme(mode) {
    if (mode === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', mode);
}

function handleThemeToggle() {
    const currentTheme = localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
}

// Re-apply theme after View Transitions navigation
document.addEventListener('astro:page-load', () => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
});

window.handleThemeToggle = handleThemeToggle;
