// ==UserScript==
// @name           Amazon Wishlist Price Drop
// @author         T. Knight
// @description    Highlights wishlist items that have dropped substantially in price or are unavailable
// @version        6
// @include          /https?://www\.amazon\.com.*/
// ==/UserScript==

// Set this to 1 to hide prices site-wide
var hidePrices = 0;

// Hide Price function
if(hidePrices) {
    var vPrices = document.getElementsByTagName('*');
    for(var i=0; i<vPrices.length; i++) {
        if((/^\$.*/).test(vPrices[i].innerHTML)) {
            vPrices[i].innerText = 'N/A';
        }
    }
}

var thisPage = '';

setInterval(function() {
  if(window.location.href != thisPage) {
    thisPage = window.location.href;

    var vItemsPriceDrop = document.getElementsByClassName('a-row itemPriceDrop'),
        vItemsUnavailable1 = document.getElementsByClassName('a-size-base a-color-price a-text-bold'),
        vItemsUnavailable2 = document.getElementsByClassName('itemAvailMessage a-text-bold');

    // Item has dropped 20% or more in price
    for(var i=0; i<vItemsPriceDrop.length; i++) {
      if(vItemsPriceDrop[i].innerText.match(/Price dropped [2-9][0-9]/)) {
        vItemsPriceDrop[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.backgroundColor = 'lightgreen';
      }
    }

    // Item is 'Currently unavailable'
    for(var j=0; j<vItemsUnavailable1.length; j++) {
      if(vItemsUnavailable1[j].innerText.toLowerCase().match("unavailable")) {
        vItemsUnavailable1[j].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.backgroundColor = '#ffdada';
      }
    }

    // Item is 'Unavailable'
    for(var k=0; k<vItemsUnavailable2.length; k++) {
      if(vItemsUnavailable2[k].innerText.toLowerCase().match("unavailable")) {
        vItemsUnavailable2[k].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.backgroundColor = '#ffdada';
      }
    }
  }
}, 2000);
