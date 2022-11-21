$(()=> {
    $('form').on('submit', (event)=> {

        event.preventDefault();

        const userInput = $('input[type="text"]').val();

        $.ajax({
            url:'https://freesound.org/apiv2/search/text/?query=' + userInput + '&token=ZDVZ805OUqVQk3TWEQ36CU9jC1eldzKvwPzYzAtZ'
        }).then(
            (data)=>{
                $('#name').html(data.results[0].name);
                // $('#').html(data.Year);
                // $('#rated').html(data.Rated);;
            },
            ()=>{
                console.log('bad request');
            }
        );
    })
    // const $test = $('h2').text('test');
    // $('#container').append($test);
})