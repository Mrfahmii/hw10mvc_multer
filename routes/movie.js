const express = require('express');
const router = express.Router();
const MovieController = require('../controller/movie_controller');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

const fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log('Setting upload destination');
        cb(null, path.join(__dirname, '../upload'));
    },
    filename: function (req, file, cb) {
        console.log('Setting filename');
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: fileStorage });

router.get('/', (req, res) => {
    console.log('GET /movies');
    MovieController.getSemua(req, res);
});

router.get('/:id', (req, res) => {
    console.log('GET /movies/:id');
    MovieController.getOne(req, res);
});

router.post('/', auth, (req, res) => {
    console.log('POST /movies');
    MovieController.create(req, res);
});

router.put('/:id', auth, (req, res) => {
    console.log('PUT /movies/:id');
    MovieController.update(req, res);
});

router.delete('/:id', auth, (req, res) => {
    console.log('DELETE /movies/:id');
    MovieController.delete(req, res);
});

// router.post('/:id/upload', (req, res, next) => {
//     console.log('POST /movies/:id/upload - before multer');
//     next();
// }, upload.single('file'), (req, res, next) => {
//     console.log('POST /movies/:id/upload - after multer');
//     console.log('File:', req.file);
//     next();
// }, MovieController.upload);


router.post('/:id/upload', (req, res, next) => {
    console.log('POST /movies/:id/upload - before multer');
    next();
}, upload.single('foto'), (err, req, res, next) => {
    if (err) {
        console.error('Error handling upload:', err);
        return res.status(500).json({ message: 'Error handling upload', error: err.message });
    }
    console.log('POST /movies/:id/upload - after multer');
    console.log('File:', req.file);
    next();
}, MovieController.upload);


module.exports = router;
