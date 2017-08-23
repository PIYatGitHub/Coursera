var isShown=false;
function createAlert() {
    'use strict';
    if(!isShown){
        var alertDiv=document.getElementById("alertDiv");
        alertDiv.setAttribute("class", "col-xs-6 col-xs-offset-5");
        alertDiv.setAttribute("style", "visibility:visible");
        // |date:"MMM.dd.yyyy"
        var al = document.createElement("DIV");
        al.setAttribute("class", "alert alert-info alert-dismissible");
        al.setAttribute("role", "alert");
        var btnC = document.createElement("button");
        btnC.setAttribute("type", "button");
        btnC.setAttribute("class", "close");
        btnC.setAttribute("style", "cursor:pointer");
        btnC.setAttribute("onclick", "document.getElementById('alertDiv').setAttribute('class', 'collapse'); deleteAlert();");
        var span1 = document.createElement("span");
        span1.setAttribute("aria-hidden", "true");
        span1.innerHTML="&times;";
        var h4 = document.createElement("h4");
        h4.innerHTML="Type in any of the following:";
        var para1 = document.createElement("p");
        para1.innerHTML="author or - author, date or -date and rating or -rating";
        btnC.appendChild(span1);
        al.appendChild(btnC);
        al.appendChild(h4);
        al.appendChild(para1);
        alertDiv.appendChild(al);
        isShown=true;
    }
}

function deleteAlert() {
    'use strict';
    var alertDiv=document.getElementById("alertDiv");
    alertDiv.innerHTML='';
    isShown=false;
}