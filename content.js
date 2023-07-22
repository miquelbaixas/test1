```javascript
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === "get_website_content") {
      let websiteContent = document.body.innerText;
      sendResponse({content: websiteContent});
    }
  }
);
```