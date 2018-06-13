
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var deckSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,

    title: String,

    gramorvocab:{ type: String, enum: ['grammar', 'vocab'] },

    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Deck', deckSchema);

// // Get Genres
// module.exports.getGenres = (callback, limit) => {
//     Genre.find(callback).limit(limit);
// }

// // Add Genre
// module.exports.addGenre = (genre, callback) => {
//     Genre.create(genre, callback);
// }

// // Update Genre
// module.exports.updateGenre = (id, genre, options, callback) => {
//     var query = { _id: id };
//     var update = {
//         name: genre.name
//     }
//     Genre.findOneAndUpdate(query, update, options, callback);
// }


// // Delete Genre
// module.exports.removeGenre = (id, callback) => {
//     var query = { _id: id };
//     Genre.remove(query, callback);
// }