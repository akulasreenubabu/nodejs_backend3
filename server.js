const express=require('express');
const app=express();
app.use(express.json());
let users = [ { id: 1, name: 'Lavanya', course: 'Node.js' }, 
    { id: 2, name: 'Venkat', course: 'React' }, 
    {id: 3, name: 'Shiva', course: 'Python'}, 
    {id: 4, name: 'Teja', course: 'Machine Learning'}];
app.get('/user/:id', (req,res) => {
    const id = req.params.id;
    console.log(id)
    //res.send('My name is ' + id);
    const user = users.find((user) =>{
        return user.id ===parseInt(id);
    })
    console.log('user', JSON.stringify(user));
    res.json({message: 'Successfully fetched the user.', data: user});
});

app.post('/user', (req, res) => {
    const body = req.body;
    console.log('body', body);
    users = users.concat(body);
    res.json({message: 'Successful', data:body, users});
});

app.put('/user/:id', (req, res) => {
    const {id} = req.params;
    const body = req.body;
    console.log('body:', body);
    const userIndex = users.findIndex(user => user.id === parseInt(id));
    users[userIndex].name = body && body.length !==0? body[0].name : users[userIndex].name; 
    users[userIndex].course = body && body.length !==0? body[0].course : users[userIndex].course; 
    res.json({ message: 'User updated successfully', data:body, users});
});

app.delete('/user/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(user => user.id === id);
    users = users.filter(user => user.id !== id);
    res.json({message: "User Deleted", users});
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log('Server is running on ' +PORT);
});
