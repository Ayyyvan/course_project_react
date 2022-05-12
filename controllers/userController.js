const userService = require("../service/user-service")

class userController {
	async getById(req, res, next) {
    try{
      const user = await userService.getById(req.params.id)
      res.json(user)
    } catch(e){
      next(e)
    }
  }

	async getAll(req, res, next) {
    try{
      const users = await userService.getAll()
      res.json(users)
    } catch(e){
      next(e)
    }
  }
}
module.exports = new userController()