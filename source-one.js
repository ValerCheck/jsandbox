var getAllAddresses = function(){
    var total = document.querySelectorAll("[data-type='address']");
    return [total[0],total[2],total[3],total[4]];
}

var getAllEmails = function(){
    return document.querySelectorAll("input[type='email']");
}

var fixPrinting = function(){
    var bolds = document.querySelectorAll("b");
    var result = [];
    bolds.forEach(function(e){
        if (e.innerHTML.toLowerCase().startsWith("recitals"))
        {
            var header = e.parentElement;
            var control = header.parentElement;
            var container = control.parentElement;

            [header, control, container].forEach(function(styleEl){
                styleEl.style["display"] = "inline";
            });
        }
    })
}

var getAllDealerNames = function() {
    var texts = document.querySelectorAll("[data-type='text']");
    var result = [];
    texts.forEach(function(e){
        
        var label = e.querySelector("label").innerText;
        
        if (label != null && label != undefined){
            label = label.split('"').join("").toLowerCase();
            if (label.startsWith("business legal name") || label.startsWith("dealer name")){
                result.push(e.querySelector("input"));
            }            
        }
    });
    return result;
}

var getAllFaxFields = function(){
    var phonesAndFaxes = document.querySelectorAll("[data-type='phone'] > label[data-role='label']");
    var faxes = [];
    phonesAndFaxes.forEach(function(el){
        if (el.innerHTML.toLowerCase() == "fax"){
            faxes.push(el);
        }
    });
    console.log(faxes);
    var result = [];
    faxes.forEach(function(el){
        result.push(el.parentElement.querySelector("input"));
    });
    return result;
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

    var autoFillFunctions = [getAllEmails, getAllFaxFields, getAllDealerNames];

    autoFillFunctions.forEach(function(func){
        func()[0].addEventListener('change', function(e){
            var allInputs = func();
            var currentInput = e.target;

            for (var i = 0; i < allInputs.length; i++){
                var nextInput = allInputs[i];
                if (nextInput == currentInput) continue;
                nextInput.value = currentInput.value;
            }
        });
    });

    fixPrinting();    
};