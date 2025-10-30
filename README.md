# Convite

Site de convite editável via `config.json`.

## Como usar

1. Abra `editor.html` no navegador.
2. Edite os campos (título, nome, data, local, WhatsApp, mensagem, imagens, cores do dress code).
3. Clique em "Baixar config.json" e substitua o arquivo na raiz do projeto.
4. Coloque suas imagens na pasta `assets/` e ajuste os caminhos em `config.json`.
5. Abra `index.html` para ver o convite.

## Publicar

- GitHub Pages: suba tudo em um repositório e ative Pages (branch `main`, pasta `/`).
- Servidor simples: use qualquer hospedagem estática (Netlify, Vercel, etc.).

## Estrutura

- `index.html`: página do convite.
- `styles.css`: estilos.
- `script.js`: carrega `config.json` e preenche a página.
- `editor.html` + `editor.js`: editor visual do `config.json` (baixa o arquivo pronto).
- `config.json`: dados dinâmicos (nomes, datas, imagens, links, dress code).
- `assets/`: imagens (crie esta pasta e adicione suas fotos).

## Observações

- O botão "Confirmar presença" abre o WhatsApp com a mensagem definida.
- O botão "Ver rota" usa a URL do Google Maps fornecida.
- O modal "Dress code" mostra o texto e uma paleta de cores.

---




