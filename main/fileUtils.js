const fs = require('fs');

module.exports.getFile = async (filename) => {
    return new Promise ((resolve, reject) => {
        fs.readFile(filename, (err, data) => {
            if (err) reject(err);
            resolve(data.toString());
        });
    });
};

module.exports.writeFile = async (filename, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filename, data, (err) => {
            if (err) reject(err);
            resolve();
        });
    });
}
