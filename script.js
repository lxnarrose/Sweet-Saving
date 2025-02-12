document.addEventListener("DOMContentLoaded", () => {
    const goalAmountInput = document.getElementById("goalAmount");
    const goalReasonInput = document.getElementById("goalReason");
    const setGoalButton = document.getElementById("setGoal");

    const savedGoalSpan = document.getElementById("savedGoal");
    const savedReasonSpan = document.getElementById("savedReason");
    const currentSavingsSpan = document.getElementById("currentSavings");
    const progressSection = document.querySelector(".progress-section");
    const resetGoalButton = document.getElementById("resetGoal");

    const amountInput = document.getElementById("amount");
    const addMoneyButton = document.getElementById("addMoney");
    const removeMoneyButton = document.getElementById("removeMoney");
    const progressFill = document.querySelector(".progress-fill");

    let goalAmount = localStorage.getItem("goalAmount") || 0;
    let goalReason = localStorage.getItem("goalReason") || "";
    let currentSavings = localStorage.getItem("currentSavings") || 0;

    function updateUI() {
        if (goalAmount > 0) {
            savedGoalSpan.textContent = goalAmount;
            savedReasonSpan.textContent = goalReason;
            currentSavingsSpan.textContent = currentSavings;
            progressFill.style.width = (currentSavings / goalAmount) * 100 + "%";
            progressSection.classList.remove("hidden");
            resetGoalButton.classList.remove("hidden");
        } else {
            progressSection.classList.add("hidden");
            resetGoalButton.classList.add("hidden");
        }
    }

    setGoalButton.addEventListener("click", () => {
        goalAmount = parseInt(goalAmountInput.value) || 0;
        goalReason = goalReasonInput.value.trim();
        
        if (goalAmount > 0 && goalReason) {
            localStorage.setItem("goalAmount", goalAmount);
            localStorage.setItem("goalReason", goalReason);
            localStorage.setItem("currentSavings", 0);
            currentSavings = 0;
            updateUI();
        }
    });

    addMoneyButton.addEventListener("click", () => {
        let amount = parseInt(amountInput.value) || 0;
        if (amount > 0) {
            currentSavings = parseInt(currentSavings) + amount;
            localStorage.setItem("currentSavings", currentSavings);
            updateUI();
        }
    });

    removeMoneyButton.addEventListener("click", () => {
        let amount = parseInt(amountInput.value) || 0;
        if (amount > 0) {
            currentSavings = Math.max(0, parseInt(currentSavings) - amount);
            localStorage.setItem("currentSavings", currentSavings);
            updateUI();
        }
    });

    resetGoalButton.addEventListener("click", () => {
        if (confirm("¿Estás seguro de que quieres borrar esta meta?")) {
            localStorage.removeItem("goalAmount");
            localStorage.removeItem("goalReason");
            localStorage.removeItem("currentSavings");
            goalAmount = 0;
            goalReason = "";
            currentSavings = 0;
            updateUI();
        }
    });

    updateUI();
});
