window.API_BASE_URL = "https://londyn-muskier-esteban.ngrok-free.dev";

window.apiFetch = (endpoint, options = {}) => {
  options.headers = options.headers || {};

  options.headers["ngrok-skip-browser-warning"] = "true";

  const fullUrl = `${window.API_BASE_URL}${endpoint}`;

  return fetch(fullUrl, options);
};
