document.getElementById("logout").addEventListener("click", function() {
    cookie_name = "stock_tracker_cookie_container"
    document.cookie = `${cookie_name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    window.location.href = '/';
});

document.addEventListener('DOMContentLoaded', function () {
    // Fetch and display elements from the server
    get_stock_data();  

});

encoded_id = getEncodedID_or_Landing();

function get_stock_data() {
    fetch('/get_stock_data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },  
        body: JSON.stringify({encoded_id:encoded_id}),     
    })
    .then(response => response.json())
    .then(stock_data => {
        console.log(stock_data)
        // Create a container div for the charts
        const chartContainer = document.getElementById('graphs');

        // Iterate over each stock in the JSON data
        // Iterate over each stock in the JSON data
    for (const stock in stock_data) {
        const dates = Object.keys(stock_data[stock]);
        const values = Object.values(stock_data[stock]);
    
        // Create a div element for each stock
        const chartDiv = document.createElement('div');
        
        chartDiv.style.height = '400px';
        chartContainer.appendChild(chartDiv);
    

        var layout = {
            title : stock,
            xaxis: {
                title : 'Date',
                rangebreaks: [
                    {pattern: 'hour', bounds: [20,4]},
                    {pattern: 'day of week', bounds: [6,1]},            
                ],
                
            },
            yaxis: { title: 'Value' },
        };

        // Create a Plotly chart for each div
        Plotly.newPlot(chartDiv, 
        [{
            x: dates,
            y: values,
            type: 'scatter',
            mode: 'lines',
            name: stock,
            
        }], 
        layout,
        );
    }
    
    });
}

function getEncodedID_or_Landing() {
    const cookies = document.cookie.split(';');
    cookie_name = "stock_tracker_cookie_container"
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');

        if (name === cookie_name) {
            return value;
        }
    }
    location.href = '/';
}