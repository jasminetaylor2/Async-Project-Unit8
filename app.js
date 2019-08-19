const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.set('view engine', 'pug');
app.set("views", path.join(__dirname, "views"));
app.use(express.static('public'));

//middlewear for try catch block
//return async function that serves as route handler callback
//takes parameters for the reqiest response and next
//try cath block inside function..await function passed to async handler / normal route parameters
//
function asyncHandler(cb) { 
  return async (req, res, next) => { 
    try {
      await cb(req, res, next)
    }
    catch (err) {
      res.render('error', {error:err})
     }
  }

}
//CALL BACKS
// function getUsers(cb){
//   fs.readFile('data.json', 'utf8', (err, data) => {
//     if (err) return cb(err);
//     const users = JSON.parse(data);
//     return cb(null, users);
//   });
// }

// app.get('/', (req,res) => {
//   getUsers((err, users) => {
//     if (err) {
//       res.render('error', { error: err }
//       )
//     } else { 
//       res.render('index', {title:"Users", users:users.users})
//     }
//    });
// }); 

//PROMISes
//when getUsers is called create new prominse
//read file and if read file isnt successful give err 
//if successful give data
function getUsers() {
  return new Promise((resolve, reject) => { 
    fs.readFile('data.json', 'utf-8', (err, data) => { 
      if (err) {
        reject(err)
      } else {
        const users = JSON.parse(data)
        resolve(users)
      }
    })
  })
}
//use then and catch methods
//then accepts function define parameter called useres to gain acces to data provided by getUsers
//render the page
// app.get('/', (req, res) => {
//   getUsers()
//     .then((users) => {
// res.render('index', {title:"Users", users: users.users})
//     })
//     .catch((err) => { 
//       res.redirect('error', {error:err})
//     })

  
// }); 
//keyowrd await must alwasy be used in acyn function
//convert cb function to promise add async in front of get routes callbackfunction
//then use await keyword
//store value that getUsers function return in a variable
//render the info to html page
//wait for this aunc function to finish before moving on to next call ...same as .then() method
//to hanlde error wrap code in try cath block try{} catch{}
//example of using async/await
app.get('/', asyncHandler(async (req, res) => {
  const users = await getUsers()
  //throw new Error("itbroke")
  res.render('index', { title: "Users", users: users.users })

})
);
  
 

app.listen(3000, () => console.log('App listening on port 3000!'));