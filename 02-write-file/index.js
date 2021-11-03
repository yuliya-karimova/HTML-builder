const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

let filePath = path.join(__dirname, 'text.txt');

fs.writeFile(filePath, '', 'utf8', (error) => { if (error) throw error });
stdout.write('Hello, enter your text:\n');
stdin.on('data', data => {
    if (data.toString().toLowerCase().trim() === 'exit') {
        process.exit();
    }
    fs.appendFile(filePath, data, (error) => { if (error) throw error });
});
process.on('SIGINT', () => process.exit());
process.on('exit', () => stdout.write('Goodbye! Your text has been saved to a file text.txt.'));