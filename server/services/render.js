const axios = require('axios');


exports.homeRoutes = (req, res) => {
    // Make a get request to /api/users
    axios.get('http://localhost:3000/api/users')
        .then(function(response){
            res.render('index', { users : response.data });
        })
        .catch(err =>{
            res.send(err);
        })

    
}

exports.add_user = (req, res) =>{
    res.render('add_user');
}

exports.show_user = (req, res) =>{
    axios.get('http://localhost:3000/api/users')
    .then(function(response){
        res.render('show_user', { users : response.data });
    })
    .catch(err =>{
        res.send(err);
    })

}


exports.update_user = (req, res) =>{
    axios.get('http://localhost:3000/api/users', { params : { id : req.query.id }})
        .then(function(userdata){
            res.render("update_user", { user : userdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}

exports.show_coin = (req, res) =>{
    axios.get('http://localhost:3000/api/coins')
    .then(function(response){
        res.render('coin/show_coin', { coins : response.data });
    })
    .catch(err =>{
        res.send(err);
    })
}

exports.add_coin = (req, res) =>{
    res.render('coin/add_coin');
}

// exports.vote_coin = (req, res) =>{
//     axios.get('http://localhost:3000/api/coins', { params : { id : req.query.id }})
//         .then(function(coindata){
//             let currentVote = coindata.data.vote;
//             currentVote = currentVote++;
//             coindata.data.vote=currentVote;
//             res.render("coin/vote_coin", { user : coindata.data})
//         })
//         .catch(err =>{
//             res.send(err);
//         })
// }

