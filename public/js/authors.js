(function () {

    //ADD_AUTHOR

    $('#addAuthor').click( async function (  ){

        let nameAuthor = $('#nameAuthor').val();
        let lastNameAuthor = $('#lastNameAuthor').val();

        $.post(
            `${window.paths.AjaxServerUrl}${window.paths.AddAuthor}`,
            {
                'authorLastname': lastNameAuthor,
                'authorFirstname': nameAuthor
            },
            function ( response ){
            
                console.log('response:' , response);

                $('#authorTable').append(`
                    <tr data-author-id = "${response.authorID}">
                        <td>${response.authorID}</td>
                        <td>${nameAuthor}</td>
                        <td>${lastNameAuthor}</td>
                        <td>
                            <button data-author-id="${response.authorID}" class="btn btn-danger" >Удалить</button>
                        </td>
                        <td>
                            <a href="${window.paths.AjaxServerUrl}author/${response.authorID}" class="btn btn-primary" >Обновить</a>
                        </td>
                    </tr>`
                );

            }//fn
        );


    }  );

    $('body').on('click','#removeAuthor,.btn-danger' , async function (  ){

        let authorID = +$( this ).data('author-id');

        let deleteURL = `${window.paths.AjaxServerUrl}${window.paths.RemoveAuthor}`;
        deleteURL = deleteURL.replace(':authorID' , authorID);

        let self = $(this);

        try{

            let response = await $.ajax({
                'url': deleteURL,
                'type': 'DELETE'
            });

            if( +response.code === 200 ){

                if( self.attr('id') === 'removeAuthor' ){
                    location.href = `${window.paths.AjaxServerUrl}authors`;
                }//if
                else{
                    $(`tr[data-author-id=${authorID}]`).remove();
                }//else

            }//if

            // $.ajax({
            //     'url': deleteURL,
            //     'type': 'DELETE'
            // }).done( _ => console.log(_));



        }
        catch( ex ){
            console.log(ex);
        }//catch

        
        
    }  );

    //UPDATE_AUTHOR

    $('#updateAuthor').click(function (  ){

        let authorID = +$(this).data('author-id');
        let nameAuthor = $('#nameAuthor').val();
        let lastNameAuthor = $('#lastNameAuthor').val();

        let url = window.paths.UpdateAuthor.replace(':authorID' , authorID);
        url = `${window.paths.AjaxServerUrl}${url}`;

        $.ajax({
            url: url,
            type: 'PUT',
            data: {
                'authorFirstname': nameAuthor,
                'authorLastname': lastNameAuthor,
            },
            success: ( response )=>{
                console.log( response );
            }
        });

    } );

})();


