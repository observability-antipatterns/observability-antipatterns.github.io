document.addEventListener("DOMContentLoaded", () => {
    let data = [];

    // Load data from JSON
    fetch("data.json")
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
                    openModal(item.name, item.context + " " + item.problem + " " + item.solution); // Passando nome, contexto, problema e solução
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
    function openModal(name, content) {
        document.getElementById("modal-title").textContent = name; // Defina o título do modal
        document.getElementById("modal-content").textContent = content; // Defina o conteúdo do modal
        modal.style.display = "block"; // Exibe o modal
    }

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
