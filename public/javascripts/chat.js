var user = "";
var counter = 0;
function send_message(message)
{
    $message = $('<div></div>');
    $name = "Chatbot: ";
    $message.text($name + message);
    $message.addClass("message bot");
    $("#box").append($message);
    $("#box").scrollTop($("#box").prop('scrollHeight'));
    $(".bot:last").hide();
    $(".bot:last").delay(500).fadeIn();
}
function username()
{
    $text = "What is your name?";
    send_message($text);
}
function ai(message)
{
    if(user.length == 0)
      {
         $msg = "how are you?";
         user = message;
         send_message($msg);
      }
    if(message.toLowerCase().indexOf("how are you") >= 0 || message.toLowerCase().indexOf("how are u") >= 0)
      {
        if(counter == 0)
          {
            send_message("I am fine dud");
          }
        if(counter > 0)
          {
            send_message("How many times will u ask the same question");
          }
        counter++;
      }
}

$(document).ready(function(){
    username();
  $("#message").on('keypress', function(event){
    if(event.which == 13)
      {
        if($("input[type=checkbox]").prop('checked'))
          {
            $("input[type=submit]").click();
            event.preventDefault();
          }
      }
  });
  
  $("input[type=submit]").click(function(){
    $text = $("#message").val();
    if($text != "")
      {
        $message = $('<div></div>');
    $name = "You: ";
        
    var message = { 
        sender: "Bobby",
        message: "Hello!"
    };
    
    let url = "http://localhost:5055/webhooks/rest/webhook";
    var req = new XMLHttpRequest();
    req.addEventListener('load', () => {alert("hello World");});
    req.open('post', url, true); // (method, url, async)
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(message));

    
    $message.text($name + $text);
    $message.addClass("message");
    $("#box").append($message);
    $("#message").val("");
    $("#box").scrollTop($("#box").prop('scrollHeight'));
    console.log($text);
    ai($text);
      }
  });
});

    
    

// function handleLoad() {
//     document.getElementById('result').childNodes[0].textContent = 'Message sent at ' + Date().toString() + ' with response code ' + this.status;
// }

// // == embed handling ==

// var embedDiv = (function() {
//     var div = document.createElement('div'),
//         input;
    
//     // timestamp doesn't have an user friendly UI in some browsers, make sure you enter an ISO date like 2019-04-30T21:05:07.510Z
//     var mainfields = {'title': 'text', 'description': 'text', 'url': 'text', 'timestamp': 'datetime-local', 'color': 'color'};
//     for (var field in mainfields) {
//         input = document.createElement('input');
//         input.type = mainfields[field];
//         input.placeholder = field;
//         div.appendChild(input);
//     }
    
//     /* We could support every embed option, but that's way beyond the scope of this document.
//        https://discordapp.com/developers/docs/resources/channel#embed-object */
    
//     return div;
// })();

// document.getElementById('addembed').addEventListener('click', function() {
//     document.getElementById('embeds').appendChild(embedDiv.cloneNode(true)); // true makes it a deep clone so it includes its children
// });

// function divToEmbed(div) {
//     return {
//         'title': div.childNodes[0].value,
//         'description': div.childNodes[1].value,
//         'url': div.childNodes[2].value,
//         'timestamp': div.childNodes[3].value,
//         'color': parseInt(div.childNodes[4].value.substring(1), 16) // discord expects numbers as an int, while the color input outputs it in hex prefixed with a #
//     };
// }