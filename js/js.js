(state = []).length = 63; state.fill(-1); // actually 62

var e0 = 0.38
var s0 = 2.41

var DEBUG = 0

econv = [
    //[4.5, 2.5, -2.5, -4.5],
    [7, 5, 0, -2], //p1
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [7, 5, 0, -2], //p2
    [-7, -5, 0, 2],
    [6, 4, 0, -2],
    [7, 5, 0, -2],
    [-8, -6, 0, 2],
    [8, 6, 0, -2],
    [8, 6, 0, -1],
    [7, 5, 0, -3],
    [8, 6, 0, -1],
    [-7, -5, 0, 2],
    [-7, -5, 0, 1],
    [-6, -4, 0, 2],
    [6, 4, 0, -1],
    [0, 0, 0, 0],
    [0, 0, 0, 0], //p3
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [-8, -6, 0, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [-10, -8, 0, 1],
    [-5, -4, 0, 1],
    [0, 0, 0, 0], //p4
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0], //p5
    [0, 0, 0, 0],
    [-9, -8, 0, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0], //p6
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
]

socv = [
    [0, 0, 0, 0], //p1
    [-8, -6, 0, 2],
    [7, 5, 0, -2],
    [-7, -5, 0, 2],
    [-7, -5, 0, 2],
    [-6, -4, 0, 2],
    [7, 5, 0, -2],
    [0, 0, 0, 0], //p2
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [-6, -4, 0, 2], //p3
    [7, 6, 0, -2],
    [-5, -4, 0, 2],
    [0, 0, 0, 0],
    [8, 4, 0, -2],
    [-7, -5, 0, 2],
    [-7, -5, 0, 3],
    [6, 4, 0, -3],
    [6, 3, 0, -2],
    [-7, -5, 0, 3],
    [-9, -7, 0, 2],
    [-8, -6, 0, 2],
    [7, 6, 0, -2],
    [-7, -5, 0, 2],
    [-6, -4, 0, 2],
    [-7, -4, 0, 2],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [7, 5, 0, -3], //p4
    [-9, -6, 0, 2],
    [-8, -6, 0, 2],
    [-8, -6, 0, 2],
    [-6, -4, 0, 2],
    [-8, -6, 0, 2],
    [-7, -5, 0, 2],
    [-8, -6, 0, 2],
    [-5, -3, 0, 2],
    [-7, -5, 0, 2],
    [7, 5, 0, -2],
    [-6, -4, 0, 2],
    [-7, -5, 0, 2], //p5
    [-6, -4, 0, 2],
    [0, 0, 0, 0],
    [-7, -5, 0, 2],
    [-6, -4, 0, 2],
    [-7, -6, 0, 2], //p6
    [7, 6, 0, -2],
    [7, 5, 0, -2],
    [8, 6, 0, -2],
    [-8, -6, 0, 2],
    [-6, -4, 0, 2]
]

function upd() {
    var sumE = 0, sumS = 0

    for (var i = 0; i < 62; i++) {
        if (state[i] != -1) {
            sumE += econv[i][state[i]]
            sumS += socv[i][state[i]]
        }
    }

    if (DEBUG)
        console.log(sumE.toString() + ' ' + sumS.toString())

    var valE = sumE / 8.0
    var valS = sumS / 19.5

    valE += e0
    valS += s0

    valE = Math.round((valE + Number.EPSILON) * 100) / 100
    valS = Math.round((valS + Number.EPSILON) * 100) / 100

    document.getElementById('h4disp').innerHTML = 'Economic <span id="displayEcon">' + valE.toString() + '</span><span class="disp-sp">&nbsp;</span><span class="sep-disp"></span>Social <span id="displaySoc">' + valS.toString() + '</span>'
    document.getElementById('circ').setAttribute("cx", (valE * 5.0 + 50).toString())
    document.getElementById('circ').setAttribute("cy", (-valS * 5.0 + 50).toString())
}

// Dean Taylor
function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
  
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
  
    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }
  
    document.body.removeChild(textArea);
  }
  function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
      fallbackCopyTextToClipboard(text);
      return;
    }
    navigator.clipboard.writeText(text).then(function() {
      console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
      console.error('Async: Could not copy text: ', err);
    });
  }

function cpyCb() {
    currUrl = window.location.href
    currUrl = currUrl.split('?')[0]
    basa64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
    secretCode = ''
    for (var i = 0; i < 63; i += 3) {
        j = [2, 2, 2]
        for (var k = 0; k < 3; k++) {
            if (state[i + k] != -1)
                j[k] = state[i + k]
        }
        biNum = j[0] * 16 + j[1] * 4 + j[2] * 1
        secretCode = secretCode.concat(basa64[biNum])
    }
    copyTextToClipboard(currUrl + '?' + secretCode)
}

