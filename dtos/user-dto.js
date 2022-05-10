module.exports = class UserDto {
  email
  id
  roles
  username

  constructor(model) {
    this.email = model.email
    this.id = model._id
    this.roles = model.roles
    this.username = model.username
  }
}