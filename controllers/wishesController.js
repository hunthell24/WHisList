const Wish = require('../models/wish');

exports.getMainPage = (req, res) => {
    Wish.fetchWishes(wishes => {
        let total = 0;
        
        wishes.forEach(wish => {
            total += parseFloat(wish.price);
        });
        total = total.toFixed(2);

        console.log(wishes);
        console.log("Total price: "+total);
        res.render('index.ejs', {wishItems: wishes, TotalPrice: total} );
    });
};

exports.postNewWish = (req, res) => {
    let item = new Wish(req.body.newWish, req.body.newPrice);
    item.saveWish();
    res.redirect('/');
};

exports.deleteWish = (req, res) =>{
    Wish.deleteWish(req.body.wishDelete);
    res.redirect('/');
};