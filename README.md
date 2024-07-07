# analytics api

an api used to detect the users accessing your website using a simple javascript tag 

~needs a web ui to create id~
it has a webui now on analytics-web repo

```
<script>
    const id = 'your_id';
    function getInfo() {
    fetch(window.location.href, { method: 'HEAD' })
        .then(response => {
            let headers = {};
            for (let [key, value] of response.headers.entries()) {
                headers[key] = value;
            }
            const response = await fetch('/api/hit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id,headers,url:window.location.href})
            });
        })
        .catch(error => console.error('Error fetching headers:', error));
    }
</script>
```
