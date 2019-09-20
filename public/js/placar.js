$('#botao-placar').click(MostraPlacar);

function InserePlacar() {
    var corpoTabela = $('.placar').find('tbody')
    var usuario = "Ramon"
    var numPalavras = $('#contador-palavras').text()

    var linha = novaLinha(usuario,numPalavras)
    linha.find('.botao-remover').click(removeLinha)
    corpoTabela.prepend(linha)
}

function novaLinha(usuario, palavras) {
    var linha = $('<tr>')
    var colunaUsuario = $('<td>').text(usuario)
    var colunaPalavras = $('<td>').text(palavras)
    var colunaRemover = $('<td>')
    
    var link = $('<a>').addClass('botao-remover').attr('href', '#')
    var icone = $('<i>').addClass('small').addClass('material-icons').text('delete')

    link.append(icone)
    colunaRemover.append(link)
    
    linha.append(colunaUsuario)
    linha.append(colunaPalavras)
    linha.append(colunaRemover)

    return linha
}

function removeLinha() {
    event.preventDefault()
    var linha = $(this).parent().parent().fadeOut()
    linha.fadeOut()
    setTimeout(function() {
        linha.remove()
    },1000)
}

function MostraPlacar() {
    $('.placar').stop().slideToggle(600)
}