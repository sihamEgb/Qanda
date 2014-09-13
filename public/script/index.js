var groupName = "The new name group";
var groupInfo = "this group shows new name ...";
var adminName = "Admin";

$(document).ready(function () {

});

$("#joinGroup").submit(function (event) {
    event.preventDefault();
    var userName = $("#input1").val();
    var groupId = $("#input2").val();

	//alert(groupId);
	window.location = "room/"+groupId+"/"+userName;
    //alert("welcome" + userName + "joining group" + groupId);	
    //$("span").text("Validated...").show();

    //alert("no such group" + groupId + userName);
    return;
});

$("#createGroup").submit(function () {
    event.preventDefault();
    var adminName = $("#input3").val();
    var groupName = $("#input4").val();
    var groupInfo = $("#input5").val();

	//alert(groupName);
	window.location = "room/"+groupName+"/"+adminName+"/"+groupInfo;
	 return;
});
