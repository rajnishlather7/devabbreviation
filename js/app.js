(function () {
  "use strict";

  const CATEGORIES = [
    { key: "all", label: "All" },
    { key: "core", label: "Core" },
    { key: "web", label: "Web" },
    { key: "networking", label: "Networking" },
    { key: "security", label: "Security" },
    { key: "devops", label: "DevOps" },
    { key: "data", label: "Data / AI" },
    { key: "architecture", label: "Architecture" },
    { key: "hardware", label: "Hardware" },
  ];

  const els = {
    search: document.getElementById("search-input"),
    filterRow: document.getElementById("filter-row"),
    grid: document.getElementById("grid"),
    resultCount: document.getElementById("result-count"),
    emptyState: document.getElementById("empty-state"),
  };

  let activeCat = "all";
  let query = "";

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));
  }

  function highlight(text, q) {
    if (!q) return escapeHtml(text);
    const escaped = escapeHtml(text);
    const escapedQ = escapeHtml(q).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return escaped.replace(new RegExp(`(${escapedQ})`, "ig"), "<mark>$1</mark>");
  }

  function buildFilterRow() {
    CATEGORIES.forEach((cat) => {
      const btn = document.createElement("button");
      btn.className = "filter-btn" + (cat.key === "all" ? " active" : "");
      btn.dataset.cat = cat.key;
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-selected", cat.key === "all" ? "true" : "false");

      if (cat.key !== "all") {
        const dot = document.createElement("span");
        dot.className = "dot";
        dot.setAttribute("aria-hidden", "true");
        btn.appendChild(dot);
      }

      const label = document.createTextNode(cat.label);
      btn.appendChild(label);

      btn.addEventListener("click", () => {
        activeCat = cat.key;
        document.querySelectorAll(".filter-btn").forEach((b) => {
          b.classList.toggle("active", b === btn);
          b.setAttribute("aria-selected", b === btn ? "true" : "false");
        });
        render();
      });

      els.filterRow.appendChild(btn);
    });
  }

  function matches(item, q) {
    if (!q) return true;
    const haystack = (item.a + " " + item.f + " " + item.d + " " + (item.s || "")).toLowerCase();
    return haystack.includes(q);
  }

  function render() {
    const q = query.trim().toLowerCase();

    const filtered = ABBREVIATIONS.filter((item) => {
      const catOk = activeCat === "all" || item.c === activeCat;
      return catOk && matches(item, q);
    });

    els.resultCount.textContent =
      filtered.length + " term" + (filtered.length === 1 ? "" : "s");

    if (filtered.length === 0) {
      els.grid.innerHTML = "";
      els.emptyState.hidden = false;
      return;
    }
    els.emptyState.hidden = true;

    const catLabel = Object.fromEntries(CATEGORIES.map((c) => [c.key, c.label]));

    els.grid.innerHTML = filtered
      .map((item) => `
        <article class="card" data-cat="${item.c}">
          <div class="card-top">
            <span class="card-abbr">${highlight(item.a, q)}</span>
            <span class="card-tag">${catLabel[item.c] || item.c}${item.s ? ` <span class="card-subtype">/ ${escapeHtml(item.s)}</span>` : ""}</span>
          </div>
          <div class="card-full">${highlight(item.f, q)}</div>
          <p class="card-def">${highlight(item.d, q)}</p>
        </article>
      `)
      .join("");
  }

  els.search.addEventListener("input", (e) => {
    query = e.target.value;
    render();
  });

  // "/" focuses search, like GitHub/Linear
  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && document.activeElement !== els.search) {
      e.preventDefault();
      els.search.focus();
    }
    if (e.key === "Escape" && document.activeElement === els.search) {
      els.search.blur();
    }
  });

  function setTermCountEyebrow() {
    const eyebrow = document.getElementById("term-count-eyebrow");
    if (!eyebrow) return;
    const catCount = CATEGORIES.length - 1; // exclude "All"
    eyebrow.textContent = `${ABBREVIATIONS.length} terms · ${catCount} categories · zero fluff`;
  }

  buildFilterRow();
  setTermCountEyebrow();
  render();
})();
