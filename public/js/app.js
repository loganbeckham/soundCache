$(()=> {

    // Empty Array for export to database
    // exports.collection = [];

    // Generate Samples from API
    $('#navSearch').on('submit', (event) => {

        event.preventDefault();
    
        const userInput = $('input[type="text"]').val();
    
        $.ajax({
            url:'https://freesound.org/apiv2/search/text/?query=' + userInput + '&fields=name,previews&token=ZDVZ805OUqVQk3TWEQ36CU9jC1eldzKvwPzYzAtZ'
        }).then(
            (data) => {

                $('.row').empty();

                for (let i = 0; i < data.results.length; i++) {

                    const $col = $('<div>').addClass('col-12 col-md-6 col-lg-4')
                    const $card = $('<div>').addClass(`card border-primary my-4`).css({'min-width': '350px'})
                    const $cardBody = $('<div>').addClass('card-body text-center').css({'height': "175px"})
                    const $cardName = $('<h5>').addClass('card-title pt-3')
                    const $cardPreview = $('<audio controls>')
                    const $postForm = $('<form>').attr('action', '/save').attr('method', 'post').attr('id', `saveToCollection${i}`)
                    const $addBtn = $('<button>').addClass('btn').text('Add to Collection').attr('id', `btn${i}`).attr('type', 'submit')

                    $cardBody.append($cardName, $cardPreview, $postForm)
                    $postForm.append($addBtn)
                    $card.append($cardBody)
                    $col.append($card)
                    $('.row').append($col)

                    $cardName.text(data.results[i].name)
                    $cardPreview.attr("src", data.results[i].previews["preview-hq-mp3"])


                    // Add to Collection function

                    $(`#saveToCollection${i}`).on('submit', function() {
                        $.ajax({
                            url: '/save',
                            type: 'POST',
                            data: {
                                'name': data.results[i].name,
                                'preview': data.results[i].previews["preview-hq-mp3"]
                            },
                            // success: function() {
                            //     console.log(data.results[i].name)
                            // }
                        })


                        // $.post('/save', {
                        //     samples: thisSample
                        // }, function() {
                        //     console.log(samples)
                        // })

                    });



                        // collection.push(thisSample);
                        // alert('added to collection');
                        // console.log(collection)

                }

                console.log(data.next);

                // const $nextPage = $('<button>').addClass('btn btn-danger')
                // $('.container').append($nextPage)
                // $nextPage.attr("type", "button").attr("onclick", data.next)


            },
            ()=>{
                console.log('bad request');
            }
        );
    })

    // Stop Audio When New One Plays [credit to HoRn on stackOverflow]
    document.addEventListener('play', function(e) {
        let audios = document.getElementsByTagName('audio');
    
        for (let i = 0; i < audios.length; i++) {
            if (audios[i] != e.target) {
                audios[i].pause();
            }
        }
    }, true);

    // Export Collection Array

})



// $('#name').html(data.results[0].name).text(data.results[0].name);