module.exports = { toggleTheme, chooseTheme, detectTheme }

function toggleTheme() {
  let root = $(':root');

  if (root.hasClass('theme-dark')) {
    root.removeClass('theme-dark');
    return 'Light';
  } else {
    root.addClass('theme-dark');
    return 'Dark';
  }
}

function chooseTheme(theme) {
  let root = $(':root');

  if (theme === 'Dark') {
    if (!root.hasClass('theme-dark')) {
      root.addClass('theme-dark');
    }
  } else if (theme === 'Light') {
    if (root.hasClass('theme-dark')) {
      root.removeClass('theme-dark');
    }
  }
}

function detectTheme() {
  if (isDark()) { return 'Dark'; }
  else if (isLight() || isImpartial()) { return 'Light'; }
}

function isDark() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function isLight() {
  return window.matchMedia('(prefers-color-scheme: light)').matches;
}

function isImpartial() {
  return window.matchMedia('(prefers-color-scheme: no-preference)').matches;
}
