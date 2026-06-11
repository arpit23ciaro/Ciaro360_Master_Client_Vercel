// export const baseURL = "http://192.168.0.236:4000";
// export const baseURL = process.env.REACT_APP_API_BASE_URL_LOCAL;
export const baseURL = process.env.REACT_APP_API_BASE_URL_SERVER;
// export const baseURL = "https://r43lnp96-4444.inc1.devtunnels.ms/";
// export const baseURL = process.env.REACT_APP_API_BASE_URL_AZURE;

export const RegExp =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/;

export const regex = {
  uppercase: /(?=.*[A-Z])/,
  lowercase: /(?=.*[a-z])/,
  number: /(?=.*[0-9])/,
  specialChar: /(?=.*[!@#$%^&*()_-])/,
  // specialChar: /(?=.*[!@#$%^&*(),.?":{}|<>])/,
};

export const EmailRegExp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
