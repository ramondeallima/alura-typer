$('#botao-frase').click(fraseAleatoria)
$('#botao-frase-id').click(BuscaFrase)

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

function BuscaFrase() {
    $('#spinner').show()
    var fraseId = $('#frase-id').val()
    var dados = {id: fraseId}
    $.get('http://localhost:3000/frases', dados, TrocaFrase)
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

function TrocaFrase(data) {
    var frase = $('.frase')
    frase.text(data.texto)
    AtualizaTempoInicial(data.tempo)
    AtualizaTamanhoFrase()
}