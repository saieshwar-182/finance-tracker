let transactions = [];
let currentType  = 'expense';

const ICONS = {
  Groceries: '🛒', Rent: '🏠', Utilities: '⚡',
  Health: '💊', Travel: '🚗', Dining: '🍽️', Other: '📦', Income: '💵'
};

function setType(type) {
  currentType = type;
  document.getElementById('btnExpense').className = type === 'expense' ? 'active expense' : '';
  document.getElementById('btnIncome').className  = type === 'income'  ? 'active income'  : '';
  document.getElementById('catSelect').style.display = type === 'income' ? 'none' : 'block';
}

function addEntry() {
  const amt  = parseFloat(document.getElementById('amtInput').value);
  const cat  = currentType === 'income' ? 'Income' : document.getElementById('catSelect').value;
  const note = document.getElementById('noteInput').value.trim() || cat;

  if (!amt || amt <= 0) { alert('Please enter a valid amount.'); return; }

  const date = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  transactions.unshift({ type: currentType, cat, note, amt, date });

  document.getElementById('amtInput').value  = '';
  document.getElementById('noteInput').value = '';
  render();
}

function render() {
  // Totals
  const income  = transactions.filter(t => t.type === 'income') .reduce((s, t) => s + t.amt, 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amt, 0);
  document.getElementById('totalIncome').textContent  = '₹' + income.toLocaleString('en-IN');
  document.getElementById('totalExpense').textContent = '₹' + expense.toLocaleString('en-IN');
  document.getElementById('balance').textContent      = '₹' + (income - expense).toLocaleString('en-IN');

  // Transaction list
  const list = document.getElementById('txnList');
  if (transactions.length === 0) {
    list.innerHTML = '<p class="empty">No transactions yet.</p>';
    return;
  }
  list.innerHTML = transactions.map(t => {
    const sign = t.type === 'income' ? '+' : '−';
    const cls  = t.type === 'income' ? 'pos' : 'neg';
    const icon = ICONS[t.cat] || '📦';
    return `
      <div class="txn">
        <div class="txn-icon">${icon}</div>
        <div class="txn-info">
          <div class="note">${t.note}</div>
          <div class="meta">${t.date} · ${t.cat}</div>
        </div>
        <div class="txn-amt ${cls}">${sign}₹${t.amt.toLocaleString('en-IN')}</div>
      </div>`;
  }).join('');
}

render();
