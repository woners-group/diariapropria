/* =========================================================
   Diária Própria — monta a página a partir de content/textos-landing.js
   e cuida das interações. Para editar textos/ofertas, use content/textos-landing.js.
   ========================================================= */
(function () {
  "use strict";

  const D = window.SITE_DATA;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Utilitários ---------- */
  const get = (path) => path.split(".").reduce((o, k) => (o == null ? undefined : o[k]), D);
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const resolveLink = (l) => (D.links && D.links[l]) || l || "#oferta";
  // valor do plano para o pixel: usa "valor" se existir, senão converte "preco" ("19,90" → 19.9)
  const valorDoPlano = (p) => Number(p.valor ?? String(p.preco).replace(/\./g, "").replace(",", ".")) || 0;
  const ico = (n, c) => (window.ICON ? window.ICON(n, c) : "");
  const brl = (n) => "R$ " + Math.round(n).toLocaleString("pt-BR");

  /* ---------- Modelos das listas ---------- */
  const templates = {
    "hero.numeros": (n) =>
      `<li><strong${n.contar ? ` data-count="${Number(n.contar)}" data-suffix="${esc(n.sufixo || "")}"` : ""}>${n.valor}</strong><span>${n.legenda}</span></li>`,

    "hero.etiquetas": (c, i) => `<li class="chip chip--${i + 1}">${ico(c.icone)}<span>${c.texto}</span></li>`,

    "oferta.selos": (c) => `<li>${ico(c.icone)}<span>${c.texto}</span></li>`,

    "dor.sem.itens": (t) => `<li>${t}</li>`,
    "dor.com.itens": (t) => `<li>${t}</li>`,

    "modulos.itens": (m, i) => `
      <li class="module" data-mod="${i + 1}">
        <span class="module__num">${String(i + 1).padStart(2, "0")}</span>
        <h3>${m.titulo}</h3>
        <p>${m.texto}</p>
      </li>`,

    "bonus.itens": (b, i) => `
      <article class="bonus">
        <div class="bonus__cover bonus__cover--${(i % 5) + 1}"><span>${b.rotulo || "Bônus " + (i + 1)}</span>${ico(b.icone || "star", "bonus__ico")}</div>
        <h3>${b.titulo}</h3>
        <p>${b.texto}</p>
      </article>`,

    "depoimentos.itens": (r, i) => {
      const avatarCls = ["", " avatar--b", " avatar--c", " avatar--d"][i % 4];
      const n = Math.max(0, Math.min(5, Number(r.estrelas ?? 5)));
      return `
      <figure class="review">
        <div class="review__stars" aria-label="${n} estrelas">${"★".repeat(n)}${"☆".repeat(5 - n)}</div>
        <blockquote>“${r.texto}”</blockquote>
        <figcaption>
          <span class="avatar${avatarCls}">${esc((r.nome || "?").trim().charAt(0).toUpperCase())}</span>
          <span><strong>${r.nome}</strong><small>${r.cidade || ""}</small></span>
          ${r.verificado ? '<em class="verified">✓ Verificado</em>' : ""}
        </figcaption>
      </figure>`;
    },

    "oferta.planos": (p) => `
      <article class="plan${p.destaque ? " plan--featured" : ""}">
        ${p.faixa ? `<p class="plan__ribbon">${p.faixa}</p>` : ""}
        <p class="plan__tag">${p.etiqueta || ""}</p>
        <h3 class="plan__name">${p.nome}</h3>
        <p class="plan__desc">${p.descricao || ""}</p>
        <ul class="checklist">${(p.itens || []).map((t) => /^✕\s*/.test(t) ? `<li class="is-off">${t.replace(/^✕\s*/, "")}</li>` : `<li>${t}</li>`).join("")}</ul>
        <div class="price">
          ${p.precoDe ? `<s>${p.precoDe}</s>` : ""}
          ${p.precoChamada ? `<span>${p.precoChamada}</span>` : ""}
          <strong><sup>R$</sup>${p.preco}</strong>
          ${p.precoNota ? `<small>${p.precoNota}</small>` : ""}
        </div>
        <a class="btn ${p.destaque ? "btn--primary btn--pulse" : "btn--outline"} btn--block"
           href="${esc(resolveLink(p.link))}" target="_blank" rel="noopener"
           data-checkout-valor="${valorDoPlano(p)}" data-checkout-plano="${esc(p.nome)}">${p.botao}</a>
      </article>`,

    "faq.itens": (f) => `
      <details>
        <summary>${f.pergunta}</summary>
        <p>${f.resposta}</p>
      </details>`,
  };

  /* ---------- Monta a página ---------- */
  function render() {
    // SEO
    if (D.meta) {
      if (D.meta.title) document.title = D.meta.title;
      const md = $('meta[name="description"]');
      if (md && D.meta.description) md.setAttribute("content", D.meta.description);
    }

    // Textos simples
    $$("[data-text]").forEach((el) => {
      const v = get(el.dataset.text);
      if (v !== undefined && v !== null) el.innerHTML = v;
    });

    // Listas
    $$("[data-list]").forEach((el) => {
      const key = el.dataset.list;
      const items = get(key) || [];
      const tpl = templates[key];
      if (tpl) el.innerHTML = items.map(tpl).join("");
    });

    // Troca <i data-icon> por SVG
    if (window.hydrateIcons) window.hydrateIcons();

    // Liga/desliga seções
    if (!D.simulador) $('[data-section="simulador"]').hidden = true;
    if (D.topbar && D.topbar.ativo === false) $('[data-section="topbar"]').hidden = true;
    const pv = D.oferta && D.oferta.pessoasVendo;
    if (!pv || pv.ativo === false) $('[data-section="viewers"]').hidden = true;
    if (D.depoimentos && D.depoimentos.ativo === false) $('[data-section="depoimentos"]').hidden = true;
  }

  function showDataError(err) {
    const box = document.createElement("div");
    box.style.cssText = "position:fixed;inset:0 0 auto 0;z-index:9999;background:#b00020;color:#fff;padding:16px;font:600 15px/1.4 system-ui,sans-serif";
    box.textContent = "Erro no arquivo content/textos-landing.js — confira vírgulas, aspas e chaves perto da última alteração. " + (err ? "(" + err + ")" : "");
    document.body.prepend(box);
  }

  /* ---------- Contagem regressiva (guardada na sessão) ---------- */
  function initTimer() {
    const el = { h: $('[data-timer="h"]'), m: $('[data-timer="m"]'), s: $('[data-timer="s"]') };
    if (!el.m || (D.topbar && D.topbar.ativo === false)) return;

    const DURATION = (Number(D.topbar && D.topbar.minutos) || 10) * 60 * 1000;
    const KEY = "pr_offer_deadline";
    let deadline;

    try {
      deadline = Number(sessionStorage.getItem(KEY));
      if (!deadline || deadline < Date.now() || deadline - Date.now() > DURATION) {
        deadline = Date.now() + DURATION;
        sessionStorage.setItem(KEY, String(deadline));
      }
    } catch (e) {
      deadline = Date.now() + DURATION;
    }

    const pad = (n) => String(n).padStart(2, "0");

    function tick() {
      let left = deadline - Date.now();
      if (left <= 0) {
        deadline = Date.now() + DURATION;
        try { sessionStorage.setItem(KEY, String(deadline)); } catch (e) {}
        left = DURATION;
      }
      const total = Math.floor(left / 1000);
      el.h.textContent = pad(Math.floor(total / 3600));
      el.m.textContent = pad(Math.floor((total % 3600) / 60));
      el.s.textContent = pad(total % 60);
    }

    tick();
    setInterval(tick, 1000);
  }

  /* ---------- Carrossel de bônus ---------- */
  function initCarousel() {
    const root = $("[data-carousel]");
    if (!root) return;

    const track = $("[data-track]", root);
    const prev = $("[data-prev]", root);
    const next = $("[data-next]", root);
    const dotsWrap = $("[data-dots]", root);
    const slides = Array.from(track.children);
    if (!slides.length) return;

    dotsWrap.innerHTML = "";
    slides.forEach(() => dotsWrap.appendChild(document.createElement("span")));
    const dots = Array.from(dotsWrap.children);

    const step = () => {
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      return slides[0].getBoundingClientRect().width + gap;
    };

    function update() {
      const max = track.scrollWidth - track.clientWidth - 2;
      prev.disabled = track.scrollLeft <= 2;
      next.disabled = track.scrollLeft >= max;
      const idx = Math.min(slides.length - 1, Math.round(track.scrollLeft / step()));
      dots.forEach((d, i) => d.classList.toggle("is-active", i === idx));
    }

    prev.addEventListener("click", () => track.scrollBy({ left: -step(), behavior: "smooth" }));
    next.addEventListener("click", () => track.scrollBy({ left: step(), behavior: "smooth" }));
    track.addEventListener("scroll", () => requestAnimationFrame(update), { passive: true });
    window.addEventListener("resize", update);

    track.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); next.click(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); prev.click(); }
    });

    // Arrastar com o mouse (no toque o scroll nativo já resolve)
    let startX = 0, startScroll = 0, dragging = false, moved = false;
    track.addEventListener("pointerdown", (e) => {
      if (e.pointerType !== "mouse") return;
      dragging = true; moved = false;
      startX = e.clientX; startScroll = track.scrollLeft;
    });
    window.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) { moved = true; track.classList.add("is-dragging"); }
      track.scrollLeft = startScroll - dx;
    });
    window.addEventListener("pointerup", () => {
      if (!dragging) return;
      dragging = false;
      track.classList.remove("is-dragging");
      if (moved) {
        const target = Math.round(track.scrollLeft / step()) * step();
        track.scrollTo({ left: target, behavior: "smooth" });
      }
    });

    update();
  }

  /* ---------- Contador animado (números do topo) ---------- */
  function initCountUp() {
    const nodes = $$("[data-count]");
    if (!nodes.length || reduceMotion || !("IntersectionObserver" in window)) return;

    const fmt = new Intl.NumberFormat("pt-BR");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const node = entry.target;
        const end = Number(node.dataset.count);
        const suffix = node.dataset.suffix || "";
        const t0 = performance.now();
        const dur = 1400;
        (function frame(now) {
          const p = Math.min(1, (now - t0) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          node.textContent = fmt.format(Math.round(end * eased)) + suffix;
          if (p < 1) requestAnimationFrame(frame);
        })(t0);
        io.unobserve(node);
      });
    }, { threshold: 0.6 });

    nodes.forEach((n) => io.observe(n));
  }

  /* ---------- "Pessoas vendo agora" ---------- */
  function initViewers() {
    const el = $("[data-viewers]");
    const cfg = D.oferta && D.oferta.pessoasVendo;
    if (!el || !cfg || cfg.ativo === false) return;
    const min = Number(cfg.minimo) || 0, max = Number(cfg.maximo) || min;
    let n = Number(cfg.inicial) || min;
    el.textContent = n;
    setInterval(() => {
      n = Math.max(min, Math.min(max, n + Math.round(Math.random() * 6 - 3)));
      el.textContent = n;
    }, 4000);
  }

  /* ---------- FAQ: só uma resposta aberta por vez ---------- */
  function initFaq() {
    const items = $$(".faq details");
    items.forEach((d) => {
      d.addEventListener("toggle", () => {
        if (d.open) items.forEach((o) => { if (o !== d) o.open = false; });
      });
    });
  }

  /* ---------- CTA fixo: aparece depois do hero, some na oferta ---------- */
  function initSticky() {
    const cta = $("[data-sticky]");
    const hero = $(".hero");
    const offer = document.getElementById("oferta");
    if (!cta || !hero || !("IntersectionObserver" in window)) return;

    let heroVisible = true, offerVisible = false;
    const draw = () => cta.classList.toggle("is-visible", !heroVisible && !offerVisible);

    new IntersectionObserver(([e]) => { heroVisible = e.isIntersecting; draw(); }).observe(hero);
    if (offer) {
      new IntersectionObserver(([e]) => { offerVisible = e.isIntersecting; draw(); }, { threshold: 0.15 }).observe(offer);
    }
  }

  /* ---------- Ano atual no rodapé ---------- */
  function initYear() {
    const el = $("[data-year]");
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ---------- Cena do topo: parede sendo levantada ---------- */
  function initScene() {
    const g = $("[data-bricks]");
    if (!g) return;
    const W = 60, H = 26, GAP = 4, ROWS = 6, X0 = 170, X1 = 470, BASE = 300;
    let html = "", n = 0;
    for (let r = 0; r < ROWS; r++) {
      const y = BASE - (r + 1) * (H + GAP);
      const off = r % 2 ? W / 2 + GAP / 2 : 0;
      for (let x = X0 - off; x < X1; x += W + GAP) {
        const x0 = Math.max(x, X0), x1 = Math.min(x + W, X1);
        if (x1 - x0 < 10) continue;
        const tone = ["#b5482b", "#a8401f", "#c0532f"][(r * 7 + n) % 3];
        html += `<rect class="brick" style="--i:${n}" x="${x0}" y="${y}" width="${x1 - x0}" height="${H}" rx="2" fill="${tone}" stroke="#16130f" stroke-width="2"/>`;
        n++;
      }
    }
    g.innerHTML = html;
    const scene = $("[data-scene]");
    // o nível "assenta" depois do último tijolo
    scene.style.setProperty("--bricks", n);
    requestAnimationFrame(() => scene.classList.add("is-on"));
  }

  /* ---------- Simulador de economia e renda ---------- */
  function initSim() {
    const S = D.simulador;
    const form = $("[data-sim]");
    if (!S || !form) return;
    const campos = ["diaria", "dias", "bicos"];
    const ins = {}, outs = {};
    campos.forEach((k) => {
      const c = S[k] || {};
      const el = $(`[data-in="${k}"]`, form);
      el.min = c.minimo ?? 0; el.max = c.maximo ?? 100; el.step = c.passo ?? 1; el.value = c.inicial ?? 0;
      el.setAttribute("aria-label", (c.rotulo || k).replace(/<[^>]+>/g, ""));
      ins[k] = el; outs[k] = $(`[data-out="${k}"]`, form);
    });
    const res = (k) => $(`[data-res="${k}"]`);
    const preco = Number(S.precoCurso) || 19;

    function pinta(el) {
      const pct = ((el.value - el.min) / (el.max - el.min)) * 100;
      el.style.setProperty("--fill", pct + "%");
    }

    function calc() {
      const diaria = +ins.diaria.value, dias = +ins.dias.value, bicos = +ins.bicos.value;
      outs.diaria.textContent = brl(diaria);
      outs.dias.textContent = dias + (dias === 1 ? " dia" : " dias");
      outs.bicos.textContent = bicos + (bicos === 1 ? " dia" : " dias");
      campos.forEach((k) => pinta(ins[k]));
      res("gasto").textContent = brl(diaria * dias);
      res("curso").textContent = brl(preco);
      const pct = Math.max(1, Math.round((preco / diaria) * 100));
      res("pct").textContent = `= ${pct}% de UMA diária`;
      res("renda").textContent = brl(diaria * bicos);
    }
    form.addEventListener("input", calc);
    calc();
  }

  /* ---------- Módulos: casa sendo construída conforme rola ---------- */
  function initObra() {
    const house = $("[data-house]");
    const mods = $$(".modules--timeline .module");
    if (!house || !mods.length) return;
    const etapas = (D.modulos && D.modulos.etapas) || [];
    const lblEtapa = $("[data-obra-etapa]"), lblMod = $("[data-obra-mod]"), meter = $("[data-obra-meter]");
    let atual = 0;

    function set(n) {
      if (n === atual) return;
      atual = n;
      let stage = 0;
      etapas.forEach((e, i) => { if (n >= e.aPartirDo) stage = i; });
      house.setAttribute("data-stage", stage);
      if (lblEtapa) lblEtapa.textContent = (etapas[stage] && etapas[stage].nome) || "";
      if (lblMod) lblMod.textContent = `Módulo ${n} de ${mods.length}`;
      if (meter) meter.style.width = (n / mods.length) * 100 + "%";
      mods.forEach((m) => m.classList.toggle("is-done", +m.dataset.mod <= n));
    }

    if (!("IntersectionObserver" in window) || reduceMotion) { set(mods.length); return; }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) set(+e.target.dataset.mod);
        else if (e.boundingClientRect.top > 0 && +e.target.dataset.mod === atual) set(Math.max(1, atual - 1));
      });
    }, { rootMargin: "-45% 0px -45% 0px" });
    mods.forEach((m) => io.observe(m));
    set(1);
  }

  /* ---------- Revelar ao rolar (com efeito em sequência) ---------- */
  function initReveal() {
    if (reduceMotion || !("IntersectionObserver" in window)) return;
    const grupos = [
      ".section .kicker", ".section .title", ".section .subtitle",
      ".compare__col", ".sim__inputs", ".sim__result", ".module", ".bonus",
      ".plan", ".selos li", ".faq details", ".stats li", ".obra__card",
    ];
    const els = $$(grupos.join(","));
    els.forEach((el) => {
      const irmaos = Array.from(el.parentElement.children).filter((c) => c.matches(grupos.join(",")));
      el.style.setProperty("--d", Math.min(irmaos.indexOf(el), 6) * 70 + "ms");
      el.classList.add("rv");
    });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-in");
        io.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    els.forEach((el) => io.observe(el));
  }

  /* ---------- Selo da garantia: efeito carimbo ---------- */
  function initSeal() {
    const seal = $("[data-seal]");
    if (!seal || reduceMotion || !("IntersectionObserver" in window)) return;
    seal.classList.add("is-ready");
    new IntersectionObserver(([e], io) => {
      if (e.isIntersecting) { seal.classList.add("is-stamped"); io.disconnect(); }
    }, { threshold: 0.6 }).observe(seal);
  }

  /* ---------- Pixel: InitiateCheckout ao clicar em comprar ---------- */
  function initCheckoutTracking() {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-checkout-valor]");
      if (!btn || !window.trackInitiateCheckout) return;
      window.trackInitiateCheckout(btn.dataset.checkoutValor, btn.dataset.checkoutPlano);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (!D) { showDataError("SITE_DATA não encontrado"); return; }
    try { render(); } catch (e) { showDataError(e.message); console.error(e); return; }
    initScene();
    initSim();
    initObra();
    initReveal();
    initSeal();
    initTimer();
    initCarousel();
    initCountUp();
    initViewers();
    initFaq();
    initSticky();
    initYear();
    initCheckoutTracking();
  });
})();
