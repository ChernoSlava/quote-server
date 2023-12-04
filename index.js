const http = require('http');

function generateHTML(quote) {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Kanye Quote</title>
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                    background-color: #f5f5f5;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                }
                .quote-container {
                    text-align: center;
                    padding: 20px;
                    border-radius: 8px;
                    background-color: #fff;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
                    margin-bottom: 20px;
                }
                h1 {
                    font-size: 24px;
                    color: #333;
                    margin-bottom: 10px;
                }
                .quote-text {
                    font-size: 18px;
                    color: #555;
                }
                .reload-button {
                    padding: 10px 20px;
                    font-size: 16px;
                    background-color: #4CAF50;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }
            </style>
        </head>
        <body>
            <div class="quote-container">
                <h1>Quote</h1>
                <p class="quote-text">${quote}</p>
            </div>
            <button class="reload-button" onclick="location.reload()">Next Quote</button>
        </body>
        </html>
    `;
};

const server = http.createServer( async(req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf8'
    });

    try {

        const fetch = (await import('node-fetch')).default;
        const response = await fetch('https://api.kanye.rest');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        console.log(response);
        // const responseBody = await response.text();
        // console.log(responseBody.quote)

        // res.end('<h1>${responseBody}</h1>', 'utf8');
        const responseBody = await response.json();
        const quote = responseBody.quote;

        res.end(generateHTML(quote), 'utf8');
    } catch (error) {
        console.error('Error fetching data:', error);
        res.end('<h1>Nothing</h1>', 'utf8');
    }
});

server.listen(3000);  

