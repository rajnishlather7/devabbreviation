(function () {
  "use strict";

  const els = {
    tabs: document.getElementById("lifecycle-tabs"),
    view: document.getElementById("lifecycle-view"),
  };

  // Nothing to render on pages/builds that don't include the lifecycle data.
  if (!els.tabs || !els.view || typeof LIFECYCLES === "undefined") return;

  let activeId = LIFECYCLES.length ? LIFECYCLES[0].id : null;

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));
  }

  function buildTabs() {
    els.tabs.innerHTML = "";
    LIFECYCLES.forEach((lc) => {
      const btn = document.createElement("button");
      btn.className = "filter-btn" + (lc.id === activeId ? " active" : "");
      btn.dataset.lifecycle = lc.id;
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-selected", lc.id === activeId ? "true" : "false");
      btn.textContent = lc.title;

      btn.addEventListener("click", () => {
        activeId = lc.id;
        els.tabs.querySelectorAll(".filter-btn").forEach((b) => {
          b.classList.toggle("active", b === btn);
          b.setAttribute("aria-selected", b === btn ? "true" : "false");
        });
        renderView();
      });

      els.tabs.appendChild(btn);
    });
  }

  function renderView() {
    const lc = LIFECYCLES.find((l) => l.id === activeId);

    if (!lc) {
      els.view.innerHTML = `<p class="empty-state">No lifecycle to show yet — add one to data/lifecycles.js.</p>`;
      return;
    }

    const stepsHtml = lc.steps
      .map((step, i) => {
        const arrow = i < lc.steps.length - 1
          ? `<div class="lc-arrow" aria-hidden="true">↓</div>`
          : "";
        return `
          <div class="lc-step">
            <div class="lc-step-num">${i + 1}</div>
            <div class="lc-step-body">
              <div class="lc-step-top">
                <span class="lc-step-label">${escapeHtml(step.label)}</span>
                ${step.tag ? `<span class="lc-step-tag">${escapeHtml(step.tag)}</span>` : ""}
              </div>
              ${step.detail ? `<p class="lc-step-detail">${escapeHtml(step.detail)}</p>` : ""}
            </div>
          </div>
          ${arrow}
        `;
      })
      .join("");

    els.view.innerHTML = `
      <div class="lc-header">
        ${lc.tagline ? `<p class="eyebrow">${escapeHtml(lc.tagline)}</p>` : ""}
        <h2 class="lc-title">${escapeHtml(lc.title)}</h2>
        ${lc.summary ? `<p class="lc-summary">${escapeHtml(lc.summary)}</p>` : ""}
      </div>
      <div class="lc-flow">${stepsHtml}</div>
    `;
  }

  buildTabs();
  renderView();
})();
