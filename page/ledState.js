(function () {
    let pubnub = new PubNub({
      publish_key: 'demo',
      subscribe_key: 'demo'
    })
    var channel = 'led-state';
    var led = document.getElementById('state');
    pubnub.subscribe({
        channel: channel,
        message: resetSliders,
        connect: initSliders
    });
    function resetSliders(m) {
        led.value = false;
    }
    function initSliders() {
        pubnub.history({
            channel: channel,
            count: 1,
            callback: function (messages) {
                messages[0].forEach(function (m) {
                    resetSliders(m);
                });
            }
        });
    }
    function publishUpdate(data) {
        pubnub.publish({
            channel: channel,
            message: data
        });
    }

    $('#state').change(function () {
        publishUpdate($(this).prop('checked'));
    });
})();