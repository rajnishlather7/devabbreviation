(function () {
  "use strict";

  const nav = document.getElementById("page-tabs");
  const pages = {
    reference: document.getElementById("page-reference"),
    lifecycles: document.getElementById("page-lifecycles"),
  };

  if (!nav) return;

  nav.addEventListener("click", (e) => {
    const btn = e.target.closest(".page-tab");
    if (!btn) return;

    const target = btn.dataset.page;

    nav.querySelectorAll(".page-tab").forEach((b) => {
      b.classList.toggle("active", b === btn);
      b.setAttribute("aria-selected", b === btn ? "true" : "false");
    });

    Object.entries(pages).forEach(([key, el]) => {
      if (!el) return;
      el.hidden = key !== target;
    });
  });
})();
