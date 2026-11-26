const pages = [...document.querySelectorAll(".page")];
const tabs = [...document.querySelectorAll(".tab")];
const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector(".tabs");

function showPage(id) {
  pages.forEach(page => page.classList.toggle("active", page.id === id));
  tabs.forEach(tab => tab.classList.toggle("active", tab.dataset.tab === id));
  nav.classList.remove("open");
  menu.setAttribute("aria-expanded", "false");
  menu.textContent = "☰";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

tabs.forEach(tab => tab.addEventListener("click", () => showPage(tab.dataset.tab)));
document.querySelectorAll("[data-go]").forEach(button => {
  button.addEventListener("click", () => showPage(button.dataset.go));
});
document.querySelector(".brand").addEventListener("click", event => {
  event.preventDefault();
  showPage("inicio");
});
menu.addEventListener("click", () => {
  const opened = nav.classList.toggle("open");
  menu.setAttribute("aria-expanded", String(opened));
  menu.textContent = opened ? "×" : "☰";
});

const bookSummaries = {
  "bar-don-juan": {
    title: "Bar Don Juan — Antônio Callado",
    text: "Publicado em 1971, o romance acompanha personagens ligados à oposição à ditadura militar. Entre conversas, planos e conflitos, a obra examina a tentativa de organizar a resistência, a violência do Estado e as contradições de grupos que desejavam transformar o país. É uma narrativa sobre o ideal revolucionário e suas dificuldades no contexto dos anos de chumbo."
  },
  "ditadura-escancarada": {
    title: "A Ditadura Escancarada — Elio Gaspari",
    text: "Parte da série As Ilusões Armadas, o livro investiga o endurecimento do regime militar, especialmente após o AI-5, em 1968. Com base em documentos e depoimentos, aborda a estrutura da repressão, a censura, a tortura e as decisões dos principais atores políticos. É uma obra de pesquisa histórica, não um romance."
  },
  "feliz-ano-novo": {
    title: "Feliz Ano Novo — Rubem Fonseca",
    text: "Publicado em 1975, reúne contos que expõem desigualdades, violência urbana, tensões sociais e diferentes formas de brutalidade presentes na sociedade brasileira. A linguagem direta e os temas fortes provocaram controvérsia, e o livro foi proibido pela censura em 1976."
  }
};
const bookModal = document.querySelector("#book-modal");
document.querySelectorAll(".book-open").forEach(button => {
  button.addEventListener("click", () => {
    const item = bookSummaries[button.dataset.book];
    document.querySelector("#modal-title").textContent = item.title;
    document.querySelector("#modal-text").textContent = item.text;
    bookModal.classList.add("open");
    bookModal.setAttribute("aria-hidden", "false");
  });
});
function closeBookModal() {
  bookModal.classList.remove("open");
  bookModal.setAttribute("aria-hidden", "true");
}
document.querySelector(".modal-close").addEventListener("click", closeBookModal);
bookModal.addEventListener("click", event => {
  if (event.target === bookModal) closeBookModal();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeBookModal();
});
