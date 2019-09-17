var tempoInicial = $('#tempo-digitacao').text()
var campo = $('.campo-digitacao')

$(function(){
    AtualizaTamanhoFrase()
    InicializaContadores()
    InicializaCronometro()
    $('#botao-reiniciar').click(ReiniciaJogo)
})

function AtualizaTamanhoFrase() {
    var frase = $('.frase').text()
    var numPalavras = frase.split(' ').length
    var tamanhoFrase = $('#tamanho-frase')
    tamanhoFrase.text(numPalavras)
}

function InicializaContadores() {
    campo.on('input', function () {
        var conteudo = campo.val()
        var qtdPalavras = conteudo.split(/\S+/).length - 1
        var qtdCaracteres = conteudo.length
    
        $('#contador-caracteres').text(qtdCaracteres)    
        $('#contador-palavras').text(qtdPalavras)
    })
    
}

function InicializaCronometro() {
    var tempoRestante = $('#tempo-digitacao').text()
    campo.one('focus', function () {
        var cronometroID = setInterval(function () {
            tempoRestante--;
            console.log(tempoRestante)
            $('#tempo-digitacao').text(tempoRestante)
            if (tempoRestante < 1) {
                campo.attr('disabled', true)
                clearInterval(cronometroID)
            }
        }, 1000)
    }) 
}

function ReiniciaJogo() {
        campo.val('')
        campo.attr('disabled', false)
        $('#tempo-digitacao').text(tempoInicial)
        $('#contador-palavras').text('0')
        $('#contador-caracteres').text('0')  
        InicializaCronometro()
}
