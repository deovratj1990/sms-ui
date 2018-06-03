$(document).ready(() => {
    $(".nav-link-routing").on('click', function() {
        var allCollapse = $('.collapse')

        for (var i = 0; i < allCollapse.length; i++) {
            $('#' + allCollapse[i].id).collapse('hide');
        }

        //console.log('close');
    });
});

function closeMenu() {
    var allCollapse = $('.collapse')

    for (var i = 0; i < allCollapse.length; i++) {
        $('#' + allCollapse[i].id).collapse('hide');
    }
}

function closeModal(id) {
    $('#'+id).modal('hide');
}

function openModal(id) {
    $('#'+id).modal('show');
}