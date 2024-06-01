const { Movie } = require('../models');

class MovieRepository {
    static async getAll() {
        try {
            const data =  await Movie.findAll();
            // console.log(data)
            return data
        } catch (error) {
            throw error;
        }
    }

}

module.exports = MovieRepository;