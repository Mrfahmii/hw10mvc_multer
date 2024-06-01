const errorHandler = (err, req, res, next) => {
    if(err.name === 'notFound') {
        res.status(404).json({message: 'Not Found '})
    }

}

module.exports = errorHandler;