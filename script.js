const columns = document.querySelectorAll(".column");

// Adiciona a classe 'dragging' ao card quando o início do arrasto começa
document.addEventListener("dragstart", (e) => {
  if (e.target.classList.contains("item")) {
    e.target.classList.add("dragging");
  }
});

// Remove a classe 'dragging' do card quando o arrasto termina
document.addEventListener("dragend", (e) => {
  if (e.target.classList.contains("item")) {
    e.target.classList.remove("dragging");
  }
});

// Permite arrastar os cards e definir a posição
columns.forEach((column) => {
  column.addEventListener("dragover", (e) => {
    e.preventDefault(); // Necessário para permitir o drop
    const dragging = document.querySelector(".dragging");
    const applyAfter = getNewPosition(column, e.clientY);
    
    if (applyAfter) {
      applyAfter.insertAdjacentElement("afterend", dragging);
    } else {
      column.prepend(dragging);
    }
  });

  column.addEventListener("drop", (e) => {
    e.preventDefault();
    const dragging = document.querySelector(".dragging");
    
    if (dragging) {
      const cardCount = column.querySelectorAll(".item").length;
      
      // Limita a capacidade da coluna a 6 cards
      if (cardCount < 6) {
        const applyAfter = getNewPosition(column, e.clientY);
        if (applyAfter) {
          applyAfter.insertAdjacentElement("afterend", dragging);
        } else {
          column.prepend(dragging);
        }
      } else {
        console.log('A coluna já tem o número máximo de cartões.');
      }
    }
  });
});

function getNewPosition(column, posY) {
  const spaces = column.querySelectorAll(".space");
  let result = null;

  // Determina a nova posição para o card com base na posição vertical
  spaces.forEach((space) => {
    const box = space.getBoundingClientRect();
    const boxCenterY = box.top + box.height / 2;

    if (posY > boxCenterY) {
      result = space;
    }
  });

  return result;
}

document.getElementById('catalog-btn').addEventListener('click', () => {
  window.open('https://sites.google.com/exxpress.com.br/suporte-exxpress/pr%C3%A9-pedido/cat%C3%A1logo-de-layouts', '_blank');
});