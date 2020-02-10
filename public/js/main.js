/* Search */
var products = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.whitespace,
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    remote: {
        wildcard: '%QUERY',
        url: path + '/search/typeahead?query=%QUERY'
    }
});

products.initialize();

$("#typeahead").typeahead({
    // hint: false,
    highlight: true
},{
    name: 'products',
    display: 'title',
    limit: 10,
    source: products
});

$('#typeahead').bind('typeahead:select', function(ev, suggestion) {
    // console.log(suggestion);
    window.location = path + '/search/?s=' + encodeURIComponent(suggestion.title);
});

/*Cart*/
$('body').on('click', '.add-to-cart-link', function(e){
    e.preventDefault();
    var id = $(this).data('id'),
        qty = $('.quantityty input').val() ? $('.quantityty input').val() : 1,
        mod = $('.available select').val();
        
     $.ajax({
         url: path + '/cart/add',
         data: {id: id, qty: qty, mod: mod},
         type: 'GET',
        success: function(res){
         showCart(res);
        },
        error: function(){
            alert('Ошибка! Попробуйте позже');
        }
     });
});

$('#cart .modal-body').on('click', '.del-item', function(){
    var id = $(this).data('id');
    $.ajax({
        url:  path + '/cart/delete',
        data: {id: id},
        type: 'GET',
        success: function(res){
            showCart(res);
        },
        error: function(){
            alert('Error!');
        }
    });
});

function showCart(cart){
   if($.trim(cart) == '<h3>Корзина пуста</h3>'){
       $('#cart .modal-footer a, #cart .modal-footer btn-danger').css('display', 'none');   
   }else{
       $('#cart .modal-footer a, #cart .modal-footer btn-danger').css('display', 'inline-block'); 
   }
   $('#cart .modal-body').html(cart);
   $('#cart').modal();
   if($('#cart-sum').modal()){
        $('.simpleCart_total').html($('#cart .cart-sum').text());
   }else{
    $('.simpleCart_total').text('Корзина пуста')
   }
}

function getCart(){
    $.ajax({
        url: path + '/cart/show',
        type: 'GET',
       success: function(res){
        showCart(res);
       },
       error: function(){
           alert('Ошибка! Попробуйте позже');
       }
    }); 
}

function clearCart(){
    $.ajax({
        url: path + '/cart/clear',
        type: 'GET',
       success: function(res){
        showCart(res);
       },
       error: function(){
           alert('Ошибка! Попробуйте позже');
       }
    }); 
}

 
/*Cart*/

$('#currency').change(function(){
   window.location = 'currency/change?curr=' + $(this).val();
});

$('.available select').on('change', function(){
   var modId = $(this).val(),
       color = $(this).find('option').filter(':selected').data('title'),
       price = $(this).find('option').filter(':selected').data('price'),
       basePrice = $('#base-price').data('base');
   if(price){
       $('#base-price').text(symboleLeft + price + symboleRight);
   }else{
       $('#base-price').text(symboleLeft + basePrice + symboleRight);
   }

});
    