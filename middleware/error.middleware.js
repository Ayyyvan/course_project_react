const ErrorDto = require('../dtos/error-dto')

module.exports = function(err, req, res, next){
	console.log(err instanceof ErrorDto);
	if (err instanceof ErrorDto){
		return res.status(err.status).json({message: err.message, errors: err.errors})
	}
	return res.status(500).json({message: 'Something wrong'})
}