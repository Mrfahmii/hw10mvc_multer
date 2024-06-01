const { Movie } = require('../models');
const MovieRepository = require('../repositories/movie_repositories');

class MovieController {
    static async getSemua(req, res, next) {
        try {
            const data =  await MovieRepository.getAll();
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    static async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const movie = await Movie.findByPk(id);
            if (!movie) throw { name: 'notFound' };
            res.status(200).json(movie);
        } catch (err) {
            next(err);
        }
    }

    static async create(req, res, next) {
        try {
            const { name, category } = req.body;
            const newMovie = await Movie.create({ name, category });
            res.status(201).json(newMovie);
        } catch (error) {
            next(error);
        }
    }

    static async update(req, res, next) {
        try {
            const { id } = req.params;
            const { name, category } = req.body;
            const updateMovie = await Movie.update({ name, category }, { where: { id } });
            res.status(200).json(updateMovie);
        } catch (error) {
            next(error);
        }
    }

    static async delete(req, res, next) {
        try {
            const { id } = req.params;
            await Movie.destroy({ where: { id } });
            res.status(200).json({ message: 'Movie deleted successfully' });
        } catch (error) {
            next(error);
        }
    }

    static async upload(req, res, next) {
        try {
            const { file } = req;
            const { id } = req.params;
            console.log('File received in controller:', file);
            if (!file) {
                return res.status(400).json({ message: 'No file uploaded' });
            }
            const imageUrl = `http://localhost:3000/upload/${file.filename}`;
            await Movie.update({ photo: imageUrl }, { where: { id } });
            res.status(200).json({ message: 'Upload success', imageUrl });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = MovieController;
