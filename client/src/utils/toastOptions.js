export function successOption(theme = 'light') {
  return {
    position: 'bottom-right',
    hideProgressBar: true,
    autoClose: 1000,
    theme,
  };
}

export function errorOption(theme = 'light') {
  return {
    position: 'bottom-right',
    hideProgressBar: true,
    autoClose: 2000,
    theme,
  };
}
