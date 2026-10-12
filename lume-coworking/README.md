# Lume Coworking

Demonstração local baseada nos arquivos fornecidos em C:\LUMA.

## Abrir
Abra dist/index.html em um navegador. Não precisa instalar dependências.

Para servir por HTTP com Node.js, execute nesta pasta:

    node preview.mjs

Depois abra http://127.0.0.1:4173. Encerre o servidor com Ctrl+C.

## Arquivos
- dist/index.html: conteúdo e estrutura.
- dist/styles.css: layout, celular e animações.
- dist/app.js: menu, galeria e configuração dos contatos.
- dist/config.js: WhatsApp, mensagens, endereço, horários e rota.
- dist/assets: fotos fornecidas e versões WebP.
- PENDENCIAS.md: dados para revisão antes de publicação.
- VERIFICACAO.md: verificações executadas e limites.

## Contato oficial
Em dist/config.js, preencha whatsapp com o número brasileiro oficial, incluindo 55, DDD e número, somente com dígitos. Os botões passam a abrir o WhatsApp com mensagens específicas. Sem número válido, levam à indicação de contato em validação.

Preencha address, hours e mapsUrl apenas após validação. O link de rota aceita HTTPS de google.com, google.com.br ou maps.app.goo.gl. Se não existir rota válida, não aparece botão de rota.

## Publicação
A entrega é uma demonstração local. Valide oferta dos espaços e direitos de uso das fotografias conforme o LEIA-ME original. Antes de publicar, revise conteúdo, retire a faixa de demonstração, os avisos provisórios e a identificação de demonstração no rodapé. Não publique configurações incompletas como se fossem contatos reais.

## Animações implementadas
Entradas únicas por IntersectionObserver, estados discretos de botões, zoom de fotos somente com mouse, abertura do menu e galeria, movimento reduzido com atualização durante a sessão. A página fica visível sem JavaScript e a galeria mantém links diretos para as fotos. Não foram adicionadas perguntas frequentes porque as respostas ainda não foram confirmadas.
