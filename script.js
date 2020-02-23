var baseURL = "https://sv443.net/jokeapi/v2";
var categories = ["Programming"];
var params = [
    "blacklistFlags=nsfw,religious,racist",
    "idRange=0-100"
];

var xhr = new XMLHttpRequest();
xhr.open("GET", baseURL + "/joke/" + categories.join(",") + "?" + params.join("&"));

xhr.onreadystatechange = function() {
    if(xhr.readyState == 4 && xhr.status < 300) // readyState 4 means request has finished + we only want to parse the joke if the request was successful (status code lower than 300)
    {
        var randomJoke = JSON.parse(xhr.responseText);
        let result = "";

        if(randomJoke.type == "single")
        {
            // If type == "single", the joke only has the "joke" property
            result += "<p>";
            result += randomJoke.joke;
            result += "</p>";
        }
        else
        {
            // If type == "single", the joke only has the "joke" property
            result += "<p><strong>";
            result += randomJoke.setup;
            result += "</strong>";
            result += "<br>";
            result += "<br>";
            result += randomJoke.delivery;
            result += "</p>";
        }
        document.getElementById("jokeResult").innerHTML = result;
    }
    else if(xhr.readyState == 4)
    {
        alert("Error while requesting joke.\n\nStatus code: " + xhr.status + "\nServer response: " + xhr.responseText);
    }
};

xhr.send();
