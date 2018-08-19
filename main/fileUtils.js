const fs = require('fs');

module.exports.getFile = async (filename) => {
    return new Promise ((resolve, reject) => {
        fs.readFile(filename, (err, data) => {
            if (err) reject(err);
            resolve(data.toString());
        });
    });
};
