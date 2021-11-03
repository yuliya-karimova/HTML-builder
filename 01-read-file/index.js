const fs = require('fs');
const path = require('path');

let reader = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf8');
reader.on('error', (error) => console.log(error.message));
reader.on("data", (data) => console.log(data));