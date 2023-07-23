export default function createUpdateObject(user, oldUser) {
  const data = {};
  if (user.email !== oldUser.email) {
    data.email = user.email;
  }
  if (user.password !== '') {
    data.password = user.password;
  }
  if (user.name !== oldUser.name) {
    data.name = user.name;
  }
  if (user.phone !== oldUser.phone) {
    data.phone = user.phone;
  }
  if (user.birthYear !== oldUser.birthYear) {
    data.birthYear = user.birthYear;
  }
  if (Object.keys(data).length == 0) return false;
  return data;
}
