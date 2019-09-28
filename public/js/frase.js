$('#botao-frase').click(fraseAleatoria)

function fraseAleatoria(){
    $.get('http://localhost:3000/frases', TrocaFraseAleatoria)
}

function TrocaFraseAleatoria(data) {
    var frase = $('.frase')
    var numAleatorio =  Math.floor(Math.random() * data.length)
    frase.text(data[numAleatorio].texto)

    AtualizaTamanhoFrase()
    AtualizaTempoInicial(data[numAleatorio].tempo)
}