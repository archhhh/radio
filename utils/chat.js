let emotes = {
    "mau5": "https://static-cdn.jtvnw.net/emoticons/v1/30134/1.0",
    "bibleThump": "https://static-cdn.jtvnw.net/emoticons/v1/86/1.0",
    "kappaPride": "https://static-cdn.jtvnw.net/emoticons/v1/55338/1.0",
    "roflanEbalo": "https://static-cdn.jtvnw.net/emoticons/v1/90817/1.0",
    "roflanPomoika": "https://static-cdn.jtvnw.net/emoticons/v1/41135/1.0",
    "pogChamp": "https://static-cdn.jtvnw.net/emoticons/v1/88/1.0",
    "theIlluminati": "https://static-cdn.jtvnw.net/emoticons/v1/145315/1.0",
    "shroud4Head": "https://static-cdn.jtvnw.net/emoticons/v1/205480/1.0",
    "SSSsss": "https://static-cdn.jtvnw.net/emoticons/v1/46/1.0",
    "roflanFingal": "https://static-cdn.jtvnw.net/emoticons/v1/1201077/1.0", 
    "roflanBuldiga": "https://static-cdn.jtvnw.net/emoticons/v1/117708/1.0",
    "roflanChelik": "https://static-cdn.jtvnw.net/emoticons/v1/181421/1.0",
    "roflanDodik": "https://static-cdn.jtvnw.net/emoticons/v1/1722639/1.0",
    "roflanGorit": "https://static-cdn.jtvnw.net/emoticons/v1/669957/2.0",
    "roflanDovolen": "https://static-cdn.jtvnw.net/emoticons/v1/1201063/2.0",
    "roflanHmm": "https://static-cdn.jtvnw.net/emoticons/v1/117092/2.0",
    "roflanPominki": "https://static-cdn.jtvnw.net/emoticons/v1/117709/2.0",
    "roflanRabotyaga": "https://static-cdn.jtvnw.net/emoticons/v1/1228008/2.0",
    "roflanSlogna": "https://static-cdn.jtvnw.net/emoticons/v1/925149/2.0",
    "roflanZachto": "https://static-cdn.jtvnw.net/emoticons/v1/332567/2.0",
    "roflanOld": "https://static-cdn.jtvnw.net/emoticons/v1/1201057/2.0",
};

let parse = (string) => {
    var res = string.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;").trim();
    var start_pos = res.indexOf("*");
    while(start_pos != -1)
    {   
        var last_pos = res.indexOf("*", start_pos+1);
        if(last_pos != -1)
        {
            var temp = res.slice(start_pos+1, last_pos);
            if(temp !== "")
            {
                if(temp in emotes)
                {
                    res = res.replace(`*${temp}*`, `<img src=${emotes[temp]} class="chat-emote">`);
                    start_pos = res.indexOf("*");
                }else{
                    start_pos = last_pos;
                }
            }else{
                start_pos = last_pos;
            }
        }else{
            start_pos = last_pos;
        }
    }
    return res;
};

module.exports = {emotes: emotes, parse: parse};