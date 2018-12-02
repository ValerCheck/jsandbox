var EVENT_NAMES = {
    CHANGE  : 'change',
    INPUT   : 'input'
};

var getAllAddresses = function(){
    var total = document.querySelectorAll("[data-type='address']");
    return [total[0],total[2],total[3],total[4]];
}

var getAllEmails = function(){
    return document.querySelectorAll("input[type='email']");
}

var getFullNameFields = function(){
    var fullName = document.querySelector("[data-type='name']").querySelectorAll("input");
    var result = {first:null,last:null};
    fullName.forEach(function(e){
        if (e.getAttribute("data-index")=="1")
            result.first = e;
        else
            result.last = e;
    });
    return result;
}

var getPhones = function(){
    var phonesAndFaxes = document.querySelectorAll("[data-type='phone'] > label[data-role='label']");
    var phones = [];
    phonesAndFaxes.forEach(function(el){
        if (el.textContent.toLowerCase() == "phone"){
            phones.push(el.parentElement);
        }
    });

    var result = [];
    [0,phones.length - 1].forEach(function(ind){
        result.push(phones[ind].querySelector("input"));
    });
    return result;
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
        
        var label = e.querySelector("label").textContent;
        
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

    [getAllAddresses()[0]].forEach(function(el, ind){
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

        var eventType = 'change';

        el.addEventListener(eventType, function(e){
            var allAddr = getAllAddresses();
            var parentAddr = e.target.parentElement.parentElement;
            var currentField = e.target;
            
            for (var i = 0; i < allAddr.length; i++){
                var nextAddr = allAddr[i];
                if (parentAddr == nextAddr) continue;
                var fieldToChange = nextAddr.querySelector("input[data-index='"+currentField.getAttribute("data-index")+"']");
                fieldToChange.value = currentField.value;
                var event = document.createEvent('Event');
                event.initEvent(eventType, true, true);
                fieldToChange.dispatchEvent(event);
            }

        }, false);
    });

    var autoFillFunctions = [getAllEmails, getAllFaxFields, getAllDealerNames, getPhones];

    autoFillFunctions.forEach(function(func){
        ['change','input'].forEach(function(ev){
            func()[0].addEventListener(ev, function(e){
                var allInputs = func();
                var currentInput = e.target;
    
                for (var i = 0; i < allInputs.length; i++){
                    var nextInput = allInputs[i];
                    if (nextInput == currentInput) continue;
                    nextInput.value = currentInput.value;
                    var event = document.createEvent('Event');
                    event.initEvent(ev, true, true);
                    nextInput.dispatchEvent(event);
                }
            });
        });
    });

    var fullNameObj = getFullNameFields();
    [fullNameObj.first, fullNameObj.last].forEach(function(e){
        e.addEventListener(EVENT_NAMES.CHANGE, function(e){
            var texts = document.querySelectorAll("[data-type='text']");
            var result = [];
            texts.forEach(function(e){ 
                var label = e.querySelector("label").textContent.toLowerCase();
                
                if (label != null && label != undefined){
                    if (label.includes("contact name")){
                        result.push(e.querySelector("input"));
                    }            
                }
            });

            results.forEach(function(e){
                e.value = fullNameObj.first.value + " " + fullNameObj.last.value;
                var event = document.createEvent('Event');
                event.initEvent(EVENT_NAMES.CHANGE, true, true);
                e.dispatchEvent(event);
            });
        });
    })



    //fixPrinting();    
};