var ProposerEmail = {
    container: document.getElementById('proposer-email'),

    initialize: function() {
        var input = this.container.querySelector('input');

        input.addEventListener('blur', this.checkMail.bind(this));
        input.addEventListener('keypress', this.maskInput.bind(this));
        input.addEventListener('keypress', this.createEmailBox.bind(this));
    },

    checkMail: function(event) {
        var isValid = this.validateEmail(event.target.value);
        this.markValidity(isValid);
    },

    markValidity: function(isValid) {
        var markInvalid = 'invalid';
        var markValid = 'valid';
        var newEmail = document.querySelector('.newEmail:not(.valid):not(.invalid)');
        if(!newEmail){
          return;
        }
        if(isValid) {
            newEmail.classList.add(markValid);
          } else {
            newEmail.classList.add(markInvalid);
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
    },

    createEmailBox: function(e){
      var email = document.createElement('div');
      var closeButton = document.createElement('button');
      var input = this.container.querySelector('input');
      closeButton.textContent = "x";
      closeButton.addEventListener('click', this.hideEmailBox);
      email.textContent = input.value;
      if(e.keyCode === 13){
            document.querySelector("#proposer-email").appendChild(email).classList.add("newEmail");
            email.appendChild(closeButton).classList.add("closeButton");
            this.checkMail(e);
        }
    },

    hideEmailBox: function(e) {
        e.target.parentElement.classList.add("hidden");
    }

};

ProposerEmail.initialize();
