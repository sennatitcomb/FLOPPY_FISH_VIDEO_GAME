var http = require('http');
var fs = require('fs');
var path=require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var PORT = process.env.PORT || 3000;
var static=fs.readdirSync('./public');
var files={}

var app = express();
app.use(express.json());
app.engine('handlebars',exphbs({defaultLayout: 'html'}));
app.set('view engine','handlebars');

app.use(express.static('public'));

var players = require("./playersData.json");


var listPlayers = fs.readFileSync(__dirname + '/playersData.json', function(error, result)
{
	if(error) console.log("error reading json file");
});

var array = JSON.parse(listPlayers);


app.get('/',function(req,res)
{
	res.status(200).render('game');

});

app.get('/scores.html',function(req,res)
{
	sortArray(array);	
	res.status(200).render('score',{player: array});
});

app.get('*',function(req,res)
{
	res.status(200).render('404');
});

/*
static.forEach(function (filename) { 
	var data=fs.readFileSync(path.join('./public',filename))
	files[filename.toLowerCase()]=data;
})

fs.readFile('public/index.js', 'utf8', function(err, data){
	if(err){
		throw err
	}
})

var server = http.createServer(function (req, res){
	var x = req.url;
	x=x.substr(1);
	x.toLowerCase()
	if(''==x)
		x='index.html';
	var filetype;
	if (path.extname(x) == '.html')
	   filetype='text/html'
	if (path.extname(x) == '.css')
	   filetype='text/css'
	if (path.extname(x) == '.js')
	   filetype='text/javascript'
	if (path.extname(x) == '.png')
	   filetype='image/png'
	res.writeHead(200,{'Content-Type':filetype});
	res.write(files[x])
	res.end();

})
server.listen(PORT);
console.log('Server Started listening on ' + PORT);


*/

app.post('/test', function(request,response)
{
	array.push(request.body);
	fs.writeFile(__dirname + '/playersData.json',JSON.stringify(array,null,2), function(error, result)
	{
		if(error) console.log("BIG ERROR");
	});
});


app.listen(PORT,function()
{
	console.log("== server is listening on port", PORT);
});

function sortArray(array)
{
	var temp;
	for(var i = 0; i < array.length-1; i ++)
	{
		for(var j = 0; j < array.length-i-1; j ++)
		{
			if(array[j].Score < array[j+1].Score)
			{
				temp = array[j];
				array[j]= array[j+1];
				array[j+1] = temp;	
			}
		}
	}
	if(array.length >= 10)
	{
		for(var i = 10; i < array.length; i ++) array.splice(i);
	}
}



