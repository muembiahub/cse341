const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const mongodb = require('./config/database');



app.use(express.json());

app.use('/', require('./routes/contact'));

mongodb.initdb((err) => {
    if (err) {
        console.log(err);
    } else {
       app.listen(PORT, () => {console.log(`Database conntected and Server is listening on port ${PORT}`)});
    }
});

