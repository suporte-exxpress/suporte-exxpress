document.getElementById('download-btn').addEventListener('click', () => {
    const doc = new jsPDF('p', 'mm', 'a4'); // Orientação: portrait, tamanho: A4
    const margin = 10;
    const lineHeight = 8;
    const maxWidth = 190; // Largura máxima para o texto
    const titleSpacing = 15; // Espaço extra antes dos títulos
    let y = margin;

    // Função para adicionar texto com quebra de linha
    function addTextWithWrap(text, x, y, maxWidth) {
        let lines = doc.splitTextToSize(text, maxWidth);
        lines.forEach(line => {
            if (y + lineHeight > 297 - margin) { // Verifica se o texto ultrapassa o limite da página
                doc.addPage();
                y = margin;
            }
            doc.text(line, x, y);
            y += lineHeight;
        });
        return y;
    }

    // Função para adicionar uma lista com bolinhas de tópico
    function addBulletList(items, x, y, maxWidth) {
        items.forEach(item => {
            let lines = doc.splitTextToSize('• ' + item, maxWidth);
            lines.forEach(line => {
                if (y + lineHeight > 297 - margin) { // Verifica se o texto ultrapassa o limite da página
                    doc.addPage();
                    y = margin;
                }
                doc.text(line, x, y);
                y += lineHeight;
            });
        });
        return y;
    }

    // Adiciona o título principal
    doc.setFontSize(20);
    doc.setFont('Arial', 'bold');
    y += titleSpacing; // Adiciona espaço extra antes do título
    y = addTextWithWrap('Ficha de Pré-Layout (Laminados)', margin, y, maxWidth);
    y += lineHeight;

    // Adiciona o título da coluna "Frente"
    const frenteTitle = document.querySelector('.column-container .title').innerText;
    const frenteCards = Array.from(document.querySelectorAll('.column-container:nth-of-type(1) .column .item textarea'))
                             .map(textarea => textarea.value);

    doc.setFontSize(16);
    doc.setFont('Arial', 'bold');
    y += titleSpacing; // Adiciona espaço extra antes do título
    y = addTextWithWrap(frenteTitle, margin, y, maxWidth);
    doc.setFont('Arial', 'normal');
    y = addBulletList(frenteCards, margin, y, maxWidth);

    // Adiciona uma quebra de página, se necessário
    if (y > 297 - margin) { // Verifica se o texto ultrapassa o limite da página
        doc.addPage();
        y = margin;
    }

    // Adiciona o título da coluna "Verso"
    const versoTitle = document.querySelectorAll('.column-container .title')[1].innerText;
    const versoCards = Array.from(document.querySelectorAll('.column-container:nth-of-type(2) .column .item textarea'))
                            .map(textarea => textarea.value);

    doc.setFontSize(16);
    doc.setFont('Arial', 'bold');
    y += titleSpacing; // Adiciona espaço extra antes do título
    y = addTextWithWrap(versoTitle, margin, y, maxWidth);
    doc.setFont('Arial', 'normal');
    y = addBulletList(versoCards, margin, y, maxWidth);

    // Adiciona uma quebra de página, se necessário
    if (y > 297 - margin) { // Verifica se o texto ultrapassa o limite da página
        doc.addPage();
        y = margin;
    }

    // Adiciona o título das observações adicionais
    const observacoesTitle = document.querySelector('.observacoes-title').innerText;
    const observacoesText = document.querySelector('.observacoes-textarea').value;

    doc.setFontSize(16);
    doc.setFont('Arial', 'bold');
    y += titleSpacing; // Adiciona espaço extra antes do título
    y = addTextWithWrap(observacoesTitle, margin, y, maxWidth);
    doc.setFont('Arial', 'normal');
    y = addTextWithWrap(observacoesText, margin, y, maxWidth);

    // Salva o PDF
    doc.save('(LAYOUT) Planta Baixa.pdf');
});
