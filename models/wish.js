
const fs = require('fs');
const path = require('path');
const { callbackify } = require('util');
const filePath = path.join(path.dirname(require.main.filename), 'data', 'wishes.json');

module.exports = class Wish {


    constructor(description_, price_) {
        this.description = description_;
        this.price = price_;
    }


    saveWish() {
        fs.readFile(filePath, (error, fileContent) => {
            let wishes = [];

            if (!error) {
                wishes = JSON.parse(fileContent);
            } else {
                console.log(error);
            }

            wishes.push(this);
            fs.writeFile(filePath, JSON.stringify(wishes), (error) => {
                if (!error) console.log('CREATE: ' + 'File Write success.');
                else console.log(error);
            });
        });
    }

    static fetchWishes(callBack) {
        fs.readFile(filePath, (error, fileContent) => {
            if (error) {
                console.log('READ: ' + 'Wishes fetch failed.');
                callBack([]);
            }

            console.log('READ: ' + 'Wishes fetch success.');
            callBack(JSON.parse(fileContent));
        });
    }

    static deleteWish(wishDescription) {
        fs.readFile(filePath, (error, fileContent) => {
            let wishes = [];
            if (!error) {
                wishes = JSON.parse(fileContent);
            }

            for (let i = 0; i < wishes.length; i++) {
                if (wishes[i].description === wishDescription) {
                    wishes.splice(i, 1);
                    break;
                }
            }

            fs.writeFile(filePath, JSON.stringify(wishes), (error) => {
                if (!error) console.log('DELETE: ' + "\'" + wishDescription + "\'" + ' deleted successfully.');
                else console.log(error);
            });
        });
    }
}