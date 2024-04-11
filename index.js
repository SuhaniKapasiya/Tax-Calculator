document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("taxForm");
  const modal = document.getElementById("resultModal");
  const closeButton = document.querySelector(".close");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    calculateTax();
  });

  closeButton.addEventListener("click", function () {
    modal.style.display = "none";
  });

  function calculateTax() {
    // Fetch input values and parse them as numbers
    const grossIncome = parseFloat(
      document.getElementById("grossIncome").value.replace(/,/g, "")
    );
    const extraIncome = parseFloat(
      document.getElementById("extraIncome").value.replace(/,/g, "")
    );
    const age = document.getElementById("age").value;
    const deductions = parseFloat(
      document.getElementById("deductions").value.replace(/,/g, "")
    );

    // Check for errors
    let isError = false;
    if (isNaN(grossIncome) || grossIncome < 0) {
      document.getElementById("grossIncomeError").style.display = "inline";
      isError = true;
    } else {
      document.getElementById("grossIncomeError").style.display = "none";
    }
    if (isNaN(extraIncome) || extraIncome < 0) {
      document.getElementById("extraIncomeError").style.display = "inline";
      isError = true;
    } else {
      document.getElementById("extraIncomeError").style.display = "none";
    }
    if (!age) {
      document.getElementById("ageError").style.display = "inline";
      isError = true;
    } else {
      document.getElementById("ageError").style.display = "none";
    }
    if (isNaN(deductions) || deductions < 0) {
      document.getElementById("deductionsError").style.display = "inline";
      isError = true;
    } else {
      document.getElementById("deductionsError").style.display = "none";
    }

    if (isError) return;

    // Perform tax calculation
    let overallIncome = grossIncome + extraIncome - deductions;
    let taxAmount = 0;

    // Apply tax calculation only if income is over 800,000
    if (overallIncome > 800000) {
      switch (age) {
        case "<40":
          taxAmount = 0.3 * (overallIncome - 800000);
          break;
        case "≥ 40 & < 60":
          taxAmount = 0.4 * (overallIncome - 800000);
          break;
        case "≥ 60":
          taxAmount = 0.1 * (overallIncome - 800000);
          break;
        default:
          break;
      }
    }

    // Calculate overall income after tax deduction
    let income = overallIncome - taxAmount;

    // Display result in modal
    const taxResultElement = document.getElementById("taxResult");
    taxResultElement.textContent = `Your overall income after tax deduction will be: ₹${income.toLocaleString()} Lakhs`;
    modal.style.display = "block";
  }
});
