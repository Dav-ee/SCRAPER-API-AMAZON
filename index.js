var PORT = process.env.PORT || 8000;
var express = require('express');
var app = express();
app.use(express.json());
app.listen(PORT, printME());
function printME() {
    console.log('API API STARTED ON ' + PORT);
}
const request = require("request-promise");
const {
    PRODUCT_DETAILS,
    PRODUCT_REVIEWS,
    PRODUCT_OFFERS,
    PRODUCT_SEARCH,
    ROOT,
} = require("./routes/routes");

// declare your api key here
const apiKey = 'b94358c88677994b84cf8c67b4927a74';

// const returnScraperApiUrl = (apiKey) =>
//     `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

const returnScraperApiUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;


// Base Route
app.get(ROOT, (req, res) => {
    res.send("Welcome to Amazon Scraper API.");
});

// Get Product Details
app.get(PRODUCT_DETAILS, async (req, res) => {
    // Get Id from params
    const { productId } = req.params;
    // const { api_key } = req.query;
    try {
        const response = await request(
            `${returnScraperApiUrl}&url=https://www.amazon.com/dp/${productId}`
        );
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});



// Get Product Reviews
app.get(PRODUCT_REVIEWS, async (req, res) => {
    // Get Id from params
    const { productId } = req.params;
    try {
        const response = await request(
            `${returnScraperApiUrl}&url=https://www.amazon.com/product-reviews/${productId}`
        );

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

// Get Product Offers
app.get(PRODUCT_OFFERS, async (req, res) => {
    // Get Id from params
    const { productId } = req.params;
    try {
        const response = await request(
            `${returnScraperApiUrl}&url=https://www.amazon.com/gp/offer-listing/${productId}`
        );
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

// Get Search Results
app.get(PRODUCT_SEARCH, async (req, res) => {
    // Get Id from params
    const { searchQuery } = req.params;
    try {
        const response = await request(
            `${returnScraperApiUrl}&url=https://www.amazon.com/s?k=${searchQuery}`
        );
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});
