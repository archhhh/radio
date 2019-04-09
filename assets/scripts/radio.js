let player = document.getElementById("player");
let paused = 1;
let radio_play_pause = document.getElementById("radio-play-pause");
let radio_volume = document.getElementById("radio-volume");
let radio_quality = document.getElementById("radio-quality");
let radio_current_track = document.getElementById("radio-current-track");
let radio_current_show = document.getElementById("radio-current-show");
let source = player.getElementsByTagName("source")[0];
let current = "http://13.209.55.253:4000/radio/320";
let radio_on = document.getElementById("radio-on");

    function checkRadioStatus(data){
        if(data.value == "OFF"){
            radio_on.innerText = "OFF";
            radio_play_pause.className = "fa fa-play-circle";
            paused = 1;
            player.pause();
            source.src = "";
            player.load();
            radio_play_pause.removeEventListener("click", pausePlayButtonClickIfOn);
            radio_play_pause.addEventListener("click", pausePlayButtonClickIfOff);
        }else
        {
            radio_play_pause.addEventListener("click", pausePlayButtonClickIfOn);
            radio_play_pause.removeEventListener("click", pausePlayButtonClickIfOff);
            radio_on.innerText = "ON";
        }
    }
    function checkRadioMeta(data){
        if(radio_on.innerText == "OFF")
        {
            radio_current_show.innerText = "-";
            radio_current_track.innerText = "-";
        }else{
            if(data.show == "")
                    data.show = "-";
            if(data.track == "")
                    data.track = "-";
            radio_current_show.innerText = data.show;
            radio_current_track.innerText = data.track;
        }
    }
    function pausePlayButtonClickIfOn(e){
        e.preventDefault();
        source.src = current;
        if(paused == 1)
        {
            player.load();
            player.play();
            paused = 2;
            setTimeout(() => {
                paused = 0; 
                radio_play_pause.className = "fas fa-pause-circle";
            }, 1000);
            
        }else if(paused == 0){
            player.pause();
            source.src = "";
            player.load();
            paused = true;
            radio_play_pause.className = "fa fa-play-circle";  
        }
    }
    function pausePlayButtonClickIfOff(e){
        e.preventDefault();
    }
    function promise(url){
        return new Promise((resolve, reject) => {
        let xhttp = new XMLHttpRequest();
        xhttp.open("GET", url, true);
        xhttp.onload = () => {
            if(xhttp.status == 200)
                resolve(JSON.parse(xhttp.response));
            else
                reject(xhttp.statusText);
        };
        xhttp.onerror = () => {
            reject(xhttp.statusText);
        };
        xhttp.send();
        });
    }

    promise("http://13.209.55.253:4000/api/radioStatus").then((data) => {
        checkRadioStatus(data);
        setInterval(() => {
            promise("http://13.209.55.253:4000/api/radioStatus").then((data) => {
                checkRadioStatus(data);
            });
        }, 3000);
    });
    promise("http://13.209.55.253:4000/api/radioMeta").then((data) => {
        checkRadioMeta(data);
        setInterval(() => {
            promise("http://13.209.55.253:4000/api/radioMeta").then((data) => {
                checkRadioMeta(data);
            });
        }, 3000);
    });
    radio_quality.addEventListener("click", (e) => {
        e.preventDefault();
        if(radio_quality.innerText == "320")
        {
           radio_quality.innerText = "128";
           current = "http://13.209.55.253:4000/radio/128";
        }else{
           radio_quality.innerText = "320";
           current = "http://13.209.55.253:4000/radio/320";
        }
    });
    radio_volume.addEventListener("input", () => {
        player.volume = radio_volume.value/100;
    });