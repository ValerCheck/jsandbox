window.onload = function() {
    var addr = document.querySelectorAll("[data-type=address]");
    var $copyFrom = addr[0];
    var $copyTo = [addr[2], addr[3], addr[4]];
    
    $copyFrom.addEventListener('change', function(e){
        debugger;
    }, false);
};