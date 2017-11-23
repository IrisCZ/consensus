var ProposerEmail = {
    container: document.getElementById('proposer-email'),

    initialize: function() {
        var input = this.container.querySelector('input');

        input.addEventListener('blur', this.checkMail.bind(this));
        input.addEventListener('keypress', this.maskInput.bind(this));
    },

    checkMail: function(event) {
        isValid = this.validateEmail(event.target.value);

        this.markValidity(isValid);
    },

    markValidity: function(isValid) {
        var mark = 'invalid';

        if(isValid) {
            this.container.classList.remove(mark);
        } else {
            this.container.classList.add(mark);
        };
    },

    validateEmail: function(email){
        var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailPattern.test(email);
    },

    maskInput: function(event) {
        var text = event.target;
        var keynum = event.which;
        var character = String.fromCharCode(keynum);

        var thePattern = this.selectPattern(text.value);

        var isAllowed = this.employ(thePattern, character);

        if(!isAllowed) {
            event.preventDefault();
        };
    },

    employ: function(pattern, character) {
        var matcher = new RegExp(pattern);
        var result = matcher.exec(character);
        return result;
    },

    selectPattern: function(text) {
        var patterns = {
            local: "[ \@ | A-Z | a-z | 0-9 | \! | \# | \$ | \% | \& | \' | \* | \+ | \- | \/ | \= | \? | \^ | \_ | \` | \{ | \| | \} | \& ]",
            domain: "[ A-Z | a-z | 0-9 | \. |-]"
        };

        var result = patterns.local;

        if(text.includes('@')) {
            result = patterns.domain;
        };

        return result;
    }
};

ProposerEmail.initialize();


