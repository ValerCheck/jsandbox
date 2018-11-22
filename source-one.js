var getAllAddresses = function(){
    var total = document.querySelectorAll("[data-type=address]");
    return [total[0],total[2],total[3],total[4]];
}

window.onload = function() {

    getAllAddresses().forEach(function(el, ind){
        var countryField = el.querySelector("[data-index='6']");
        
        countryField.onchange = function(e){
            var parentAddr = e.target.parentElement.parentElement;
            var countryInput = e.target.querySelector("input");
            var allAddr = getAllAddresses();

            for (var i = 0; i < allAddr.length; i++){
                var nextAddr = allAddr[i];
                if (parentAddr == nextAddr) continue;
                var fieldToChange = nextAddr.querySelector("[data-index='6']").querySelector("input");
                fieldToChange.value = countryInput.value;
            }
        };

        el.addEventListener('change', function(e){
            var allAddr = getAllAddresses();
            var parentAddr = e.target.parentElement.parentElement;
            var currentField = e.target;
            
            for (var i = 0; i < allAddr.length; i++){
                var nextAddr = allAddr[i];
                if (parentAddr == nextAddr) continue;
                var fieldToChange = nextAddr.querySelector("input[data-index='"+currentField.getAttribute("data-index")+"']");
                fieldToChange.value = currentField.value;
            }

        }, false);
    });
};