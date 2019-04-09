const router = require("express").Router();
const request = require("request");
const lame = require("lame");

let listeners = {};

router.get('/320', function(req,res){
    if(req.user)
    {
		if(!createStream(320, req, res))
			res.send(403);
    }else{
		res.sendStatus(404);
	}
});

router.get('/128', function(req,res){
    if(req.user)
    {
		if(!createStream(128, req, res))
			res.send(403);
    }else{
		res.sendStatus(404);
	}
});

function flash(user){
	if(listeners[user]){
		for(let i = 0; i < listeners[user].length; i++){
			listeners[user][i].destroy();
		}
	}
}

function createStream(quality, req, res){
	if(!listeners[req.user.username] || listeners[req.user.username].length < 3){
		console.log(`connected ${req.user.username} now ${listeners[req.user.username]}`);
		if(!listeners[req.user.username])
			listeners[req.user.username] = [res];
		else
			listeners[req.user.username].push(res);
		let decoder = new lame.Decoder();
		let encoder = new lame.Encoder({
			channels:2,
			bitDepth:16,
			sampleRate: 44100,
			bitRate:quality,
			outSampleRate:44100,
			mode: lame.STEREO
		});
		// Radio server running on port 8000 and mounted on stream
		let fromRadio = request('http://13.209.55.253:8000/stream');
		fromRadio.pipe(decoder);
		decoder.pipe(encoder);
		encoder.pipe(res);
		res.on("close", () => {
			console.log(`closed ${req.user.username} now ${listeners[req.user.username]}`);
			let index = listeners[req.user.username].indexOf(res);
			listeners[req.user.username].splice(index,1);
			if(listeners[req.user.username].length == 0)
				delete listeners[req.user.username];
			fromRadio.abort();
		});
		return true;
	}else{
		return false;
	}
}


module.exports = {router: router, flash: flash};
