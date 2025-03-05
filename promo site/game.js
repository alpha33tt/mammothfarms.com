document.addEventListener("DOMContentLoaded", function() {
    loadGameWinners();

    document.getElementById("game-form").addEventListener("submit", function(e) {
        e.preventDefault();

        let name = document.getElementById("game-name").value;
        let email = document.getElementById("game-email").value;

        let gameData = `${name},${email}\n`;

        fetch("save_game.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: "data=" + encodeURIComponent(gameData)
        }).then(response => response.text()).then(() => {
            loadGameWinners();
        }).catch(error => console.error("Error:", error));
    });
});

function loadGameWinners() {
    fetch("get_game_winners.php")
        .then(response => response.json())
        .then(winners => {
            let table = document.getElementById("game-winner-table");
            table.innerHTML = `
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                </tr>`;
            winners.forEach(winner => {
                let row = table.insertRow();
                row.insertCell(0).textContent = winner.name;
                row.insertCell(1).textContent = winner.email;
            });
        });
}
