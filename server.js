const express = require('express');
const app = express();






app.get('/', (req, res) => {
    res.send('Hello World');});



try {
    app.listen(3030, () => {
        console.log('Server is running on port 3000');
    });
} catch (error) {
    console.log(error);
    
}