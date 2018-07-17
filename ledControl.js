const robot = require('johnny-five');

robot.Board().on('ready', function () {

  let led = new robot.Led(13);

  led.on();

  let PubNub = require('pubnub');

  let pubnub = new PubNub({
    publish_key: 'demo',
    subscribe_key: 'demo'
  })

  var channel = 'led-state';

  pubnub.subscribe({
    channel: channel,
    callback: setState,
    connect: initConnection,
    error: function (err) { console.log(err); }
  });

  function setState(m) {
    if (m) {
      led.on();
    }
    else {
      led.off();
    }
  }

  function initConnection() {
    pubnub.history({
      channel: channel,
      count: 1,
      callback: function (messages) {
        messages[0].forEach(function (m) {
          setState(m);
        });
      }
    });
  }
});