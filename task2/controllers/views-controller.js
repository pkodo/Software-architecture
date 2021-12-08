exports.getOverview = (req, res) => {
    

    res.status(200).render('overview', {
        title: 'Overview'
    });
};

exports.getFavourites = (req, res) => {
    res.status(200).render('favourite', {
        title: 'My Favourites'
    });
};

exports.getPoi = (req, res) => {
    res.status(200).render('poi', {
        title: 'My Points of Interest'
    });
};

exports.getShops =(req, res) => {
    res.status(200).render('shop', {
        title: 'My individual Shops'
    });
};

exports.signup =(req, res) => {
    res.status(200).render('signup', {
        title: 'Sign up!'
    });
};

exports.login =(req, res) => {
    res.status(200).render('login', {
        title: 'Log into your Account'
    });
};