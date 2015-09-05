var restful=require('node-restful');
module.exports=function(app,route){
	var restTestimonials=restful.model('Testimonials',app.models.testimonials).methods(['get','post','put','delete']);
	restTestimonials.register(app,route);
	return function(req,res,next){
		next();
	};
};