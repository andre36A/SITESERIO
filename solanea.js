//inicio do js dos botoes na area do perfil do vereador

const tabBtns = document.querySelectorAll('.tab-btn');
const tabPaineis = document.querySelectorAll('.painel');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const alvo = btn.dataset.tab;

        tabBtns.forEach(b => b.classList.remove('ativo'));
        tabPaineis.forEach(p => p.classList.remove('ativo'));

        btn.classList.add('ativo');
        document.getElementById(alvo).classList.add('ativo');
    });
});
        
// fim do js dos botoes na area do perfil do vereador