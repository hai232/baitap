WSS = WebSocket;
var temp1 = null
WebSocket = class WebSocket extends WSS {
    constructor(name) {
    super(name);
    this.type = "WebSocket";
    alert(this)
    if (temp1 == null) {
        temp1 = (this);
    }
    };
};
alert('ok')
