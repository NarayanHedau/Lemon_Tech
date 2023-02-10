const mongoose = require("mongoose"),
Schema = mongoose.Schema;

const UrlSchema = new Schema({
  urlCode: {type:String},
  longUrl: {type:String},
  shortUrl: {type:String},
}, { timestamps: true })


module.exports = mongoose.model("url", UrlSchema);




