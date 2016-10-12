var mongoose = require('mongoose');

var favoriteSchema = new mongoose.Schema({
	favorites: {type: String}
}) 


module.exports = mongoose.model('favorite',favoriteSchema);