const form = document.getElementById("transaction-form");
const list = document.getElementById("transaction-list");

const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

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

        const li = document.createElement("li");

        li.innerHTML = `
            <div>
                <strong>${t.description}</strong><br>
                <small>${t.date}</small>
            </div>
            <div>
                <span class="${amount > 0 ? 'income-text' : 'expense-text'}">
                    ₹ ${amount}
                </span>
                <button class="delete-btn" onclick="deleteTransaction(${index})">X</button>
            </div>
        `;

        list.appendChild(li);
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
    const date = document.getElementById("date").value;

    transactions.push({ description, amount, date });

    form.reset();
    updateUI();
});

function deleteTransaction(index) {
    transactions.splice(index, 1);
    updateUI();
}
