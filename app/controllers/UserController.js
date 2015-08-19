var restful=require('node-restful');
module.exports=function(app,route){
	var restUser=restful.model('User',app.models.user).methods(['get','post','put','delete']);
	restUser.register(app,route);
	return function(req,res,next){
		next();
	};
};