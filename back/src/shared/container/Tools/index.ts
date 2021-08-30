function generateKey() {
  const chars =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const string_length = 16;
  let randomstring = '';
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < string_length; i++) {
    const rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum, rnum + 1);
  }

  return randomstring;
}

function validPassword(newPassword: string) {
  const minNumberofChars = 8;
  const maxNumberofChars = 22;
  const regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  if (
    newPassword.length < minNumberofChars ||
    newPassword.length > maxNumberofChars
  ) {
    return false;
  }
  if (!regularExpression.test(newPassword)) {
    return false;
  }
  return true;
}

export { generateKey, validPassword };
