document.addEventListener("DOMContentLoaded", () => {
    let data = [];

    // Load data from JSON
    fetch("data2.json")
        .then(response => response.json())
        .then(json => {
            data = json;
            data.sort((a, b) => a.category.localeCompare(b.category));
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

                div.innerHTML = `<strong>${item.name}</strong>`;  // Exibe o contexto

                // Adiciona o evento para abrir o modal ao clicar
                div.addEventListener('click', () => {
                    openModal(item.name, item.context, item.problem, item.example, item.recommended_solution, item.consequences); // Passando nome, contexto, problema e solução
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
    var span = document.getElementsByClassName("close")[0];

    // Função para abrir o modal com o conteúdo da caixinha
    // Função para abrir o modal
    function openModal(name, context, problem, example, recommended_solution, consequences) {
        document.getElementById("modal-title").textContent = name;
        document.getElementById("modal-context").innerHTML = `<strong>Context:</strong> ${context}`;
        document.getElementById("modal-problem").innerHTML = `<strong>Problem:</strong> ${problem}`;
        document.getElementById("modal-example").innerHTML = `<strong>Example:</strong> ${example}`;
        document.getElementById("modal-solution").innerHTML = `<strong>Solution:</strong> ${recommended_solution}`;

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
            consequencesHTML += "<li><strong>Challenges:</strong><ul>";
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


    // Quando o usuário clicar no botão de fechar, o modal será fechado
    span.onclick = function () {
        modal.style.display = "none"; // Oculta o modal
    }

    // Quando o usuário clicar fora do modal, ele será fechado
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none"; // Oculta o modal
        }
    }
});
