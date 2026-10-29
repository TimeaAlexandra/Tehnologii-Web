const API_URL = "https://universities.hipolabs.com/search?country=Romania";

const statusDiv = document.getElementById("status");
const tbody = document.getElementById("tbody");
const qInput = document.getElementById("q");
const exportBtn = document.getElementById("exportBtn");

let all = [];

function setStatus(text) {
    if (statusDiv) statusDiv.textContent = text;
}

function render(data) {
    if (!tbody) return;
    if (!data || data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="3" style="text-align:center;">Nu s-a găsit nicio universitate.</td></tr>`;
        return;
    }
    tbody.innerHTML = data.map(u => {
        const siteUrl = (u.web_pages && u.web_pages[0]) ? u.web_pages[0] : "";
        const siteLink = siteUrl
            ? `<a href="${siteUrl}" target="_blank" rel="noopener noreferrer">${siteUrl}</a>`
            : "N/A";
        return `<tr>
            <td>${u.name || ""}</td>
            <td>${u.country || "Romania"}</td>
            <td>${siteLink}</td>
        </tr>`;
    }).join("");
}

async function loadUniversities() {
    setStatus("Se încarcă datele...");
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("A apărut o eroare la rețea");
        const data = await res.json();
        all = data;
        render(all);
        setStatus(`Încărcat (${all.length} rezultate).`);
    } catch (err) {
        console.error("Eroare API:", err);
        setStatus("Se afișează datele de rezervă.");
        
        // Date de rezervă locale în caz că conexiunea la API este blocată
        all = [
            { name: "Universitatea de Vest din Timișoara", country: "Romania", web_pages: ["https://www.uvt.ro"] },
            { name: "Universitatea Politehnica Timișoara", country: "Romania", web_pages: ["https://www.upt.ro"] },
            { name: "Universitatea din București", country: "Romania", web_pages: ["https://unibuc.ro"] },
            { name: "Universitatea Babeș-Bolyai din Cluj-Napoca", country: "Romania", web_pages: ["https://www.ubbcluj.ro"] },
            { name: "Universitatea Alexandru Ioan Cuza din Iași", country: "Romania", web_pages: ["https://www.uaic.ro"] }
        ];
        render(all);
    }
}

if (qInput) {
    qInput.addEventListener("input", () => {
        const q = qInput.value.trim().toLowerCase();
        const filtered = q
            ? all.filter(u => (u.name || "").toLowerCase().includes(q))
            : all;
        render(filtered);
        setStatus(`Filtrate: ${filtered.length} din ${all.length}.`);
    });
}

function exportCSV(data) {
    if (!data || !data.length) return alert("Nu există date de exportat.");
    const header = ["Nume", "Tara", "Site"];
    const rows = data.map(u => [
        u.name || "",
        u.country || "Romania",
        (u.web_pages && u.web_pages[0]) || ""
    ]);
    const csvContent = [header, ...rows]
        .map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(","))
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "universitati_romania.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

if (exportBtn) {
    exportBtn.addEventListener("click", () => {
        const q = qInput ? qInput.value.trim().toLowerCase() : "";
        const filtered = q
            ? all.filter(u => (u.name || "").toLowerCase().includes(q))
            : all;
        exportCSV(filtered);
    });
}

// Executăm direct încărcarea
loadUniversities();