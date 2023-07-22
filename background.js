```javascript
const openaiApiKey = 'YOUR_OPENAI_API_KEY';
const openaiEndpoint = 'https://api.openai.com/v1/engines/davinci-codex/completions';

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeBackgroundColor({ color: '#4688F1' });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getSummary') {
    fetchSummary(request.text).then(summary => {
      sendResponse({ summary });
    });
    return true; // Indicate that response will be sent asynchronously
  }
});

function fetchSummary(text) {
  return fetch(openaiEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${openaiApiKey}`
    },
    body: JSON.stringify({
      prompt: text,
      max_tokens: 100
    })
  })
  .then(response => response.json())
  .then(data => data.choices[0].text.trim())
  .catch(error => console.error('Error:', error));
}
```