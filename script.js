const form = document.getElementById("transaction-form");
const list = document.getElementById("transaction-list");

const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

let currentFilter = "all";

function updateUI() {
    list.innerHTML = "";

    let balance = 0;
    let income = 0;
    let expense = 0;

    transactions.forEach((t, index) => {
        const amount = Number(t.amount);

        balance += amount;
        if (amount > 0) income += amount;
        else expense += amount;

        if (
            currentFilter === "all" ||
            (currentFilter === "income" && amount > 0) ||
            (currentFilter === "expense" && amount < 0)
        ) {
            const li = document.createElement("li");

            li.innerHTML = `
                <span class="${amount > 0 ? 'income' : 'expense'}">
                    ${t.description} : ₹ ${amount}
                </span>
                <button class="delete-btn" onclick="deleteTransaction(${index})">X</button>
            `;

            list.appendChild(li);
        }
    });

    balanceEl.textContent = balance;
    incomeEl.textContent = income;
    expenseEl.textContent = Math.abs(expense);

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

function deleteTransaction(index) {
    transactions.splice(index, 1);
    updateUI();
}

function filterTransactions(type) {
    currentFilter = type;
    updateUI();
}

updateUI();
