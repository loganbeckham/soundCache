$(()=> {
    
    // Carry JSON Variable over from EJS file
    let Collection = JSON.parse($('#variableJSON').text());
    $('#variableJSON').remove();

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
                    const $dropDiv = $('<div>').addClass('dropdown')
                    const $ul = $('<ul>').addClass('dropdown-menu').attr('aria-labelledby', 'dropdownMenuButton1')
                    const $dropButton = $('<button>').addClass('btn btn-secondary dropdown-toggle').attr('type', 'button').attr('id', 'dropdownMenuButton1').attr('data-bs-toggle', 'dropdown').attr('aria-expanded', 'false').text('Add to Collection')


                    // Create Dropdown Menu Element for each
                    for (let i = 0; i < Collection.length; i++) {
                        const $li = $('<li>')
                        const $a = $('<a>').addClass('dropdown-item').attr('href', '#').text(`${Collection[i].collectionName}`)
                        $li.append($a)
                        $ul.append($li)
                        $dropDiv.append($dropButton)
                    }

                    // Append All Elements to DOM
                    $dropDiv.append($ul)
                    $cardBody.append($cardName, $cardPreview, $dropDiv)
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