function reset() {
    if (true || confirm('Are you sure you want to reset the answers?')) {
        window.location = window.location.href.split('?')[0]
    }
}

function changeUrl() {
    currUrl = window.location.href
    currUrl = currUrl.split('?')[0]
    basa64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
    secretCode = ''
    for (var i = 0; i < 63; i += 3) {
        j = [2, 2, 2]
        for (var k = 0; k < 3; k++) {
            if (state[i + k] != -1)
                j[k] = state[i + k]
        }
        biNum = j[0] * 16 + j[1] * 4 + j[2] * 1
        secretCode = secretCode.concat(basa64[biNum])
    }
    window.history.pushState(libright + '#' + indicator + '#' + secretCode, '', '?' + secretCode);
    // copyTextToClipboard(currUrl + '?' + secretCode)
}

function ans(qnum, anum) {
    if (state[qnum] == anum) {
        return
    }
    state[qnum] = anum
    upd()
    changeUrl()
}

window.onpopstate = function(e){
    if(e.state){
        window.location = window.location.href
        // document.getElementById("content").innerHTML = e.state.html;
        // document.title = e.state.pageTitle;
    }
};

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}

libright = 'Yellow libright'

function switchLibright() {
    if (libright == 'Yellow libright') {
        document.getElementById('switchLibright').innerHTML = 'Yellow libright'
        document.getElementById('libright').style = 'fill:rgb(192,154,236);'
        libright = 'Purple libright'
        setCookie('libright', 'Purple libright', 365 * 2)
    }
    else {
        document.getElementById('switchLibright').innerHTML = 'Purple libright'
        document.getElementById('libright').style = 'fill:rgb(245,244,113);'
        libright = 'Yellow libright'
        setCookie('libright', 'Yellow libright', 365 * 2)
    }
}

indicator = 'Big indicator'

function switchIndicator() {
    if (indicator == 'Big indicator') {
        document.getElementById('switchIndicator').innerHTML = 'Big indicator'
        document.getElementById('circ').setAttribute('r', '1')
        indicator = 'Tiny indicator'
        setCookie('indicator', 'Tiny indicator', 365 * 2)
    }
    else {
        document.getElementById('switchIndicator').innerHTML = 'Tiny indicator'
        document.getElementById('circ').setAttribute('r', '2.5')
        indicator = 'Big indicator'
        setCookie('indicator', 'Big indicator', 365 * 2)
    }
}

function checkCookies() {
    librightCookie = getCookie('libright')
    if (librightCookie != '') {
        if (libright != librightCookie) {
            switchLibright()
        }
    }
    indicatorCookie = getCookie('indicator')
    if (indicatorCookie != '') {
        if (indicator != indicatorCookie) {
            switchIndicator()
        }
    }
}

function loadQ() {
    checkCookies()
    currUrl = window.location.href
    var secretCode = 'qqqqqqqqqqqqqqqqqqqqq'
    if (currUrl.includes('?')) {
        secretCode = currUrl.split('?')[1]
    }
    basa64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
    k = 0
    allInputs = document.getElementsByTagName('input')
    for (var i = 0; i < allInputs.length; i++) {
        if (allInputs[i].type == "radio") {
            allInputs[i].checked = false
        }
    }
    for (var i = 0; i < secretCode.length; i++) {
        j = basa64.indexOf(secretCode[i])
        state[k] = Math.floor(j / 16)
        state[k + 1] = Math.floor((j % 16) / 4)
        state[k + 2] = j % 4
        if (DEBUG) console.log('q' + (k + 1).toString() + 'a' + (state[k] + 1).toString())
        document.getElementById('q' + (k + 1).toString() + 'a' + (state[k] + 1).toString()).checked = true
        if (DEBUG) console.log('q' + (k + 1 + 1).toString() + 'a' + (state[k + 1] + 1).toString())
        document.getElementById('q' + (k + 1 + 1).toString() + 'a' + (state[k + 1] + 1).toString()).checked = true
        if (k + 3 <= 62) if (DEBUG) console.log('q' + (k + 1 + 2).toString() + 'a' + (state[k + 2] + 1).toString())
        if (k + 3 <= 62) document.getElementById('q' + (k + 1 + 2).toString() + 'a' + (state[k + 2] + 1).toString()).checked = true
        k += 3
    }
    upd()
}

document.addEventListener("DOMContentLoaded", function(event) { 
    loadQ()
});