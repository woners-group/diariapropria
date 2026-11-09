/* =========================================================
   RASTREAMENTO — Pixel da Meta (Facebook/Instagram Ads)
   ---------------------------------------------------------
   • Cole o ID do seu pixel em metaPixelId (só números).
     Onde achar: Gerenciador de Eventos da Meta → Fontes de
     dados → seu pixel → "ID do conjunto de dados".
   • Com o ID vazio, nada é carregado nem enviado.
   • Eventos enviados:
       PageView          → ao abrir a página
       InitiateCheckout  → ao clicar no botão de compra de
                           cada plano (valor = preço do plano)
   ========================================================= */

window.RASTREAMENTO = {
  metaPixelId: "",        // ex.: "123456789012345"
  moeda: "BRL",
};
