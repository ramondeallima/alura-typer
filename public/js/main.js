var tempoInicial = $('#tempo-digitacao').text()
var campo = $('.campo-digitacao')

$(function(){
    fraseAleatoria()
    AtualizaTamanhoFrase()
    InicializaContadores()
    InicializaCronometro()
    InicializaMarcadores()
    $('#botao-reiniciar').click(ReiniciaJogo)
})

function AtualizaTempoInicial(tempo) {
    tempoInicial = tempo
    $('#tempo-digitacao').text(tempo)
}

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

function InicializaMarcadores() {
    campo.on('input', function () {
        var frase = $('.frase').text()
        var digitado = campo.val()
        var digitouCorreto = frase.startsWith(digitado)
        
        if (digitouCorreto) {
            campo.addClass('borda-verde')
            campo.removeClass('borda-vermelha')
        }else{
            campo.addClass('borda-vermelha')
            campo.removeClass('borda-verde')    
        }
    })
}

function InicializaCronometro() {
    campo.one('focus', function () {
        var tempoRestante = $('#tempo-digitacao').text()
        $('#botao-reiniciar').attr('disabled',true)
        var cronometroID = setInterval(function () {
            tempoRestante--;
            $('#tempo-digitacao').text(tempoRestante)
            if (tempoRestante < 1) {
                clearInterval(cronometroID)
                FinalizaJogo()
            }
        }, 1000)
    }) 
}

function FinalizaJogo() {
    $('#botao-reiniciar').attr('disabled',false)
    campo.attr('disabled', true)
    campo.addClass('campo-desativado')
    InserePlacar()
}

function ReiniciaJogo() {
        campo.val('')
        campo.attr('disabled', false)
        $('#tempo-digitacao').text(tempoInicial)
        $('#contador-palavras').text('0')
        $('#contador-caracteres').text('0') 
        campo.removeClass('campo-desativado')
        campo.removeClass('borda-vermelha')
        campo.removeClass('borda-verde')
        InicializaCronometro()
}

