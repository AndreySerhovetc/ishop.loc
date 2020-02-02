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

function showCart(cart){
   console.log(cart);
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