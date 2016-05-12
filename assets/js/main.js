/**
 * 
 * FILE: CoinCount
 * 
 * AUTHOR: Adam Bulmer
 * DATE: 2014
 * VERSION 1.0
 * 
 */
var CoinCount = (function(input){

// Private variables

	/**
	 * Penny value for available coins.
	 */
	var currency = {
		"£2"	: 200,
		"£1"	: 100,
		"50p" : 50,
		"20p" : 20,
		"10p" : 10,
		"5p"	: 5,
		"2p"	: 2,
		"1p"	: 1
	};

	/**
	 * Symbols for outputting / inputting
	 */
	var units = {
		"major": "£",
		"minor": "p"
	}

// Private Methods

	/**
	 * Check to see if the input is valid.
	 */
	function _validInput(input) {

		// check to see if negative number has been passed in.
		if(parseInt(input) < 0) {
			return false;
		}

		// pound is optional, wildcard length before the point optional, 
		// wildcard length after the point optional, 
		// p optional
		var regex = /^(\d+)p?$|^£?(\d+)(.\d+p?)?$/;
		return regex.test(input);
	
	}

	/**
	 * Regex for handling zeros at beginning of an input
	 */
	function _handleZerosAtBeginning(input) {
		return input.match(/^0{1,2}/);
	}

	/**
	 * Regex for matching inputs with decimals and no units;
	 */
	function _handleDecimalsWithoutUnits(input) {
		return input.match(/\d+\.\d+/);
	}

	/**
	 * Strip units and convert to float.
	 */
	function _stripUnits(input) {
		return parseFloat(input.replace(units.major, "").replace(units.minor, ""));
	}

	/**
	 * Handle Penny formats, could do with refractoring
	 */
	function _handlePennyFormats(input) {
		return (((input.contains(units.minor)) && (! input.contains(units.major))) || 
				((! input.contains(units.minor)) && (! input.contains(units.major))));
	}

	/**
	 * Convert the input to pennies for calculation.
	 */
	function _convertToPennies(input){

		if(typeof input == 'string') {
			
			// Handle zeros at beginning
			if(_handleZerosAtBeginning(input)) {
				
				return parseInt(_stripUnits(input) * 100, 10);

			// Handle decimals without units
			} else if(_handleDecimalsWithoutUnits(input)) {
			
				return Math.round(_stripUnits(input) * 100);
			
			// Handle penny formats
			} else if (_handlePennyFormats(input)) {

				return Math.round(_stripUnits(input));

			}

			// Handle decimals possibily with £ or p
			return Math.round(_stripUnits(input) * 100);

		}

		// handle penny format without the formatting, passed in as a number.
		return input;

	}

	/**
	 * Calculate the number of coins needed.
	 */
	function _countCoins(input) {
		
		var wallet = [];

		for(var coin in currency){
		  while(input >= currency[ coin ]) {
				wallet.push(coin);
				input -= currency[ coin ];
			}
		}

		return wallet;
	
	}

// Public methods.

	/**
	 * Polyfill for the ES6 String.contains method.
	 */
	if (!String.prototype.contains) {
    String.prototype.contains = function() {
        return String.prototype.indexOf.apply(this, arguments) !== -1;
    };
	}

	return {
		/**
		 * Output the correct change to the user
		 */
		giveChange : function(input) {

			if(_validInput(input)) {
				input = _convertToPennies(input);
				return _countCoins(input);
			}

			return false;

		},
		/**
		 * Allow dev to convert to pennies
		 */
		convertToPennies : function(input) {
			return _convertToPennies(input);
		},
		/**
		 * allow the dev to override the units
		 */
		updateUnits: function(major, minor) {
			
			units = {
				"major": major,
				"minor": minor
			};

		}
	};

})();/**
 * 
 * FILE: FrontendUI
 * 
 * AUTHOR: Adam Bulmer
 * DATE: 2014
 * VERSION 1.0
 * 
 */
var FrontendUI = {
	
	coins : [],
	init : function() {
		
		FrontendUI.setupCalculator.apply( this );
		
	},
	removePrevious : function() {
		
		$( '.wallet__error' ).remove();
		$( '.wallet__coin' ).remove();

	},
	setupCalculator : function() {

		$( '#wallet__input' ).on( 'keydown', function(e) { 
			
			if (e.which == 13) { 

				FrontendUI.coins = CoinCount.giveChange($(this).val());
				
				if( FrontendUI.coins ) {

					FrontendUI.removePrevious();

					FrontendUI.coins.forEach( function( coin ) {
						$( '.wallet__pouch' ).append( "<div class=\"wallet__coin\">" + coin + "</div>" );
					});

				} else {

					FrontendUI.removePrevious();

					$( '.wallet__pouch' ).append( "<div class=\"wallet__error\">You have not specified a correct input value.</div>" );
				}

				e.preventDefault(); 

			}

		});

	}
		
};/**
 * 
 * FILE: Main JS
 * 
 * AUTHOR: Adam Bulmer
 * DATE: 2014
 * VERSION 1.0
 * 
 */
$(function() {

    if( typeof FrontendUI != 'undefined' ) {
       FrontendUI.init.apply( FrontendUI );
    }

});