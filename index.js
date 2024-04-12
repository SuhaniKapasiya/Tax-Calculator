document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("taxForm");
  const modal = document.getElementById("resultModal");
  const closeButton = document.querySelector(".close");
  const incomeAmountElement = document.getElementById("incomeAmount");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

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

    let Overallincome = calculateTax(grossIncome, extraIncome, age, deductions);
    incomeAmountElement.textContent = Overallincome.toLocaleString();
    modal.style.display = "block";
  });

  closeButton.addEventListener("click", function () {
    modal.style.display = "none";
  });

  function calculateTax(gross, extra, age, deduction) {
    let Overallincome = gross + extra - deduction;
    if (Overallincome <= 800000) {
      return Overallincome;
    } else {
      let taxRate;
      if (age == "< 40") {
        taxRate = 0.3 * (Overallincome - 800000);
      } else if (age == "≥ 40 & < 60") {
        taxRate = 0.4 * (Overallincome - 800000);
      } else {
        taxRate = 0.1 * (Overallincome - 800000);
      }
      return Overallincome - taxRate;
    }
  }
});
