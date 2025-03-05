// Function to copy text
function copyText(elementId) {
    const text = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(text).then(() => {
        alert("Copied: " + text);
    });
}

// Handle form submission
document.getElementById("payment-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    
    fetch("upload_payment.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
    })
    .catch(error => console.error("Error:", error));
});
