const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menu-toggle");
const mobileScrim = document.getElementById("mobile-scrim");
const sideLinks = document.querySelectorAll(".side-link[href^='#']");
const orderSearch = document.getElementById("order-search");
const globalSearch = document.getElementById("global-search");
const statusFilter = document.getElementById("status-filter");
const orderRows = [...document.querySelectorAll("#orders-body tr")];
const emptyState = document.getElementById("empty-state");
const notificationMessage = document.getElementById("notification-message");

document.getElementById("dashboard-date").textContent = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
}).format(new Date()).toUpperCase();
document.getElementById("copyright-year").textContent = String(new Date().getFullYear());

const setSidebarOpen = (isOpen) => {
  sidebar.classList.toggle("is-open", isOpen);
  mobileScrim.classList.toggle("is-visible", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
};

menuToggle.addEventListener("click", () => {
  setSidebarOpen(!sidebar.classList.contains("is-open"));
});

mobileScrim.addEventListener("click", () => setSidebarOpen(false));

document.getElementById("notification-button").addEventListener("click", () => {
  notificationMessage.hidden = !notificationMessage.hidden;
});

document.addEventListener("click", (event) => {
  if (!event.target.closest("#notification-button, #notification-message")) {
    notificationMessage.hidden = true;
  }
});

sideLinks.forEach((link) => {
  link.addEventListener("click", () => {
    sideLinks.forEach((item) => item.classList.remove("is-active"));
    link.classList.add("is-active");
    setSidebarOpen(false);
  });
});

const filterOrders = () => {
  const query = orderSearch.value.trim().toLowerCase();
  const selectedStatus = statusFilter.value;
  let visibleCount = 0;

  orderRows.forEach((row) => {
    const matchesQuery = row.textContent.toLowerCase().includes(query);
    const matchesStatus = selectedStatus === "all" || row.dataset.status === selectedStatus;
    const isVisible = matchesQuery && matchesStatus;

    row.hidden = !isVisible;
    visibleCount += Number(isVisible);
  });

  emptyState.hidden = visibleCount > 0;
};

orderSearch.addEventListener("input", filterOrders);
statusFilter.addEventListener("change", filterOrders);

globalSearch.addEventListener("input", () => {
  orderSearch.value = globalSearch.value;
  filterOrders();
  if (globalSearch.value) {
    document.getElementById("orders").scrollIntoView({ behavior: "smooth", block: "start" });
  }
});

document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    globalSearch.focus();
  }

  if (event.key === "Escape") {
    setSidebarOpen(false);
    globalSearch.blur();
    orderSearch.blur();
  }
});

document.getElementById("export-report").addEventListener("click", () => {
  const headers = ["Order ID", "Customer", "Date & time", "Amount", "Status"];
  const rows = orderRows.map((row) => {
    const cells = [...row.cells].map((cell) => `"${cell.innerText.trim().replace(/"/g, '""')}"`);
    return cells.join(",");
  });
  const csv = [headers.map((header) => `"${header}"`).join(","), ...rows].join("\r\n");
  const file = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");

  link.href = url;
  link.download = "burger-house-orders.csv";
  link.click();
  URL.revokeObjectURL(url);
});
