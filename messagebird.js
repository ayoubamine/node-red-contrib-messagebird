var axios = require('axios');

module.exports = function(RED) {
  function SendSMSNode(config) {
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

  function VoiceMessageNode(config) {
    RED.nodes.createNode(this, config);
    this.apiKey = config.apiKey;
    var node = this;
    node.on('input', function(msg) {
      if (!node.apiKey) {
        this.error('Missing MessageBird API Key');
        return;
      }

      const data = {
        ...msg,
        body: msg.payload
      };

      // Send a text to speech message
      axios
        .post('https://rest.messagebird.com/voicemessages', data, {
          headers: {
            Authorization: 'AccessKey ' + node.apiKey
          }
        })
        .catch(err => {
          node.error(err.response, msg);
        });
    });
  }

  RED.nodes.registerType('send sms', SendSMSNode);
  RED.nodes.registerType('voice call', VoiceMessageNode);
};
