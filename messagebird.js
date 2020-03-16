const axios = require('axios');

module.exports = function(RED) {
  function SendSMSNode(config) {
    RED.nodes.createNode(this, config);
    this.apiKey = config.apiKey;
    const node = this;
    node.on('input', function(msg) {
      if (!node.apiKey) {
        return node.error('Missing MessageBird API Key');
      }

      const messagebird = require('messagebird')(node.apiKey);

      // Send SMS
      messagebird.messages.create(
        {
          ...msg,
          body: msg.payload
        },
        err => {
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
    const node = this;
    node.on('input', function(msg) {
      if (!node.apiKey) {
        return node.error('Missing MessageBird API Key');
      }

      // Send a text to speech message
      axios
        .post(
          'https://rest.messagebird.com/voicemessages',
          {
            ...msg,
            body: msg.payload
          },
          {
            headers: {
              Authorization: `AccessKey ${node.apiKey}`
            }
          }
        )
        .catch(err => {
          node.error(err.response, msg);
        });
    });
  }

  RED.nodes.registerType('send sms', SendSMSNode);
  RED.nodes.registerType('voice call', VoiceMessageNode);
};
