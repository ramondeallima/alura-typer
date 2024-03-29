$('#botao-placar').click(MostraPlacar);
$('#botao-sync').click(SincronizaPlacar)

function InserePlacar() {
    var corpoTabela = $('.placar').find('tbody')
    var usuario = "Ramon"
    var numPalavras = $('#contador-palavras').text()

    var linha = novaLinha(usuario,numPalavras)
    linha.find('.botao-remover').click(removeLinha)
    corpoTabela.prepend(linha)

    $('.placar').slideDown(500)
    scrollPlacar()
}

function scrollPlacar() {
    var posicaoPlacar = $('.placar').offset().top
    $('html').animate(
    {
        scrollTop: posicaoPlacar + "px"
    }, 1000);

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

function SincronizaPlacar() {
    var placar = []
    var linhas = $('tbody>tr')

    linhas.each(function () {
        var usuario = $(this).find('td:nth-child(1)').text()
        var palavras = $(this).find('td:nth-child(2)').text()

        var score = {
            usuario: usuario,
            pontos: palavras
        }

        placar.push(score)
    })
    var dados = {
        placar : placar
    }

    $.post('http://localhost:3000/placar', dados, function () {
        console.log('Salvou os dados')
    })
}

function AtualizaPlacar() {
    $.get('http://localhost:3000/placar', function (data) {
        $(data).each(function () {
            var linha = novaLinha(this.usuario, this.pontos)
            linha.find('.botao-remover').click(removeLinha)
            $('tbody').append(linha)
        })
    })
}