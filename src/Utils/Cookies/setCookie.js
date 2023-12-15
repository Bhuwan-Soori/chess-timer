function setCookie(name, value, options = {}) {
  options = {
    path: "/",
    samesite: "strict",
    // add other defaults here if necessary
    ...options,
  };
  let updatedCookie =
    encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

export default setCookie;
