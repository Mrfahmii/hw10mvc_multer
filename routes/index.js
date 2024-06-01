const express = require('express')
const router = express.Router()
const userRouter = require('./user')
const movieRouter = require('./movie')

router.use('/users', userRouter)
router.use((req, res, next) => {
    console.log('Request URL:', req.originalUrl);
    next();
  });
router.use('/movies', movieRouter)

module.exports = router;