/**
 * Created by Siham on 8/26/2014.
 */

// variables
// group id/name/info/adminName

var tag = "comment";
var message = "";
var user = userName;
var messagesArray = [];
var questionArray = [];

function Post(tag,user,message) {
    this.message = message;
    this.user = user;
    this.tag = tag;

    this.getPost = function () {
        return this.tag + ' ' + this.user + this.message;
    };
    this.isQuestion = function () {
        return (this.tag == "question");
    };

}
 $(document).ready(function () {
//  socket = io.connect("http://siham-sabihegb.rhcloud.com:8000");
    socket = io.connect();
    socket.on("connect",function(){
       console.log("got event connect");
       socket.emit("subscribe", {room: channelId});
    });
	socket.on("message", function (message) {
        console.log("got message");
		
	var newMessage = message.text;
	var newUser = message.name;
	var newTag = message.newTag;
    var fatherElement = $('<div class="bs-callout">');
    if (newTag == "comment")
        fatherElement.addClass("bs-callout-danger");
    if (newTag == "question")
        fatherElement.addClass("bs-callout-info");
    if (newTag == "extra")
        fatherElement.addClass("bs-callout-warning");
    var userElement = $('<p class="user">' + newUser + '</p>');
    var contentElement = $(' <p class="content">' + newMessage + '</p>');

    fatherElement.data( "tag", newTag );
    fatherElement.data( "user", newUser );
    fatherElement.data( "message", newMessage );

    fatherElement.append(userElement).append(contentElement);
    $('#messagesBox').prepend(fatherElement);

    var newPost = new Post(newTag,newUser,newMessage);
    messagesArray.push(newPost);
	
	   });
	   
	$('#groupName').html('Group Name:	'+channelId);
    $('#groupInfo').html(groupInfo);
	 $('#adminUser').html('by the Admin:	'+ adminName);
});	

$("#printButton").click(function () {
    window.print();
});


function isQuestion(element) {
    //return element.tag == "question";
    return element.isQuestion();
}

$("#showQuestionsButton").click(function () {
     //questionArray = messagesArray.filter(isQuestion);
    //$('#messagesBox').hide(fatherElement);

    $("#messagesBox").children().each(function(){
        if($(this).data("tag") != "question")
            $(this).hide();
    });

});

$("#showAllButton").click(function () {

    $("#messagesBox").children().each(function(){
        $(this).show();
    });

});

$("#enterMessage").submit(function (event) {

    event.preventDefault();
    message = $('#message').val();
   
    tag = $('#selectOptions').find(":selected").val();
    $('#message').val('');
   

	 socket.emit("message", {name: user, text: message, newTag: tag });

});