$(()=> {
    $('form').on('submit', (event)=> {

        event.preventDefault();
    
        const userInput = $('input[type="text"]').val();
    
        $.ajax({
            url:'https://freesound.org/apiv2/search/text/?query=' + userInput + '&fields=name,previews&token=ZDVZ805OUqVQk3TWEQ36CU9jC1eldzKvwPzYzAtZ'
        }).then(
            (data)=>{

                for (let i = 0; i < data.results.length; i++) {

                    const $col = $('<div>').addClass('col-12 col-md-6 col-lg-4')
                    const $card = $('<div>').addClass(`card border-primary my-4`).css({'min-width': '350px'})
                    const $cardBody = $('<div>').addClass('card-body text-center').css({'height': "175px"})
                    const $cardName = $('<h5>').addClass('card-title pt-3')
                    const $cardPreview = $('<audio controls>').addClass('m-3')

                    $cardBody.append($cardName, $cardPreview)
                    $card.append($cardBody)
                    $col.append($card)
                    $('.row').append($col)

                    $cardName.text(data.results[i].name)
                    $cardPreview.attr("src", data.results[i].previews["preview-hq-mp3"])
                }

                console.log(data.next);

                const $nextPage = $('<button>').addClass('btn btn-danger')
                $('.container').append($nextPage)
                $nextPage.attr("type", "button").attr("onclick", data.next)


            },
            ()=>{
                console.log('bad request');
            }
        );
    })
})

// $('#name').html(data.results[0].name).text(data.results[0].name);