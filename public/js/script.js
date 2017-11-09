/**
 * Created by samialmouhtaseb on 08/11/17.
 */

$('.btn-shorten').on('click', function(){
    if($('#url-field').val()) {
        $.ajax({
            url: '/api/url',
            type: 'POST',
            dataType: 'JSON',
            data: {url: $('#url-field').val()},
            success: function(data){
                var link = $('#encrypted-link');
                var html = '';
                if(data.response.success) {
                    let url = window.location.origin + '/' + data.response.message.url.encrypted_seq;
                    html = '<a class="result" href="'+url+'">'+url+'</a>';
                } else {
                    html = '<div class="result">'+data.response.message+'</div>';
                }
                link.html(html);
            }
        });
    }
});

$('.btn-decrypted').on('click', function(){
    if($('#encrypted-url-field').val()) {
        let url_filed = $('#encrypted-url-field').val().replace(window.location.origin+'/','');
        $.ajax({
            url: '/api/url/'+url_filed,
            type: 'GET',
            dataType: 'JSON',
            success: function(data){
                var link = $('#link');
                var html = '';
                if(data.response.success) {
                    let url = data.response.message.url.url;
                    html = '<a class="result" href="'+url+'">'+url+'</a>';
                } else {
                    html = '<div class="result">'+data.response.message+'</div>';
                }
                link.html(html);
            }
        });
    }
});