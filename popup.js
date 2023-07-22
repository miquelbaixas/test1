```javascript
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#request-summary').addEventListener('click', requestSummary);
});

function requestSummary() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.runtime.sendMessage({
            action: "requestSummary",
            url: tabs[0].url
        });
    });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "displaySummary") {
        displaySummary(request.summary);
    }
});

function displaySummary(summary) {
    document.querySelector('#summary').textContent = summary;
}
```