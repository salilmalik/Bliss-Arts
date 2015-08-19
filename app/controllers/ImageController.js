var restful=require('node-restful');
module.exports=function(app,route){
	var restImage=restful.model('Image',app.models.image).methods(['get','post','put','delete']);
	restImage.register(app,route);
	return function(req,res,next){
		next();
	};
};