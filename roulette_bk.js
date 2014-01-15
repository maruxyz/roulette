var $index = 0;
var $hitIndex = -1;
var $defaultColor= "white";
var $nameColor = "#009966";
var $1stColor = "#0033ff";
var $2ndColor = "#ff3333";
var $color = $1stColor;
var $times = 0;

function start() {
	if ( $times >= 2 ) {
		init();
	}
	
	var $arr = $( ".nameplate" );
	var $arrChild = $( ".name" );

	if ( $index >= $arr.size() ) {
		$index = 0;
	}
	/* 一度あたったら飛ばす。*/
	if ( $index == $hitIndex ) {
		$index++;
		if ( $index >= $arr.size() ) {
			$index = 0;
		}
	}
	
	/* 元に戻す */
	$arr.css( "background", $defaultColor );
	$arrChild.css( "color", $nameColor );
	/* 指定の枠だけ色を付ける。*/
	$arr.eq( $index ).css( "background", $color );
	$arrChild.eq( $index++ ).css( "color", $defaultColor );

	if ( $hitIndex >= 0 ) {
		$arr.eq( $hitIndex ).css( "background", $1stColor );
		$arrChild.eq( $hitIndex ).css( "color", $defaultColor );
	}
};

function startRoulette() {

	var $button = $( "#startbutton" );
	$button.attr( "disabled", "true" );
	var $count = 0;
	var $limit = getLimit();
	var $timer = setInterval( function() {
		start();
		if ( $count++ >= $limit ) {
			clearInterval( $timer );
			$count = 0;
			$timer = setInterval( function() {
				start();
				if ( $count++ >= 5 ) {
					clearInterval( $timer );
					$count = 0;
					$timer = setInterval( function() {
						start();
						if ( $count++ >= 3 ) {
							clearInterval( $timer );
							$hitIndex = $index-1;
							flash();
							$color = $2ndColor;
							$times++;
							$button.removeAttr( "disabled" );
						}
					}, 500 );
				}
			}, 300 );
		}
	}, 100 );

	
};

function init() {
	$index = 0;
	$hitIndex = -1;
	$color = $1stColor;
	$times = 0;
};

function getLimit() {
	var $arr = $( ".nameplate" );
	var $arrSize = $arr.size();
	var $ret = Math.floor( Math.random() * $arrSize ) + $arrSize;
/*	while ( ( $times % 2 == 0 ) && ( $ret % 4 ) == 0 ) { */
	while ( ( $ret % 4 ) == 0 ) {
		$ret = Math.floor( Math.random() * $arrSize ) + $arrSize;
	}
	return $ret;
};

function flash() {
	var $count = 0;
	var $arr = $( ".nameplate" );
	var $arrChild = $( ".name" );
	var $tempColor = $color;
	$timer = setInterval( function() {
		var $flashColor = ( $count % 2 ) == 0 ? $defaultColor : $tempColor;
		var $flashColorText = ( $count % 2 ) == 0 ? $nameColor : $defaultColor;
		$arr.eq( $hitIndex ).css( "background", $flashColor );
		$arrChild.eq( $hitIndex ).css( "color", $flashColorText );
		if ( $count++ >= 5 ) {
			clearInterval( $timer );
		}
	}, 300 );
};
