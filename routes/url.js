const mongoose = require("mongoose");
const router = require("express").Router();
const validUrl = require("valid-url");
const shortid = require("shortid");
const response = require("../helper/response")
require("../models/url");
const Url = mongoose.model("url");
const baseUrl = 'http:localhost:2023'


router.post('/url_short', async (req, res) => {
  try {
    const { longUrl } = req.body;
    if (!validUrl.isUri(baseUrl)) {
      return response.errorMsgResponse(res, 401, "Invalid base URL")
    }
    const urlCode = shortid.generate();
    if (validUrl.isUri(longUrl)) {
      let urlResult = await Url.findOne({ longUrl: longUrl })
      if (urlResult) {
        response.errorMsgResponse(res, 403, "URL already exist.")
      } else {
        const shortUrl = baseUrl + '/' + urlCode
        urlResult = await new Url({
          urlCode: urlCode,
          longUrl: longUrl,
          shortUrl: shortUrl,
        }).save();
        response.successResponse(res, 200, "Shorten URL created successfully.", urlResult)
      }
    } else {
      response.errorMsgResponse(res, 401, "Invalid longUrl")
    }
  } catch (error) {
    response.errorMsgResponse(res, 500, "Server Error")
  }
})

router.get('/:code', async (req, res) => {
  try {
    const urlResult = await Url.findOne({ urlCode: req.params.code })
    if (urlResult) {
      return res.redirect(urlResult.longUrl)
    } else {
      return response.errorMsgResponse(res, 404, "No URL Found")
    }
  }
  catch (err) {
    response.errorMsgResponse(res, 500, "Server Error")
  }
})
module.exports = router;