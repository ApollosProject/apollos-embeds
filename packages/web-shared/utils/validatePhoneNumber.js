function validatePhoneNumber(phone) {
  if (typeof phone !== 'string' || !phone.length) {
    return false;
  }

  const match = phone.match(/^[0-9]{10,10}$/);
  if (!match) {
    return false;
  }
  return match.length === 1;
}

export default validatePhoneNumber;
