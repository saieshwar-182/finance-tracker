const form = document.getElementById("transaction-form");
const list = document.getElementById("transaction-list");
const balanceEl = document.getElementById("balance");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateUI() {
    list.innerHTML = "";
    let total = 0;

    transactions.forEach((t, index) => {
        total += Number(t.amount);

        const li = document.createElement("li");
        li.textContent = `${t.description} : ₹ ${t.amount}`;
        list.appendChild(li);
    });

    balanceEl.textContent = total;
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const description = document.getElementById("description").value;
    const amount = document.getElementById("amount").value;

    transactions.push({ description, amount });

    form.reset();
    updateUI();
});

updateUI();
