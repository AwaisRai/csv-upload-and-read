
var evtSource = new EventSource("/progress");
evtSource.onmessage = function (e) {
    try {
        if (JSON.parse(e.data).done)
            evtSource.close();
        else
            handler(JSON.parse(e.data), e.data);
    } catch (err) {
        console.error(err);
    }
}
function handler(json, raw) {
    console.log(json);
}