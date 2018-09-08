$(document).ready(function() {
    var customerSelect = $('#customer');

    $.get('/api/customers', function(data) {
        var customerRows = [];
        for (var i = 0; i < data.length; i++) {
            var customer = data[i];
            var listOption = $("<option>");
            listOption.attr("value", customer.id);
            listOption.text(customer.customer_name);
            customerRows.push(listOption);
        }
        customerSelect.empty();
        customerSelect.append(customerRows);
    });

    console.log('document ready');
    $('#create-form').on('submit', function(event) {
        event.preventDefault();
        if (!$('#burger-name').val() || !$('#image-url').val()) {
            alert('name and image url cannot be blank');
        } else {
            var newBurger = {
                burger_name: $('#burger-name').val().trim(),
                devoured: false,
                image_url: $('#image-url').val().trim()
            };
            $.ajax('/api/burgers', {
                type: 'POST',
                data: newBurger
            }).then(function() {
                console.log('created new burger', newBurger.name);
                location.reload();
            });
            $('#burger-name').val('');
            $('#image-url').val('');
        }
    });

    $('.change-devour').on('click', function(event){
        var isDevoured = $(this).data('devoured');
        var id = $(this).data('id');
        var state = {devoured: isDevoured};
        $.ajax('/api/burgers/' + id, {
            type: 'PUT',
            data: state
        }).then(function() {
            console.log('changed devoured to', isDevoured);
            location.reload();
        });
    });

    $('.delete-burger').on('click', function() {
        var id = $(this).data('id');
        $.ajax('/api/burgers/' + id, {
            type: 'DELETE'
        }).then(function() {
            console.log('deleted burger #', id);
            location.reload();
        });
    });
});