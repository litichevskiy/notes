

$('button[data-name="settings"]').click( function( event ){

	 	$('div[class="container"]').css({

	 		'position' : 'absolute',
	 		'right' : '0%'
	 	});

	 	$('div[class="container"]').animate({

	 		'width' : '90%'

	 	},500);
		
		$('div[role="settings"]').show( 500 );
});


$('button[data-name="close"]').click( function(){

	$('div[class="container"]').animate({

	 	'width' : '100%',
	 	'position' : 'static',
	 	'right' : '0%'

	},500);
	
	$('div[role="settings"]').hide( 500 );

})