$(document).ready(function() {
    $('.delete-customer').on('click', function(event) {
        var id = $(this).data('delete-id');
        console.log(id); 
        $.ajax({
            method: 'DELETE',
            url: '/api/customers/' + id
        }).then(function(data) {
            window.location.href = '/';
        });
    });

    $('#new-customer-form').on('submit', function(event) {
        event.preventDefault();
        var name = $('#customer-name').val().trim();
        if (name) {
            var newCustomer = {
                customer_name: name
            };
            $.ajax({
                method: 'POST',
                url: '/api/customers',
                data: newCustomer
            }).then(function(result) {
                console.log(result);
                window.location.href = '/';
            })
        } else {
            window.alert('name cannot be blank');
        }
    });

    $('.update-customer').on('click', function(event) {
        var id = $(this).data('update-id');
        if ($('#new-name-' + id).css('display') === 'none') {
            $('#new-name-' + id).show();
        } else {
            $('#new-name-' + id).hide();
        }
    });

    $('.new-name-button').on('click', function(event) {
        var id = $(this).data('id');
        console.log(id);
        console.log($('#new-name-' + id).css('display'));
       
        console.log($(this).data('id'));
        $.ajax({
            method: 'PUT',
            url: '/api/customers/' + id,
            data: {customer_name: $('#input-' + id).val().trim()}
        }).then(function(result) {
            console.log(result);
            window.location.href = '/';
        });
    });
});