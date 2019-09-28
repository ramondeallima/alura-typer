$('#botao-frase').click(fraseAleatoria)

function fraseAleatoria(){
    $('#spinner').show()
    $.get('http://localhost:3000/frases', TrocaFraseAleatoria)
        .fail(function () {
            $('#erro').show()
            setTimeout(function () {
                $('#erro').fadeOut(2000)
            },2000)
        })
        .always(function () {
            $('#spinner').toggle()
        })
}

function TrocaFraseAleatoria(data) {
    var frase = $('.frase')
    var numAleatorio =  Math.floor(Math.random() * data.length)
    frase.text(data[numAleatorio].texto)

    AtualizaTamanhoFrase()
    AtualizaTempoInicial(data[numAleatorio].tempo)
}