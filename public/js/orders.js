"use strict";

$(document).ready(()=>{

    let limit = 10;
    let offset = 10;

    let limitOrders = 10;
    let offsetOrders =10;

    let limitOrdersDetail = 10;
    let offsetOrdersDetail =10;

    let countOrdersDetail =0;
    let countOrders = 0;

    let count =  $('.table').find('tr').length;

    if(count >= limitOrdersDetail){
        $('#btn-yet-detail').css({
            'display': 'block'
        });
        $('#btn-yet').css({
            'display': 'block'
        });
    }//if

    $('#deal-yet').click(async function(){

        try{
            let response = await $.ajax({
                url: `${window.paths.AjaxServerUserUrl}/ordersByUser/${limitOrders}/${offsetOrders}`,
                method: 'GET'
            });
            if(response.orders.length===0  ){
                $('#btn-yet').css({
                    'display': 'none'
                });
                return;
            }//if;
            $.each(response.orders, function (index , order) {


                $('.table').append(`
                     <tr>

                    <td>${ order.orderId }</td>
                    <td>${ order.date }</td>
                    <td>${ order.AdressOrder }</td>
                    <td>${order.orderStatus}</td>
                    <td>
                        <a href="orders.twig/${order.orderId}/10/0" class="btn btn-primary"> подробнее </a>
                    </td>

                </tr>

                `);

            });

        }
        catch (e) {
            console.log('error');
        }

        offsetOrders+=limitOrders;


    })
    $('#deal-yet-detail').click(async function(){


        let id = $(this).data('data-OrderId');

        console.log('работает', id);
        try{
            let response = await $.ajax({
                url: `${window.paths.AjaxServerUserUrl}/ordersUserDetailsOffset/3/${limitOrdersDetail}/${offsetOrdersDetail}`,
                method: 'GET'
            });
            console.log('length',response.orderDetail.length);
            if(response.orderDetail.length===0  ){
                $('#btn-yet-detail').css({
                    'display': 'none'
                });
                return;
            }//if;
            $.each(response.orderDetail, function (index , order) {


                let stringAuthors='';

                $.each(order.authors, function (index, author) {

                    stringAuthors += author.authorFirstName

                    if(order.authors.length<index-1){
                        stringAuthors+=','
                    }
                } )

                $('.table').append(`
                     <tr>

                        <th scope="row">
                            <img src="${ order.book.bookImagePath }" style="float: left; width: 50px"  alt="Cinque Terre">
                        </th>
                        <td>${ order.book.bookTitle }</td>
                        <td>${ stringAuthors  }</td>
                        <td>${ order.bookPrice } руб.</td>
                        <td>${ order.bookAmount }</td>
                     
                     </tr>

                `);

            });

        }
        catch (e) {
            console.log('error',e);
        }
        offsetOrdersDetail+=limitOrdersDetail;


    });

});