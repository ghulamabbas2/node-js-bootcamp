const express = require('express');
const app = express();
const path = require('path');
const request = require('request');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/results', (req, res)=> {

    let query = req.query.search;

    request('https://api.themoviedb.org/3/search/movie?api_key=19ad416db5f018cc8b2482a686deb0e4&query='+query, (error, response, body) => {
        if(error) {
            console.log(error);
        }

        let data = JSON.parse(body);
        res.render('movies', {data:data, searchQuery:query});

    });

});

app.get('/search', (req,res)=> {
    res.render('search');
});

app.listen(3000, ()=>{
    console.log('Server started at port 3000.');
});