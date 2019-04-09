let socket = io();
let radio_chat = document.getElementById("radio-chat");
let chat = document.getElementById("chat");
let chat_exit = document.getElementById("chat-exit");
let chat_submit_text = document.getElementById("chat-submit-text");
let chat_emote_button = document.getElementById("chat-emote-button");
let chat_window = document.getElementById("chat-window");
let emotes = document.getElementById("emotes");
let chat_submit_button = document.getElementById("chat-submit-button");
let user;


//document.addEventListener("keyup", (e) => {
//    if(!event.shiftKey)
//        if(e.which == 13)
//            chat_submit_button.click();
//});

radio_chat.addEventListener("click", () => {
    if(chat.className == "chat-closed")
        chat.className = "chat-open";
    else
        chat.className = "chat-closed";
    chat_window.scrollTop = chat_window.scrollHeight;
});
chat_exit.addEventListener("click", () => {
    chat.className = "chat-closed";

});

chat_emote_button.addEventListener("click", () => {
    if(emotes.className == "emotes-closed")
        emotes.className = "emotes-open";
    else
        emotes.className = "emotes-closed";
});

emotes.addEventListener("click", (e) => {
    if(e.target.className == "emote")
    {
        chat_submit_text.value += "*" + e.target.attributes.value.value+"*";
    }
});

chat_submit_button.addEventListener("click", () => {
    let message = chat_submit_text.value;
    chat_submit_text.value = "";
    if(!(/^\s*$/.test(message)))
    {
        promise("http://localhost:4000/api/user").then((data) => {
            socket.emit("chat", {msg: message, user: data.user});
        });
    }
});

socket.on("chat", function(data){
    chat_window.innerHTML += `<div class="message">
    <span class="${data.role}">${data.handle}: </span>${data.msg}
</div>`;
    chat_window.scrollTop = chat_window.scrollHeight;
});
