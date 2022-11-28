$(()=> {

    // On Search, Generate Samples from API
    $('#navSearch').on('submit', (event) => {

        event.preventDefault();
    
        // Variable to Store User Input in Search Box
        const userInput = $('input[type="text"]').val();
    
        $.ajax({
            // API Token with User Input Inserted
            url:'https://freesound.org/apiv2/search/text/?query=' + userInput + '&fields=name,previews&token=ZDVZ805OUqVQk3TWEQ36CU9jC1eldzKvwPzYzAtZ'
        }).then(
            (data) => {

                // Clear Container On Search
                $('.row').empty();

                // Loop Through Results
                for (let i = 0; i < data.results.length; i++) {

                    // Generate Cards with Queried API Data
                    const $col = $('<div>').addClass('col-12 col-md-6 col-lg-4')
                    const $card = $('<div>').addClass(`card border-primary my-4`).css({'min-width': '350px'})
                    const $cardBody = $('<div>').addClass('card-body text-center').css({'height': "175px"})
                    const $cardName = $('<h5>').addClass('card-title pt-3')
                    const $cardPreview = $('<audio controls>')

                    // Create Form Elements with Hidden Data Values
                    const $postForm = $('<form>').attr('action', '/save').attr('method', 'POST').attr('id', `saveToCollection${i}`)
                    const $postName = $('<input>').attr('type', 'hidden').attr('name', 'name').attr('value', `${data.results[i].name}`)
                    const $postPreview = $('<input>').attr('type', 'hidden').attr('name', 'preview').attr('value', `${data.results[i].previews["preview-hq-mp3"]}`)
                    const $addBtn = $('<button>').addClass('btn').text('Add to Collection').attr('id', `btn${i}`).attr('type', 'submit')

                    // Append All Elements to DOM
                    $cardBody.append($cardName, $cardPreview, $postForm)
                    $postForm.append($postName, $postPreview, $addBtn)
                    $card.append($cardBody)
                    $col.append($card)
                    $('.row').append($col)

                    // Display Name and Preview for Each Element
                    $cardName.text(data.results[i].name)
                    $cardPreview.attr("src", data.results[i].previews["preview-hq-mp3"])
                }

                // Next Page Button 
                // console.log(data.next);

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