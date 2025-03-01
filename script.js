document.addEventListener("DOMContentLoaded", () => {
    let data = [];

    // Load data from JSON
    fetch("data.json")
        .then(response => response.json())
        .then(json => {
            data = json;
            displayResults(data);
        })
        .catch(error => console.error("Error loading JSON:", error));

    function displayResults(results) {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = "";

        if (results.length === 0) {
            resultsDiv.innerHTML = "<p>Not found.</p>";
        } else {
            results.forEach(item => {
                const div = document.createElement("div");
                div.classList.add("result");
                div.innerHTML = `<strong>${item.category}</strong>: ${item.antiPattern}`;
                resultsDiv.appendChild(div);
            });
        }
    }

    // Function to filter results
    window.filterResults = function () {
        const term = document.getElementById('search').value.toLowerCase();
        
        if (term.trim() === "") {
            displayResults(data);
        }

        const filteredResults = data.filter(item =>
            item.antiPattern.toLowerCase().includes(term) ||
            item.category.toLowerCase().includes(term) ||
            item.context.toLowerCase().includes(term) ||
            item.problem.toLowerCase().includes(term)
        );

        displayResults(filteredResults);
    };
});
