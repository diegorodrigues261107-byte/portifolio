const dict = {
  pt: {
    brand_sub:"Estudante de Ciência da Computação · PUC Minas",
    nav_about:"Sobre Mim", nav_proj:"Projetos", nav_exp:"Experiências", nav_ct:"Contato",
    about_title:"Olá, eu sou o Diego",
    about_lead:"Estudante de Ciência da Computação na PUC Minas, curioso por dados, inteligência artificial, cibersegurança e desenvolvimento web.",
    about_edu_h:"Formação", about_edu:"Ciência da Computação, PUC Minas, 2º período.",
    about_int_h:"Interesses", about_int:"Dados e IA, cibersegurança e web.",
    about_goal_h:"Objetivos", about_goal:"Aprender na prática, construir projetos e conquistar um estágio na área de tecnologia.",
    about_cta1:"Ver projetos", about_cta2:"Fale comigo", about_tools_h:"Ferramentas que estou usando",
    proj_title:"Projetos", proj_lead:"Linha do tempo, do mais antigo ao mais recente.",
    proj_ex:"Este site. Os projetos reais serão carregados dinamicamente na próxima etapa.",
    exp_title:"Experiências", exp_lead:"Estágios, freelas, projetos open source e eventos técnicos.",
    exp_ex_h:"Instituição / empresa", exp_ex_d:"Cargo ou atividade · Período",
    exp_ex_p:"Descrição breve da experiência. Será preenchida na próxima etapa.",
    ct_title:"Contato", ct_lead:"Vamos conversar? Escolha um canal ou envie uma mensagem.",
    f_name:"Nome", f_mail:"E-mail", f_msg:"Mensagem", f_send:"Enviar mensagem",
    f_err_name:"Informe seu nome (mínimo 2 letras).", f_err_mail:"Informe um e-mail válido.", f_err_msg:"Escreva uma mensagem (mínimo 10 caracteres).",
    f_sending:"Enviando...", f_ok:"Mensagem enviada! Obrigado pelo contato.", f_fail:"Não foi possível enviar. Tente novamente ou use o e-mail acima.", f_cfg:"Envio ainda não configurado (faltam as chaves do EmailJS).",
    view_repo:"Ver no GitHub", no_img:"Imagem do projeto em breve"
  },
  en: {
    brand_sub:"Computer Science student · PUC Minas",
    nav_about:"About", nav_proj:"Projects", nav_exp:"Experience", nav_ct:"Contact",
    about_title:"Hi, I'm Diego",
    about_lead:"Computer Science student at PUC Minas, curious about data, artificial intelligence, cybersecurity and web development.",
    about_edu_h:"Education", about_edu:"Computer Science, PUC Minas, 2nd semester.",
    about_int_h:"Interests", about_int:"Data and AI, cybersecurity and web.",
    about_goal_h:"Goals", about_goal:"Learn by doing, build projects and land an internship in tech.",
    about_cta1:"View projects", about_cta2:"Get in touch", about_tools_h:"Tools I am using",
    proj_title:"Projects", proj_lead:"Timeline, from oldest to most recent.",
    proj_ex:"This website. Real projects will be loaded dynamically in the next stage.",
    exp_title:"Experience", exp_lead:"Internships, freelance work, open source and tech events.",
    exp_ex_h:"Institution / company", exp_ex_d:"Role or activity · Period",
    exp_ex_p:"Short description of the experience. To be filled in the next stage.",
    ct_title:"Contact", ct_lead:"Let's talk! Pick a channel or send a message.",
    f_name:"Name", f_mail:"Email", f_msg:"Message", f_send:"Send message",
    f_err_name:"Enter your name (at least 2 letters).", f_err_mail:"Enter a valid email.", f_err_msg:"Write a message (at least 10 characters).",
    f_sending:"Sending...", f_ok:"Message sent! Thanks for reaching out.", f_fail:"Could not send. Try again or use the email above.", f_cfg:"Sending not configured yet (EmailJS keys missing).",
    view_repo:"View on GitHub", no_img:"Project image coming soon"
  }
};
let lang = "pt";
try { lang = localStorage.getItem("lang") || "pt"; } catch (e) {}

function setLang(l) {
  lang = l;
  document.documentElement.lang = l === "pt" ? "pt-BR" : "en";
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const t = dict[l][el.dataset.i18n];
    if (t) el.textContent = t;
  });
  document.querySelectorAll(".lang button").forEach(b =>
    b.setAttribute("aria-pressed", b.dataset.lang === l));
  try { localStorage.setItem("lang", l); } catch (e) {}
  renderTimeline();
  renderExperiences();
}
document.querySelectorAll(".lang button").forEach(b =>
  b.addEventListener("click", () => setLang(b.dataset.lang)));
setLang(lang);

// ---------- Projetos (timeline dinâmica) ----------
function esc(s) {
  const d = document.createElement("div");
  d.textContent = s;
  return d.innerHTML;
}
function renderTimeline() {
  const ol = document.getElementById("timeline");
  if (!ol || typeof projects === "undefined") return;
  const t = dict[lang];
  ol.innerHTML = [...projects].sort((a, b) => a.year - b.year).map(p => `
    <li>
      <span class="date">${p.year}</span>
      <h3>${esc(p.name[lang])}</h3>
      <p>${esc(p.desc[lang])}</p>
      <p class="tags">${p.tech.map(esc).join(" · ")}</p>
      ${p.image
        ? `<img class="shot" src="${esc(p.image)}" alt="${esc(p.name[lang])}" loading="lazy">`
        : `<div class="shot empty">${t.no_img}</div>`}
      <a class="btn ghost" href="${esc(p.repo)}" target="_blank" rel="noopener">${t.view_repo}</a>
    </li>`).join("");
}

// ---------- Experiências ----------
function renderExperiences() {
  const box = document.getElementById("exp-list");
  if (!box || typeof experiences === "undefined") return;
  box.innerHTML = experiences.map(e => `
    <article class="card">
      <h3>${esc(e.org[lang])}</h3>
      <p class="date">${esc(e.role[lang])} · ${esc(typeof e.period === "object" ? e.period[lang] : e.period)}</p>
      <p>${esc(e.desc[lang])}</p>
    </article>`).join("");
}

// ---------- Contato (validação + EmailJS) ----------
const EMAILJS = { publicKey: "WaYtobjotkSzu5hO0", serviceId: "service_9n7bnbj", templateId: "template_e379nvd" }; 

const form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const t = dict[lang];
    const status = document.getElementById("form-status");
    const name = form.nome.value.trim();
    const msg = form.mensagem.value.trim();
    if (name.length < 2) return (status.textContent = t.f_err_name);
    if (!form.email.checkValidity() || !form.email.value.trim()) return (status.textContent = t.f_err_mail);
    if (msg.length < 10) return (status.textContent = t.f_err_msg);
    if (!EMAILJS.publicKey || typeof emailjs === "undefined") return (status.textContent = t.f_cfg);

    status.textContent = t.f_sending;
    try {
      await emailjs.sendForm(EMAILJS.serviceId, EMAILJS.templateId, form, { publicKey: EMAILJS.publicKey });
      status.textContent = t.f_ok;
      form.reset();
    } catch (err) {
      status.textContent = t.f_fail;
    }
  });
}
