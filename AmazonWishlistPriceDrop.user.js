// ==UserScript==
// @name           Amazon Wishlist Price Drop
// @author         T. Knight
// @description    Highlights wishlist items that have dropped 20% or more in price
// @version        4
// @include          /https?://www\.amazon\.com.*/
// ==/UserScript==

// Set this to 1 to hide prices site-wide
var hidePrices = 0;

// Hide Price function
if(hidePrices) {
    var vPrices = document.getElementsByTagName("*");
    for(var i=0; i<vPrices.length; i++) {
        if((/^\$.*/).test(vPrices[i].innerHTML)) {
            vPrices[i].innerText = "N/A";
        }
    }
}

var thisPage = "";

setInterval(function() {
    if(window.location.href != thisPage) {
        var thisPage = window.location.href;
		var vItemsPriceDrop = document.getElementsByClassName("a-row itemPriceDrop");
		var vItemsUnavailable = document.getElementsByClassName("a-size-base a-color-price a-text-bold");
		var vItemsUnavailable2 = document.getElementsByClassName("itemAvailMessage a-text-bold");

		for(var i=0; i<vItemsPriceDrop.length; i++) {
			if(vItemsPriceDrop[i].innerText.match(/Price dropped [2-9][0-9]/)) {
				vItemsPriceDrop[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.backgroundColor = 'lightgreen';
			}
		}

		for(var i=0; i<vItemsUnavailable.length; i++) {
			if(vItemsUnavailable[i].innerText.match("Unavailable")) {
				vItemsUnavailable[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.backgroundColor = '#ffdada';
			}
		}

		for(var i=0; i<vItemsUnavailable2.length; i++) {
			if(vItemsUnavailable2[i].innerText.match("unavailable")) {
				vItemsUnavailable2[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.backgroundColor = '#ffdada';
			}
		}
	}
}, 2000);