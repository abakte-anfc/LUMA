# Verificação da demonstração — 12/10/2026

## Executado

- `node --check` em app.js, config.js, preview.mjs e verify.mjs: sem erro de sintaxe.
- `git diff --check`: sem erro de whitespace.
- `node lume-coworking/verify.mjs`: aprovado em Microsoft Edge headless, servido localmente por preview.mjs. O teste inicial detectou corretamente que os botões ainda não abriam o WhatsApp.
- Larguras 360, 390, 768, 1024 e 1440 px: sem rolagem horizontal e todos os links e botões visíveis da página com pelo menos 44 × 44 px.
- Desktop: texto à esquerda e foto à direita. Celular: texto antes da foto. Capturas da primeira tela revisadas nas cinco larguras; páginas completas revisadas em 360, 768 e 1440 px.
- Menu em 360, 390 e 768 px: abertura, seleção de Serviços, fechamento e foco no destino.
- Galeria nas cinco larguras: abertura, imagem decodificada, próximo/anterior, setas de teclado, contador 01 / 06 a 06 / 06, retorno circular, Escape e restituição do foco ao link que abriu a foto.
- Dez botões de consulta: número 5575991117750, mensagens específicas, nova aba e proteção noopener. Clique do botão do cabeçalho confirmado com a navegação do WhatsApp interceptada localmente; nenhuma mensagem enviada.
- Movimento reduzido emulado: rolagem sem animação e transições desativadas. Tab inicial alcança Pular para o conteúdo com foco visível.
- Recursos locais referenciados pela página: HTTP 200. Nenhum erro JavaScript observado.

## Contraste

Pares de tokens usados nos textos medidos pelo cálculo WCAG de luminância relativa:

| Combinação | Contraste |
| --- | --- |
| Branco / magenta | 5,67:1 |
| Branco / magenta hover | 7,49:1 |
| Magenta / branco quente | 5,21:1 |
| Magenta / rosa claro | 5,07:1 |
| Texto secundário / branco quente | 5,50:1 |
| Texto secundário / branco | 5,99:1 |
| Texto secundário / rosa claro | 5,35:1 |
| Texto secundário / fundo de apoio neutro | 5,16:1 |
| Grafite / branco quente | 13,82:1 |
| Texto secundário claro / grafite | 9,52:1 |
| Branco quente / grafite | 13,82:1 |
| Rosa de detalhes / grafite | 7,20:1 |

Legendas da galeria usam grafite com 90% de opacidade em vez de gradiente, preservando a leitura sobre as fotografias. Cores são aproximadas e aguardam conferência com a logo oficial.

## Evidências e reprodução

Capturas e relatório estruturado são gerados em `qa/` (ignorado pelo Git). O site não recebeu dependências de produção nem uma nova stack. Para reproduzir em Windows com Node e Edge instalados:

```powershell
$qaPath = Join-Path $env:TEMP 'lume-site-qa'
npm install --prefix $qaPath playwright --no-audit --no-fund
node lume-coworking/preview.mjs
# Em outro terminal, na raiz do projeto:
node lume-coworking/verify.mjs
```

## Limites

Não foram testados aparelhos físicos, Safari/Firefox, leitor de tela, entrega de mensagens ou disponibilidade da conta do WhatsApp. Os testes de toque verificam tamanho dos alvos e acionamento por clique em viewport móvel; não substituem interação em telefone real. Não houve comparação direta com prints do Instagram, indisponíveis nos arquivos acessíveis.

Logo, endereço completo, rota, horários, capacidades, equipamentos e condições comerciais continuam pendentes. A indicação de demonstração permanece. Nenhuma publicação foi realizada.
