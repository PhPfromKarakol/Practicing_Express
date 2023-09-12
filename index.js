const express = require("express");
const app = express();
const path = require('path');
const methodOverride = require('method-override');


const { v4: uuidv4 } = require('uuid');
//uuidv4();

app.use(methodOverride('_method'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


let commments = [
    {
        id: uuidv4(),
        username: "Nurbek",
        comment: "lol its so stupid"
    },
    {
        id: uuidv4(),
        username: "adyl",
        comment: "dfhadsfpdfhdasfdsa"
    },
    {
        id: uuidv4(),
        username: "pshal",
        comment: "go to gym bro"
    },
    {
        id: uuidv4(),
        username: "onlysayswoof",
        comment: "woof woof woof"
    },
]

app.get('/comments', (req, res) => {
    res.render('comments/index', { commments })

})

app.get('/comments/new', (req, res) => {
    res.render('comments/new');
})

app.post('/comments', (req, res) => {
    //console.log(req.body);
    const { username, comment } = req.body;
    commments.push({ username, comment, id: uuidv4() });
    //res.send("It worked!");
    res.redirect('/comments');
})

app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const commentttt = commments.find(c => c.id === id);
    res.render('comments/show', { commentttt });
})

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const commentttt = commments.find(c => c.id === id);
    res.render('comments/edit', { commentttt });
})



// app.get('/tacos', (req, res) => {
//     res.send("Get /tacos response");
// })


app.patch('/comments/:id', (req, res) => {
    //res.send("Updating something");
    const { id } = req.params;
    const newComment = req.body.comment;
    const foundCommentttt = commments.find(c => c.id === id);
    foundCommentttt.comment = newComment;
    res.redirect('/comments')
})


app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    //const foundCommentttt = commments.find(c => c.id === id);
    commments = commments.filter(c => c.id !== id);
    res.redirect('/comments');
})



// app.post('/tacos', (req, res) => {
//     //console.log(req.body);
//     const { meat, qty } = req.body;
//     res.send(`Ok, there is  ${meat} in ${qty} quantities`);
// })

app.listen(3000, () => {
    console.log("Oon port 3000!");
})


// GET / comments - list all comments
// post / comments - create a new comment
// GET / comments /: id - Get one comment(using ID)
// PATCH / comments /: id — Update one comment
// delete / comments/ : id - destroy one comment

