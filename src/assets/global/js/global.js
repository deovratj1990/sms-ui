$(document).ready(() => {
    $(".nav-link-routing").on('click', function() {
        var allCollapse = $('.collapse')

        for (var i = 0; i < allCollapse.length; i++) {
            $('#' + allCollapse[i].id).collapse('hide');
        }
    });
});

function closeMenu() {
    var allCollapse = $('.collapse')

    for (var i = 0; i < allCollapse.length; i++) {
        $('#' + allCollapse[i].id).collapse('hide');
    }
}