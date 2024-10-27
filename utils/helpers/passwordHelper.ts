import CryptoJS from "crypto-js";

export const hashPassword = (password: string) => {
  try {
    // Here I wanted to create a hashed password using bcrypt, but I had some errors, while setting up in the client-side environment, after spending some time on these, I decided  to move forward and use MD5 hashing instead
    const hashedPassword = CryptoJS.MD5(password).toString();
    return hashedPassword;
  } catch (err) {
    throw err;
  }
};
