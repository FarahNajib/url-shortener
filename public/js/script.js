/**
 * Created by samialmouhtaseb on 08/11/17.
 */

$('.btn-shorten').on('click', function(){
    $.ajax({
        url: '/api/url',
        type: 'POST',
        dataType: 'JSON',
        data: {url: $('#url-field').val()},
        success: function(data){
            var link = $('#link');
            var html = '<div>error</div>';
            if(data.response.success) {
                html = '<a class="result" href="/api/url/'+data.response.message.url._id+'">'+data.response.message.url._id+'</a>';
            }
            link.html(html);
            link.hide().fadeIn('slow');
        }
    });
});