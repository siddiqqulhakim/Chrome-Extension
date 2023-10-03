setTimeout(function(){
    window.scrollTo(0, document.body.scrollHeight);
    var buttons = document.querySelectorAll('button[class="artdeco-button artdeco-button--2 artdeco-button--secondary ember-view"]');
    var avail = 1;

    for(var i = 0; i < buttons.length; i++){
        (function(avail){
            if(buttons[i].textContent.includes('Connect')){
                setTimeout(function(){
                    buttons[i].click();
                    setTimeout(function(){
                        document.querySelector('button[class="artdeco-button artdeco-button--2 artdeco-button--primary ember-view ml1"]').click();
                    }, 600 * avail);
                }, 500 * avail);
                avail++;
            }
        })(avail);
        
    }
}, 3000);