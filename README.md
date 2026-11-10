# Diária Própria — Landing page

> *Pare de pagar a diária. Comece a cobrar a sua.*

Site estático (HTML, CSS e JavaScript puro). Não precisa de build nem de servidor:
abra `index.html` no navegador ou envie a pasta inteira para qualquer hospedagem.

## Estrutura

```
site/
├── index.html                  # Landing page
├── favicon.ico                 # Favicon (fallback para navegadores antigos)
├── site.webmanifest            # Nome, cores e ícones do app (Android / "Adicionar à tela")
├── robots.txt                  # Bloqueia /_backups nos buscadores
│
├── content/                    # ✏️  TUDO QUE VOCÊ EDITA FICA AQUI
│   ├── textos-landing.js       # Textos, preços, links de pagamento, FAQ, simulador
│   └── rastreamento.js         # ID do Pixel da Meta
│
├── assets/
│   ├── css/
│   │   ├── base.css            # Design system: cores, fontes, botões, seções
│   │   └── components.css      # Componentes v2: ícones, animações, simulador, obra
│   ├── js/
│   │   ├── icons.js            # Ícones SVG (compartilhado)
│   │   ├── main.js             # Monta a landing e cuida das interações
│   │   └── pixel.js            # Pixel da Meta: PageView + InitiateCheckout
│   └── img/
│       └── favicon/            # favicon.svg, PNGs e ícones Apple/Android
│
└── _backups/                   # Versões antigas (não publicar)
```

## Como editar

| Quero mudar…                         | Arquivo                         |
|--------------------------------------|---------------------------------|
| Textos, preços, planos, FAQ          | `content/textos-landing.js`     |
| Links de pagamento (Cakto)           | `content/textos-landing.js` → `links` |
| ID do Pixel da Meta                  | `content/rastreamento.js` → `metaPixelId` |
| Script da Utmify (UTMs)              | `index.html` → `<head>` (bloco comentado "Utmify") |
| Cores e fontes                       | `assets/css/base.css` → `:root` |
| Favicon                              | `assets/img/favicon/` + `favicon.ico` |

Regras rápidas nos arquivos de `content/`:
- Mude só o que está entre aspas; não apague vírgulas, chaves `{}` nem colchetes `[]`.
- Se a página aparecer com uma faixa vermelha de erro, confira a última alteração em `content/`.

## Publicação

- Envie tudo **menos** a pasta `_backups/` (já está no `.gitignore`).
- A prova é um projeto separado, em `../prova` (veja o README de lá).
- `base.css`, `components.css`, `icons.js` e o favicon têm uma cópia na prova.
  Se mudar cores ou fontes aqui, copie o arquivo para a prova também.
