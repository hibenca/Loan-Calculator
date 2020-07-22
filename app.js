// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e) {
    
    // Hide results
    document.getElementById('results').style.display = "none";

    // Show loader
    document.getElementById('loading').style.display = "block";

    setTimeout(calculateResult, 2000);

    e.preventDefault();
});

// Calculate Results
function calculateResult() {
    // UI Variables
    const loanAmount = document.getElementById('loan-amount');
    const loanInterest = document.getElementById('loan-interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    // Math
    const principal = parseFloat(loanAmount.value);
    const calculatedInterest = parseFloat(loanInterest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // Compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
        
        // Hide loader
        document.getElementById('loading').style.display = "none";

        // Show results
        document.getElementById('results').style.display = "block";

    } else {
        showError("Please check your numbers");
    }
};

// Error Message
function showError(error) {
    // Hide loader
    document.getElementById('loading').style.display = "none";

    // Hide results
    document.getElementById('results').style.display = "none";

    // Create a div
    const errorDiv = document.createElement("div");

    // Get elements
    const header = document.querySelector('.heading');
    const card = document.querySelector('.card');

    // Add class
    errorDiv.className = "alert alert-danger";

    // Create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    // Insert error above heading
    card.insertBefore(errorDiv, header);

    // Clear error after 3 seconds
    setTimeout(clearError, 3000);
};

// Clear error
function clearError() {
    document.querySelector('.alert').remove();
};