




import express from 'express';
import axios from 'axios';

const app = express();

// app.use(express.static(__dirname + '/'));
// res.sendFile(__dirname + '/index.html');

let log = (d) => {
    console.log(d)
};


app.get('/', (req, res) => {


    axios.get(axiosURL)
        .then( (response) => {
            return response.data;
        })
        .then( (data) => {
            res.send(data);
        })
        .catch( (error) => {
            // handle error
            log(error);
        });
});


const port = 3000;
const server = app.listen(port, () => {
    console.log('app started on http//localhost:' + port);
});
