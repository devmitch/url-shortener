async function shortenURL() {
    console.log("Starting the post request...");
    console.log(document.getElementById('urlInput').value);
    let data = {
        url: document.getElementById('urlInput').value
    }

    let fetchData = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    
    fetch('shorten', fetchData)
    .then((response) => response.json())
    .then((responseJSON) => {
        console.log("Got response!");
        console.log(window.location.hostname + '/' + responseJSON.url);
        const url = window.location.hostname + '/' + responseJSON.url;
        var paragraph = document.getElementById('urlOutput');
        var aTag = document.createElement('a');
        aTag.setAttribute('href', responseJSON.url);
        aTag.textContent = url;
        paragraph.textContent = 'Your shortened url is ';
        paragraph.appendChild(aTag);
    });
}