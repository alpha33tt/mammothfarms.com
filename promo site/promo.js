document.addEventListener("DOMContentLoaded", function() {
    loadPromoWinners();

    document.getElementById("promo-form").addEventListener("submit", function(e) {
        e.preventDefault();

        let name = document.getElementById("promo-name").value;
        let email = document.getElementById("promo-email").value;

        let promoData = `${name},${email}\n`;

        fetch("save_promo.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: "data=" + encodeURIComponent(promoData)
        }).then(response => response.text()).then(() => {
            loadPromoWinners();
        }).catch(error => console.error("Error:", error));
    });
});

function loadPromoWinners() {
    fetch("get_promo_winners.php")
        .then(response => response.json())
        .then(winners => {
            let table = document.getElementById("promo-winner-table");
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