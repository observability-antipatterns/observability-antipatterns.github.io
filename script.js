document.addEventListener("DOMContentLoaded", () => {
    let data = [];

    // Load data from JSON
    fetch("data2.json")
        .then(response => response.json())
        .then(json => {
            data = json;
            data.sort((a, b) => a.rank - b.rank);
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
                div.classList.add(item.category.toLowerCase());
                console.log(item.category.toLowerCase());

                div.innerHTML = `<strong>${item.name}</strong>${item.rank}`;  // Exibe o contexto

                // Adiciona o evento para abrir o modal ao clicar
                div.addEventListener('click', () => {
                    let relevance = "";
		  
		    if (item.rank >= 1 && item.rank <= 8) {
		      relevance = "High";
		    } else if (item.rank >= 9 && item.rank <= 19) {
		      relevance = "Medium";
		    } else {
		      relevance = "Low";
		    }
		    
		    
    
                    openModal(item.name, item.category, item.context, item.problem, item.example, item.recommended_solution, item.consequences, relevance); // Passando nome, contexto, problema e solução
                });

                resultsDiv.appendChild(div);
            });
        }
    }

    // Função para filtrar os resultados
    window.filterResults = function () {
        const term = document.getElementById('search').value.toLowerCase();

        if (term.trim() === "") {
            displayResults(data);
        }

        const filteredResults = data.filter(item =>
            item.name.toLowerCase().includes(term) ||
            item.category.toLowerCase().includes(term) ||
            item.context.toLowerCase().includes(term) ||
            item.problem.toLowerCase().includes(term)
        );

        displayResults(filteredResults);
    };

    var modal = document.getElementById("myModal");

    // Função para abrir o modal com o conteúdo da caixinha
    // Função para abrir o modal
    function openModal(name, category, context, problem, example, recommended_solution, consequences, relevance) {
        document.getElementById("modal-title").textContent = name;
        document.getElementById("modal-category").innerHTML = `<strong>Category:</strong> ${category}`;
        document.getElementById("modal-relevance").innerHTML = `<strong>Relevance:</strong> ${relevance}`;
        document.getElementById("modal-context").innerHTML = `<strong>Context:</strong> ${context}`;
        document.getElementById("modal-problem").innerHTML = `<strong>Problem:</strong> ${problem}`;
        document.getElementById("modal-example").innerHTML = `<strong>Example:</strong> ${example}`;

        // Construindo a lista de consequências
        let solutionsHTML = "<strong>Solutions:</strong><ul>";
        if (recommended_solution.length > 0) {
            recommended_solution.forEach(item => {
                solutionsHTML += `<li>${item}</li>`;
            });
        }
        solutionsHTML += "</ul>";


        document.getElementById("modal-solution").innerHTML = solutionsHTML;

        // Construindo a lista de consequências
        let consequencesHTML = "<strong>Consequences:</strong><ul>";
        if (consequences.positive.length > 0) {
            consequencesHTML += "<li><strong>Positives:</strong><ul>";
            consequences.positive.forEach(item => {
                consequencesHTML += `<li>${item}</li>`;
            });
            consequencesHTML += "</ul></li>";
        }
        if (consequences.challenges.length > 0) {
            consequencesHTML += "<li><strong>Negatives:</strong><ul>";
            consequences.challenges.forEach(item => {
                consequencesHTML += `<li>${item}</li>`;
            });
            consequencesHTML += "</ul></li>";
        }
        consequencesHTML += "</ul>";
        document.getElementById("modal-consequences").innerHTML = consequencesHTML;

        // Exibir modal e overlay
        document.getElementById("modal").style.display = "block";
        document.getElementById("modal-overlay").style.display = "block";
    }

    // Função para fechar o modal
    function closeModal() {
        document.getElementById("modal").style.display = "none";
        document.getElementById("modal-overlay").style.display = "none";
    }

    // Fecha o modal ao clicar fora dele (na overlay)
    document.getElementById("modal-overlay").addEventListener("click", closeModal);

    document.querySelectorAll(".close").forEach(closeBtn => {
        closeBtn.addEventListener("click", closeModal);
    });

    // Quando o usuário clicar fora do modal, ele será fechado
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none"; // Oculta o modal
        }
    }

    document.querySelectorAll('.legend-item').forEach(item => {
        item.addEventListener('click', () => {
            const selectedCategory = item.getAttribute('data-category').toLowerCase();
            const filtered = data.filter(obj => obj.category.toLowerCase() === selectedCategory);
            displayResults(filtered);            
        });
    });

    document.querySelectorAll('.relevance-item').forEach(item => {
        item.addEventListener('click', () => {
            const selectedCategory = item.getAttribute('data-relevance').toLowerCase();
            console.log(selectedCategory)
            var filtered = {};
            if (selectedCategory === 'high') {
                filtered = data.filter(obj => obj.rank >= 1 && obj.rank <= 8);                
            } else if (selectedCategory === 'medium') {
                filtered = data.filter(obj => obj.rank >= 9 && obj.rank <= 19);                
            } else {
                filtered = data.filter(obj => obj.rank >= 20);                
            }            
            displayResults(filtered);
        });
    });

    document.getElementById('clear-filters').addEventListener('click', () => {
        document.getElementById('search').value = "";
        displayResults(data);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {  // Verifica se a tecla pressionada é 'Esc'
            closeModal();  // Chama a função para fechar o modal
        }
    });
});
