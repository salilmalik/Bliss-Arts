var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Testimonialschema = new Schema({
	name : String,
	comment:String,
	img: { data: Buffer, contentType: String }
});

module.exports = mongoose.model('Testimonials', Testimonialschema);