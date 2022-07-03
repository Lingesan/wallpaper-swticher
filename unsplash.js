const { width, height } = require("screenz");
const { keywords, orientation } = require('./config.json');

const BASE_API = "https://api.unsplash.com/";

const getRandomWallPaperDetails = () => {

    var myHeaders = new Headers();
    myHeaders.append("Accept-Version", " v1");
    myHeaders.append("Authorization", "Client-ID " + process.env.ACCESS_KEY);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    var searchParams = new URLSearchParams({
        h: height,
        w: width,
        topics: keywords.join(","),
        orientation,
    });
    return fetch(BASE_API + "/photos/random?" + searchParams, requestOptions)
        .then(response => response.json())
        .then(jsonData => jsonData?.urls?.raw)
        .catch(console.error);
}


const downloadImage = (url) => {
    return fetch(url)
        .then(response => response.blob())
        .then(blob => blob.arrayBuffer())
        .catch(console.error);

}

module.exports = { getRandomWallPaperDetails, downloadImage };