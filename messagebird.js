module.exports = function(RED) {
  function MessageBirdNode(config) {
    RED.nodes.createNode(this, config);
    this.apiKey = config.apiKey;
    var node = this;
    node.on('input', function(msg) {
      if (!node.apiKey) {
        this.error('Missing MessageBird API Key');
        return;
      }

      var messagebird = require('messagebird')(node.apiKey);

      // Send SMS
      messagebird.messages.create(
        {
          originator: msg.originator,
          recipients: msg.recipients,
          body: msg.payload
        },
        function(err) {
          if (err) {
            node.error(err.message, msg);
          }
        }
      );
    });
  }
  RED.nodes.registerType('messagebird', MessageBirdNode);
};
