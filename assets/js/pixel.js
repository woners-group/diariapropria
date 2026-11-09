/* =========================================================
   Pixel da Meta — código base + evento de início de checkout.
   Configuração em content/rastreamento.js. Carregar no <head>.
   ========================================================= */
(function () {
  "use strict";
  const CFG = window.RASTREAMENTO || {};
  const id = String(CFG.metaPixelId || "").trim();

  if (id) {
    /* Código base oficial da Meta */
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', id);
    fbq('track', 'PageView');
  }

  /* Dispara o InitiateCheckout com o valor do plano clicado */
  window.trackInitiateCheckout = function (valor, plano) {
    if (typeof window.fbq !== "function") return;
    const dados = { value: Number(valor) || 0, currency: CFG.moeda || "BRL" };
    if (plano) dados.content_name = plano;
    window.fbq("track", "InitiateCheckout", dados);
  };
})();
