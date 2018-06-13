
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cardSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    
    deck: [{ type: Schema.Types.ObjectId, ref: 'Deck' }],
    
    characters: [String],
    prettypinyin: [String],
    tone: [String],
    zhuyin: String,
    definition: [String],
    label: String,

    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Card', cardSchema);

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