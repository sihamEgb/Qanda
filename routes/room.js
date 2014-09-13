var express = require('express');
var router = express.Router();

function Group(groupName,groupInfo,adminName) {
    this.groupName = groupName;
    this.groupInfo = groupInfo;
    this.adminName = adminName;
}
var groupsArray = [];
	
/* GET home page. */
				
router.get('/:num/:name/:info', function(req, res) {

 var newGroup = groupsArray.filter(function(obj){
		return obj.groupName == req.params.num ;
	});
		if(newGroup != false)
			//alert("choose another group name"); 
			res.send('choose another group name');
	else 
	{
	 newGroup = new Group(req.params.num,req.params.info,req.params.name);
		groupsArray.push(newGroup);
		
		res.render('chatroom', { room_number: req.params.num ,		
						   admin_name: req.params.name,
						   group_info: req.params.info,
						   user_name : req.params.name});
	}
	
  
});
router.get('/:num/:user', function(req, res) {
  
  var joinGroup = groupsArray.filter(function(obj){
		return obj.groupName == req.params.num ;
	});
		if(joinGroup == false)
			res.send('group not available');
	else 
	{
		res.render('chatroom', { room_number: req.params.num,
						   admin_name: joinGroup[0].adminName,
						   group_info: joinGroup[0].groupInfo,
						   user_name : req.params.user});				
	}  
});

module.exports = router;
