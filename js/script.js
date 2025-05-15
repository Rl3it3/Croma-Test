
document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("product-container");
  const products = Array.from(container.querySelectorAll(".product-card"));
  const pagination = document.getElementById("pagination");
  const itemsPerPage = 25;
  let currentPage = 1;

  function renderPage(page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    products.forEach((product, index) => {
      product.style.display = index >= start && index < end ? "flex" : "none";
    });
    renderPagination(page);
  }

  function renderPagination(current) {
    pagination.innerHTML = "";
    const totalPages = Math.ceil(products.length / itemsPerPage);

    const createButton = (text, page = null, active = false, disabled = false) => {
      const btn = document.createElement("button");
      btn.textContent = text;
      if (active) btn.classList.add("active");
      if (disabled) btn.classList.add("disabled");
      if (page !== null && !disabled) {
        btn.addEventListener("click", () => {
          currentPage = page;
          renderPage(page);
        });
      }
      pagination.appendChild(btn);
    };

    // Previous button
    createButton("<", currentPage - 1, false, currentPage === 1);

    // Page buttons logic
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        createButton(i, i, i === currentPage);
      }
    } else {
      createButton(1, 1, currentPage === 1);
      if (currentPage > 3) createButton("...", null, false, true);

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        createButton(i, i, i === currentPage);
      }

      if (currentPage < totalPages - 2) createButton("...", null, false, true);
      createButton(totalPages, totalPages, currentPage === totalPages);
    }

    // Next button
    createButton(">", currentPage + 1, false, currentPage === totalPages);
  }

  renderPage(currentPage);
});
