function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

function do_call(phone){
    fetch('https://portal.jascloud.co.id/_o/v2/calls/outgoing?secret=16709557f3e64f4596c68cb004004663', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                "idempotencyKey": guidGenerator(),
                "flowUuid": "c6bcf96d-1c11-469b-a6bf-02c3f50d9642",
                "destination": "+"+phone,
                "payload": {
                    "Ext": "100",
                    "firstName": "John",
                    "lastName": "Wick",
                    "address": "Continential Hotel, New York"
                }
                }
        )
    }).then( response => response.json() )
    .then( data => console.log(data) );
}

function check(){
    var button = '<button type="button">Click Me!</button>';
    setTimeout(function(){
        var iframe = document.getElementById("candidateDetailDialogIframe");
        var primary_phone = iframe.contentWindow.document.querySelector('input[placeholder="Enter Primary Phone"]');
        var phone_top = iframe.contentWindow.document.querySelector('div[data-field-name="phone"]');

        if(primary_phone == null){
            console.log('Waiting for element');
            check();
        }else{
            setTimeout(function(){
                var number = '62' + primary_phone.value.replaceAll(' ', '');
                var primary_phone_span = document.evaluate("//span[contains(., 'Primary Phone')]", iframe.contentDocument, null, XPathResult.ANY_TYPE, null ).iterateNext();
                primary_phone_span.insertAdjacentHTML('afterend', '\t<button type="button" class="do_call btn-success" value="'+number+'")">CALL</button>');

                phone_top.insertAdjacentHTML('beforeend', '\t<button type="button" class="do_call btn-success" value="asdasd")">CALL</button>');

                call_btn = iframe.contentWindow.document.querySelectorAll('.do_call');
                call_btn.forEach(el => el.addEventListener('click', event => {
                    // alert(event.target.value);
                    do_call(event.target.value);
                    
                }));

            }, 1000);
        }
    }, 3000);
}


setTimeout(function(){
    check();
}, 3000);