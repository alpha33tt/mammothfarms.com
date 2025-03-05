document.addEventListener("DOMContentLoaded", function() {
    let currentBid = localStorage.getItem("highestBid") || 500;
    document.getElementById("current-bid").textContent = `$${currentBid}`;

    loadWinners(); // Load previous winners when the page loads

    document.getElementById("bid-form").addEventListener("submit", function(e) {
        e.preventDefault();

        let name = document.getElementById("bidder-name").value;
        let email = document.getElementById("bidder-email").value;
        let bidAmount = parseInt(document.getElementById("bid-amount").value);

        if (bidAmount > currentBid) {
            currentBid = bidAmount;
            localStorage.setItem("highestBid", currentBid);
            document.getElementById("current-bid").textContent = `$${currentBid}`;

            saveBid(name, email, bidAmount);
        } else {
            alert("Your bid must be higher than the current bid!");
        }
    });
});

function saveBid(name, email, bidAmount) {
    let bidData = `${name},${email},${bidAmount}\n`;

    fetch("save_bid.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "data=" + encodeURIComponent(bidData)
    }).then(response => response.text()).then(() => {
        loadWinners();
    }).catch(error => console.error("Error:", error));
}

function loadWinners() {
    fetch("get_winners.php")
        .then(response => response.json())
        .then(winners => {
            let table = document.getElementById("winner-table");
            table.innerHTML = `
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Winning Bid</th>
                </tr>`;
            winners.forEach(winner => {
                let row = table.insertRow();
                row.insertCell(0).textContent = winner.name;
                row.insertCell(1).textContent = winner.email;
                row.insertCell(2).textContent = `$${winner.bid}`;
            });
        });
}
