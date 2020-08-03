const fs = require('fs');
const request = require('request-promise');

const readMovieFilePromise = (fileName) => {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, (error, data) => {
            if (error) reject(error);
            resolve(data);
        })

    })
}


const getAllMovies = async () => {
    try {
        let query = await readMovieFilePromise('movie.txt');
        let url = 'https://api.themoviedb.org/3/search/movie?api_key=19ad416db5f018cc8b2482a686deb0e4&query=' + query.toString();

        await request(url, { timeout: 0 })
            .then(body => {
                let movies = JSON.parse(body);

                movies.results.forEach((movie) => {
                    console.log(movie.original_title);
                });
            });
    } catch (error) {
        console.log(error);
    }

}

getAllMovies();