(function() {
    'use strict';

    Game.ObjectiveManager.Objective = function(game, objectiveManager, name) {
        Phaser.Group.call(this, game, objectiveManager, name);

        /**
         * Game instance
         * @type {Phaser.Game}
         */
        this.game = game;

        /**
         * Instance of objectiveManager
         * @type {Game.ObjectiveManager.Objective}
         */
        this.objectiveManager = objectiveManager;

        /**
         * Name of the objective
         * @type {String}
         */
        this.name = name;

        /**
         * Is the objective completed or not
         * @type {Boolean}
         */
        this.completed = false;

        /**
         * Signal that fires upon completion of objective
         * @type {Phaser.Signal}
         */
        this.onCompletion = new Phaser.Signal();
        this.onCompletion.add(this._onCompletionHandler, this);

        /**
         * Signal that fires upon failure of objective
         * @type {Phaser.Signal}
         */
        this.onFailure = new Phaser.Signal();
        this.onFailure.add(this._onFailureHandler, this);

        /**
         * An object containing style information for _titleText
         * @type {Object}
         */
        this._titleTextStyle = {
            font: '17pt arial'
        };

        /**
         * The Phaser.Text instance of the title
         * @type {Phaser.Text}
         */
        this._titleText = this.game.add.text(0, 0, this.name, this._titleTextStyle);
        this.add(this._titleText);

        this._statusTextStyle = { 
            font: '14pt arial' 
        };

        /**
         * The Phaser.Text instance of the status
         * @type {Phaser.Text}
         */
        this._statusText = this.game.add.text(0, 0, this.statusText, this._statusTextStyle);
        this._statusText.y = this._titleText.height;
        this.add(this._statusText);
    };

    Game.ObjectiveManager.Objective.prototype = Object.create(Phaser.Group.prototype);
    Game.ObjectiveManager.Objective.prototype.constructor = Game.ObjectiveManager.Objective;

    Game.ObjectiveManager.Objective.prototype._onCompletionHandler = function() {
        this._statusTextStyle.fill = '#01C611';
        this._statusText.setStyle(this._statusTextStyle);
    };

    Game.ObjectiveManager.Objective.prototype._onFailureHandler = function() {
        this._statusTextStyle.fill = '#ff0000';
        this._statusText.setStyle(this._statusTextStyle);
    };

    Game.ObjectiveManager.Objective.prototype.toString = function() {
        return this.name;
    };

    Object.defineProperty(Game.ObjectiveManager.Objective.prototype, 'statusText', {

        get: function() {
            if (this._statusText) {
                return this._statusText.text;
            }
            return this.name + ' status';
        },

        set: function(value) {
            this._statusText.text = value;
        }

    });  

})();