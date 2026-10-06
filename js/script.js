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
    f_err:"Preencha todos os campos com um e-mail válido.", f_soon:"Validação ok. O envio por e-mail será ativado na próxima etapa."
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
    f_err:"Fill in all fields with a valid email.", f_soon:"Validation ok. Email sending will be enabled in the next stage."
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
}
document.querySelectorAll(".lang button").forEach(b =>
  b.addEventListener("click", () => setLang(b.dataset.lang)));
setLang(lang);

const form = document.getElementById("contact-form");
if (form) form.addEventListener("submit", e => {
  e.preventDefault();
  const status = document.getElementById("form-status");
  status.textContent = form.checkValidity() ? dict[lang].f_soon : dict[lang].f_err;
});
