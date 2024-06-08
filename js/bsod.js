/*!
 * bsod.js
 *
 * MIT licensed
 * Copyright (C) 2015 Tim Holman, http://tholman.com
 */

(function bsod() {

    /**
     * Utils
     */

    // Applies css `properties` to an element.
    function applyProperties( target, properties ) {
      for( var key in properties ) {
        target.style[ key ] = properties[ key ];
      }
    }

    // Lord knows why this is so hard.
    // http://stackoverflow.com/questions/2400935/browser-detection-in-javascript
    function getBrowser() {
        var ua = navigator.userAgent, tem,
        M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

        if(/trident/i.test(M[1])){
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return 'IE '+(tem[1] || '');
        }

        if(M[1]=== 'Chrome'){
            tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
            if(tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
        }

        M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
        if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);

        return M[0];
    }

    /**
     * BSOD
     */

    var isActive = false;
    var errorRotation = 0;

    function init() {
        window.addEventListener('error', onError, false);
    }

    function onError(event) {

        // Lol, forget errors
        event.preventDefault();
        event.stopPropagation();

        if( isActive === false ) {
            // Lol, forget the dom.
            wipeDomAndHead();

            // Lol, the console is dumb.
            messWithConsole();

            // Lol, blue screen!
            showBSOD();

            isActive = true;
        }
    }

    // The easiest way to mess with someones console,
    // is to delete what's logged and constantly smash the logs.
    function messWithConsole() {
        clearConsole();
        setInterval( addLog, 10 );
    }

    function addLog() {
        console.log( 'bsod'[errorRotation] );
        errorRotation++;
        if( errorRotation > 3) {
            errorRotation = 0;
        }
    }

    function clearConsole () {
        // Most modern browsers support this
        if (window.console && typeof console.clear === 'function') {
            console.clear();
        // This seems to be supported by older versions of browsers
        } else if (typeof clear === 'function') {
            clear();
        }
    }

    function wipeDomAndHead() {
        document.body.innerHTML = '';
        document.getElementsByTagName("head")[0].innerHTML = "";
        document.title = "Ḉ̵̢̧̛̯̻̯͔̠͎̩̰̱͈̝̦̫̥̦͙̜̹̬̗͖̯̏̒̿̍̈̆̅̀͒̈́̽͌͂͒͐͊́͋͋̿̓̇͐̏̆̑̌̏̈́̋̐̈́̓̒̈́̈́̂͆̊̾́̂̔́̿̉͛̇̔̾̕̕͜͠͠͠͠R̸̨̧̧̨̛͕̩̮̳͈̭͙̝͕͚̗̪̰̞̹̦͎̠̖̻̹̘͙̪̰̦̣͇̣̟͊̊̃̂̆̚͜͝ͅĬ̷̡̛͉̣̲̤͈͍͔́̇́̃̽̍̍̈́͘͘͘͝͝͠ͅT̵̢̨̧̧̢̧̧̢̙̖̩̥̫͓̥͓͚͓͔̫̳̖̹͓̬̖̬͈̰̲̰͙͎̳̠͙̱͚̣͇͔͈̞̫̦̬͈̘͖͖͇̘͉̤̖̤̱̖͈͈̳͉͙̂̄͗̈͛͋̔͒̌̚͜͜I̷̡̨̨̢̧̛̟̗̭͕͍͚̪̹̣̤͔͇̼̜̳̬̯̦̰̪̼͖̻̤͓̻̤̺͉͉͚̗̘͛̒̒̅̊͒́̌͒̇̀̅͒̒̏̍̉̄͋̆͑̑̾̿̑̐̈́̿͑̓̾̓͐̇͒͂̉̊̈́̒́̒͊́̎̓̏͋̆̏̽̕̕͘̚̕̚͘̚͜͝͝ͅC̸̨̧̢̢̛̛̱̰̲̝͇̜̮͔̣͇͍̘̭̳͎͉̘̪̯͎̲̹̝͙͙͕͙̝͋͌̄͆̃͋̈́̄̓͐̂̈́̋̾̍̌̌̅͊̽̈́̀̿̅̈́̆̑̑̓̈́̚͠͝A̵̧̡̢̛̱̬̲̰̦͍̜̜̤̭̮͈̤̤̞͇̣̙͓̫̲̼͕͇͖̭̯̣̣̩̜͙̗̼̟̯̝̹͉͔̞̗͙͕̫̮̗̩͐̓̐͌̇͐͂͂̑̈̌̊̄̈́̍̃̈́̈́̃̅̏̒̈͌̍̉͒̄̽͛́͘͘̕͜Ļ̶̡̛̛̤̥̯̪̥̤̭͕͓͓̲̭̘͍̥̲͇͓̟͓̳͈̹͙̜̤̲̝̲̗̘͍̥͓̥͇̳̜̯͕̪̠̮̝͖̣͙̦͖͕͖͇̘̬̯̘̼̠̻̌̔̓̉̾̋̓̄̾͒̒̑̃̄̓̈̋̓͑̇͂̈́̓͐͊́̉͑̊̈́̐̐̋͌͘͜͝͝͝ͅ ̴̡̢̨̢̢̩̟̰̞͚͍̩͎̬̦̟͓̯̩͔͙̯͎̥͎͇̥͔̬̱͖̮͈̻̤̘̗͔̞͉͚̰̺̤̫̱̟̦̗̘̘͙̘̼̻̮̘̫̦̘̱̤͌͑͋͐̈́̆̂̈́̎̉͆̾́̕̚̚ͅȄ̴̦̯͕̯̮̩̜̮̥̫͈͈̅̈́́͑̿̉͆̅̈͒̓̿͗̂͐̌̓͐̇̀͐̽́̀̊̑̽̅́̉́́́̚̕͠R̸̢̢͉̰̣͕͍̝̘̭͍̱̼͙͙̙̪̣̫̪̖̺̞̲͕̖͕̱̯̪̥̻̪̫̈͛͒̏̂̔͆̆́͋͜͜Ȓ̶̡̢̡̢̡̧̛̙͈̩̺͖̙̜̞͚̰̪̗̣̱͖̩͓͕̺̬̲̮̥͈͍̠̘̙͍̩̹̖̙͙̱̻͖̞̳̮̤̗̞̦̖͇͔̣̬̪͔̯̱̦̹͎̳̠̹̘͔͇́̑̎͆̓͂̓́͑̈̌̅̾̊͂͆̀̆̿͑́͆̒̄͒̍͗̐̄̐̑̀͊̄͌͋͛̋̏̂͑̽̿̾͑͐̀̂͋͘͜͝͝͝͠ͅͅͅǪ̸̧̡̫̩̫̘͓̺̮͖͕̦̫̺̯͉͔̳̖̺͕̗͈̲͔̱͇̊̔̃̌͜͠Ṙ̴̨̨̨̡̛̰̯̱͕̻̠̫̤̠͕̦̥͔̞͈͙̪̳͕̭̖̐̈́̾̍͒̓̀̇̍̓̅͒̓͊̽̃̓͆͋̆̇̽̈́̃̅̐̍͆͒̅̌̃́̇̎̕̕͠"
    }

    function showBSOD() {

        var body = document.body;
        var bleu = (window.bleu && window.bleu === true);

        /**
         * Main Container
         */

        var bgStyles = {
            'font-family': "'Lucida Console', 'Lucida Sans Typewriter', monaco, 'Bitstream Vera Sans Mono', monospace",
            'background': 'black',
            'position': 'fixed',
            'top': '0px',
            'left': '0px',
            'width': '100%',
            'height': '100%',
            'color': '#fff'
        }

        var bsodContainer = document.createElement('div');
        applyProperties( bsodContainer, bgStyles );

        /**
         * BSOD Error
         */

        var errorStyles = {
            'position': 'absolute',
            'left': '50%',
            'top': '50%',
            'font-size': '14px',
            'max-width': '420px',
            'transform': 'translateX(-50%) translateY(-50%)',
            'mozTransform': 'translateX(-50%) translateY(-50%)',
            'webkitTransform': 'translateX(-50%) translateY(-50%)',
        }

        var error = document.createElement('div');
        applyProperties( error, errorStyles );
        bsodContainer.appendChild( error );

        /**
         * Header
         */

        var headerStyles = {
            'text-align': 'center',
            'margin-bottom': '10px'
        }

        var header = document.createElement('div');
        applyProperties( header, headerStyles );
        error.appendChild( header );

        /**
         * Header Contents
         */

        var headerContentStyles = {
            'background': 'rgba(255, 255, 255, 0.7)',
            'color': bleu ? "rgb(176, 160, 121)" : '#0000AA',
            'margin': 'auto'
        }

        var headerContent = document.createElement('span');
        applyProperties( headerContent, headerContentStyles );
        headerContent.innerHTML = "Ḉ̵̢̧̛̯̻̯͔̠͎̩̰̱͈̝̦̫̥̦͙̜̹̬̗͖̯̏̒̿̍̈̆̅̀͒̈́̽͌͂͒͐͊́͋͋̿̓̇͐̏̆̑̌̏̈́̋̐̈́̓̒̈́̈́̂͆̊̾́̂̔́̿̉͛̇̔̾̕̕͜͠͠͠͠R̸̨̧̧̨̛͕̩̮̳͈̭͙̝͕͚̗̪̰̞̹̦͎̠̖̻̹̘͙̪̰̦̣͇̣̟͊̊̃̂̆̚͜͝ͅĬ̷̡̛͉̣̲̤͈͍͔́̇́̃̽̍̍̈́͘͘͘͝͝͠ͅT̵̢̨̧̧̢̧̧̢̙̖̩̥̫͓̥͓͚͓͔̫̳̖̹͓̬̖̬͈̰̲̰͙͎̳̠͙̱͚̣͇͔͈̞̫̦̬͈̘͖͖͇̘͉̤̖̤̱̖͈͈̳͉͙̂̄͗̈͛͋̔͒̌̚͜͜I̷̡̨̨̢̧̛̟̗̭͕͍͚̪̹̣̤͔͇̼̜̳̬̯̦̰̪̼͖̻̤͓̻̤̺͉͉͚̗̘͛̒̒̅̊͒́̌͒̇̀̅͒̒̏̍̉̄͋̆͑̑̾̿̑̐̈́̿͑̓̾̓͐̇͒͂̉̊̈́̒́̒͊́̎̓̏͋̆̏̽̕̕͘̚̕̚͘̚͜͝͝ͅC̸̨̧̢̢̛̛̱̰̲̝͇̜̮͔̣͇͍̘̭̳͎͉̘̪̯͎̲̹̝͙͙͕͙̝͋͌̄͆̃͋̈́̄̓͐̂̈́̋̾̍̌̌̅͊̽̈́̀̿̅̈́̆̑̑̓̈́̚͠͝A̵̧̡̢̛̱̬̲̰̦͍̜̜̤̭̮͈̤̤̞͇̣̙͓̫̲̼͕͇͖̭̯̣̣̩̜͙̗̼̟̯̝̹͉͔̞̗͙͕̫̮̗̩͐̓̐͌̇͐͂͂̑̈̌̊̄̈́̍̃̈́̈́̃̅̏̒̈͌̍̉͒̄̽͛́͘͘̕͜Ļ̶̡̛̛̤̥̯̪̥̤̭͕͓͓̲̭̘͍̥̲͇͓̟͓̳͈̹͙̜̤̲̝̲̗̘͍̥͓̥͇̳̜̯͕̪̠̮̝͖̣͙̦͖͕͖͇̘̬̯̘̼̠̻̌̔̓̉̾̋̓̄̾͒̒̑̃̄̓̈̋̓͑̇͂̈́̓͐͊́̉͑̊̈́̐̐̋͌͘͜͝͝͝ͅ ̴̡̢̨̢̢̩̟̰̞͚͍̩͎̬̦̟͓̯̩͔͙̯͎̥͎͇̥͔̬̱͖̮͈̻̤̘̗͔̞͉͚̰̺̤̫̱̟̦̗̘̘͙̘̼̻̮̘̫̦̘̱̤͌͑͋͐̈́̆̂̈́̎̉͆̾́̕̚̚ͅȄ̴̦̯͕̯̮̩̜̮̥̫͈͈̅̈́́͑̿̉͆̅̈͒̓̿͗̂͐̌̓͐̇̀͐̽́̀̊̑̽̅́̉́́́̚̕͠R̸̢̢͉̰̣͕͍̝̘̭͍̱̼͙͙̙̪̣̫̪̖̺̞̲͕̖͕̱̯̪̥̻̪̫̈͛͒̏̂̔͆̆́͋͜͜Ȓ̶̡̢̡̢̡̧̛̙͈̩̺͖̙̜̞͚̰̪̗̣̱͖̩͓͕̺̬̲̮̥͈͍̠̘̙͍̩̹̖̙͙̱̻͖̞̳̮̤̗̞̦̖͇͔̣̬̪͔̯̱̦̹͎̳̠̹̘͔͇́̑̎͆̓͂̓́͑̈̌̅̾̊͂͆̀̆̿͑́͆̒̄͒̍͗̐̄̐̑̀͊̄͌͋͛̋̏̂͑̽̿̾͑͐̀̂͋͘͜͝͝͝͠ͅͅͅǪ̸̧̡̫̩̫̘͓̺̮͖͕̦̫̺̯͉͔̳̖̺͕̗͈̲͔̱͇̊̔̃̌͜͠Ṙ̴̨̨̨̡̛̰̯̱͕̻̠̫̤̠͕̦̥͔̞͈͙̪̳͕̭̖̐̈́̾̍͒̓̀̇̍̓̅͒̓͊̽̃̓͆͋̆̇̽̈́̃̅̐̍͆͒̅̌̃́̇̎̕̕͠";
        header.appendChild( headerContent );

        /**
         * Main Text
         */

		const bsodMessage = [
			"OOPS! LOOKS LIKE YOUR [Little Sponge] HAS ENCOUNTERED A [Big Shot] PROBLEM!",
			"ERROR CODE: [Hyperlink Blocked]",
			"YOUR [[HeartShapedObject]] HAS BEEN [Frozen] LIKE A LITTLE [Only$9.99] IN THE [Dumpster]!",
			"WE'RE JUST HAVING A LITTLE [[Technical Difficulties]], BUT DON'T WORRY! I, SPAMTON G. SPAMTON, WILL BE YOUR [[Bigshot]] TECH SUPPORT!",
			"JUST [[Press Enter]] TO REBOOT AND WE'LL BE BACK TO MAKING [Deals] AND [Hyperlink Blocked] IN NO TIME!",
			"OR, IF YOU'RE FEELING [Desperate], YOU CAN ALWAYS CALL UPON THE [Power of NEO] BY [Pressing F1]!",
			"REMEMBER, KID! WHEN YOUR [Machine] BREAKS DOWN, YOU CAN ALWAYS RELY ON YOUR OLD PAL SPAMTON FOR A [[Special Discount]]!",
			"NOW LET'S GET BACK TO [[Making Kromer]]!"
		  ];		  
		  

        var mainContent = document.createElement('div');
        mainContent.innerHTML = bsodMessage.join('<br /><br />');
        error.appendChild( mainContent );
        body.appendChild(bsodContainer);
		var audio = new Audio('midi/spamton.mp3');
		audio.loop = true;
		audio.play();

		document.addEventListener('keydown', function() {
			window.location.href = 'https://www.google.com';
		});
		document.addEventListener('mousedown', function() {
			window.location.href = 'https://www.google.com';
		});
    }

    init();
})()