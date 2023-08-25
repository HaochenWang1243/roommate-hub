// passwordHolderAPI.js

module.exports = {
  readPasswords,
  readIdCount,
  queryPasswordInfo,
  deletePassword,
  createPassword,
  updatePassword,
};

/**
 * readPasswords handles populating the password information commonly
 * shared by all roommates in a group. First function called within the
 * init function when initializing the passwordHolder page.
 * @returns {Array<object>} with the JSON data of each password.
 */
function readPasswords() {
  if (localStorage.getItem("PasswordHolderData") === null) {
    const firstPasswordList = {
      Passwords: [],
      idPasswordCount: 0,
    };
    localStorage.setItem(
      "PasswordHolderData",
      JSON.stringify(firstPasswordList)
    );
    return JSON.parse(localStorage.getItem("PasswordHolderData")).Passwords;
  } else {
    return JSON.parse(localStorage.getItem("PasswordHolderData")).Passwords;
  }
}

/**
 * queryPasswordInfo handles providing information for a specifc password
 * in the localStorage.
 * @param {Int} id that indicates which password we are trying to query
 * @returns {Object} with the JSON data of the specific password.
 */
function queryPasswordInfo(id) {
  const apiData = JSON.parse(localStorage.getItem("PasswordHolderData"));
  for (let i = 0; i < apiData.Passwords.length; i++) {
    if (apiData.Passwords[i].id === id) {
      return apiData.Passwords[i];
    }
  }
}

/**
 * readIdCount handles providing information for which id number we are on.
 * @returns {Int} with the latest id assigned to a card.
 */
function readIdCount() {
  if (localStorage.getItem("PasswordHolderData") === null) {
    return 0;
  }
  return JSON.parse(localStorage.getItem("PasswordHolderData")).idPasswordCount;
}

/**
 * createPassword handles adding a new commonly shared password into the
 * localStorage so that we can store a new password for the rooommate group
 * Establishes the data we are tracking for a commonly shared password.
 * @param {Object} formData provided by JS file that gives us the data for
 * fields of a new password.
 */
function createPassword(formData) {
  const apiData = JSON.parse(localStorage.getItem("PasswordHolderData"));
  const newPassword = {
    id: apiData.idPasswordCount,
    key: formData.key,
    username: formData.username,
    password: formData.password,
  };
  apiData.idPasswordCount += 1;
  apiData.Passwords.push(newPassword);
  localStorage.setItem("PasswordHolderData", JSON.stringify(apiData));
}

/**
 * updatePassword handles editing an existing commonly shared password and
 * putting the changes into the localStorage so that we can store an
 * updated password for the rooommate group.
 * @param {Object} formData provided by JS file that gives us the fields
 * @param {Int} id that indicates which password we are trying to update
 */
function updatePassword(id, formData) {
  const apiData = JSON.parse(localStorage.getItem("PasswordHolderData"));
  for (let i = 0; i < apiData.Passwords.length; i++) {
    if (apiData.Passwords[i].id === id) {
      apiData.Passwords[i].key = formData.key;
      apiData.Passwords[i].username = formData.username;
      apiData.Passwords[i].password = formData.password;
      break;
    }
  }
  localStorage.setItem("PasswordHolderData", JSON.stringify(apiData));
}

/**
 * deletePassword handles deleting an existing commonly shared password and
 * putting the changes into the localStorage so that we can remove a
 * password for the rooommate group.
 * @param {Int} id that indicates which password we are trying to delete
 */
function deletePassword(id) {
  const apiData = JSON.parse(localStorage.getItem("PasswordHolderData"));
  for (let i = 0; i < apiData.Passwords.length; i++) {
    if (apiData.Passwords[i].id === id) {
      apiData.Passwords.splice(i, 1);
      break;
    }
  }
  localStorage.setItem("PasswordHolderData", JSON.stringify(apiData));
}
