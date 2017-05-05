var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var request = require("request");

function makeTitle(l) {
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz";

    for( var i=0; i < l; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

function randomCard(variable) {
    request({
        url: "http://angular.dev/api/users", 
        method: 'GET'
    }, function(error, response, body){
        if(error) {

            console.log(error);

        } else {

            var users = JSON.parse(response.body).users;  

            function addNewCard(){

                var user_id = users[Math.floor(Math.random() * users.length)].id;  
                
                var title = makeTitle(8);

                request({
                    url: "http://angular.dev/api/card", 
                    method: 'POST',
                    form: {
                        category_id: "humanity",
                        content: "Hello world!",
                        user_id: user_id,
                        title: title
                    }
                }, function(error, response, body){
                    if(error) {

                        console.log(error);

                    } else {
                        var currentuserpost;
                        post = JSON.parse(response.body).post; 
                        if(post.user_id == variable.handshake.query.currentUserID) {
                            currentuserpost = post;                           
                        }

                        room = post.user_id;
                        console.log(post)
                        if(currentuserpost) {
                            io.sockets.in(room).emit('post', {post: currentuserpost});          
                        }
                    }
                });
            }

            setInterval(function(){ addNewCard(); }, 3000);
        }
    });
}

io.on('connection', (socket) => {
    socket.on('create', function(room) {
        console.log(room)
        socket.join(room);
    });

    console.log('user connected');

    randomCard(socket);
    
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

server.listen(3000);