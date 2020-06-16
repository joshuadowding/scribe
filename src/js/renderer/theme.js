module.exports = { toggleTheme, detectTheme }

function toggleTheme() {
  if ($(':root').hasClass('theme-dark')) {
    $(':root').removeClass('theme-dark');
  } else {
    $(':root').addClass('theme-dark');
  }
}

function detectTheme() {
  let isNotSupported = !isDark() && !isLight() && !isImpartial();

  if (!isNotSupported) {
    if (isDark()) {
      $(':root').addClass('theme-dark');
    } else if (isLight() || isImpartial()) {
      if ($(':root').hasClass('theme-dark')) {
        $(':root').removeClass('theme-dark');
      }
    }
  } else {
    console.warn('Warning: theme detection is not supported.');
  }
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
