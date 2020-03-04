# node-red-contrib-messagebird

<a href="http://nodered.org" target="info">Node-RED</a> node to send SMS messages via the <a href="http://messagebird.com" target="info">MessageBird</a> service.

# Pre-requisite

You must have an account with MessageBird to use this node. You can register for one <a href="http://messagebird.com" target="info">here</a>.

# Install

Run the following command in your Node-RED user directory - typically `~/.node-red`

    npm install node-red-contrib-messagebird

# Usage

Send SMS messages via the MessageBird service.

## Details

`msg.payload` The body of the SMS message.

`msg.originator` The sender of the message. This can be a telephone number (including country code) or an alphanumeric string. In case of an alphanumeric string, the maximum length is 11 characters.

`msg.recipients` An array of recipients msisdns.

# License

MIT
