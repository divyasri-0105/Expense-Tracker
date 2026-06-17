const nameInput = document.getElementById("nameInput");
const amountInput = document.getElementById("amountInput");
const typeInput = document.getElementById("typeInput");
const addButton = document.getElementById("addButton");
const incomeTotal = document.getElementById("incomeTotal");
const expenseTotal = document.getElementById("expenseTotal");
const balanceTotal = document.getElementById("balanceTotal");
const transactionList = document.getElementById("transactionList");

let transactions = [];

const savedTransactions = localStorage.getItem("transactions");
if(savedTransactions){
    transactions = JSON.parse(savedTransactions);
}

function renderTransactions(){
    transactionList.innerHTML = "";

    let income = 0;
    let expense = 0;

    transactions.forEach(function(transaction, index){
        if(transaction.type === "income"){
            income += Number(transaction.amount);
        }else{
            expense += Number(transaction.amount);
        }

        const newTransaction = document.createElement("li");
       
        const sign = transaction.type === "income" ? "+" : "-";
        newTransaction.textContent = transaction.name + " " + sign + " ₹" + transaction.amount;
        newTransaction.classList.add(transaction.type);
        
        newTransaction.addEventListener("dblclick", function(){
        transactions.splice(index, 1);

        localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

    renderTransactions();
        });

        transactionList.appendChild(newTransaction);
});

    incomeTotal.textContent = "₹" + income;
    expenseTotal.textContent = "₹" + expense;
    balanceTotal.textContent = "₹" + (income - expense);

}
addButton.addEventListener("click", function(){
const name = nameInput.value.trim();
const amount = amountInput.value;
const type = typeInput.value;

if(name === "" || amount === ""){
    return;
}

const transaction = {
    name,
    amount,
    type
};

transactions.push(transaction);
localStorage.setItem("transactions", JSON.stringify(transactions));

renderTransactions();

nameInput.value = "";
amountInput.value = "";
typeInput.value = "income";

});

renderTransactions();