$.ajax({
    url:'https://freesound.org/apiv2/search/text/?query=piano&token=ZDVZ805OUqVQk3TWEQ36CU9jC1eldzKvwPzYzAtZ'
}).then(
    (data)=>{
        console.log(data);
    },
    ()=>{
        console.log('bad request');
    }
);