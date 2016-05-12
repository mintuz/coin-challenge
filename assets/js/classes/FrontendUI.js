/**
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
		
};