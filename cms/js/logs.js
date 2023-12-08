$(document).ready(function(){
    $(".btn-sort").on("click", function(){
        var rows = $('table tbody').find('tr').get();
        rows.sort(function(a, b) {
            var dateA = $(a).children('td').eq(1).text();
            var dateB = $(b).children('td').eq(1).text();

            var dateObjA = new Date(dateA);
            var dateObjB = new Date(dateB);

            return dateObjA - dateObjB;
        });
        $.each(rows, function(index, row) {
            $('table tbody').append(row);
        });
    });
});

$(".btn-nolive").on("click", function(){
    $('table tbody tr').show();
    $('table tbody tr td:nth-child(5)').filter(function() {
        return $(this).text().toLowerCase() === 'live';
    }).parent().hide();
});

$(".search-form").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("table tbody tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
});