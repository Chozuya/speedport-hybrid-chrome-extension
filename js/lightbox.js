chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    if ('speedport.ip' !== location.host) {
        alert('Bitte über http://speedport.ip einloggen!');
        return;
    }

    if ( request.action !== "startLightbox" ) {
        return;
    }

    if ($('#lightbox_background').length > 0) {
        $('#lightbox_background').show();
        return;
    }

    $.get("http://speedport.ip/data/lteinfo.json", function() {

    }).always(function (data) {
        var result = ('undefined' !== typeof(data.responseText)) ? data.responseText : data;

        if (result.indexOf("DOCTYPE") > -1) {
            alert("Bitte im Speedport Hybrid einloggen!");
            return;
        }

        $.get(chrome.extension.getURL("html/lteinfo.html"), function(data) {
            $('body').append(data);
        }).done(function() {
            getLTEInformation();

            $('button').click(function(e) {
                $('#lightbox_background').hide();
            });
        });
    });
});
