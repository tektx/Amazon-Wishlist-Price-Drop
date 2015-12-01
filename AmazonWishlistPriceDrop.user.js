// ==UserScript==
// @name           Amazon Wishlist Price Drop
// @author         T. Knight
// @description    Highlights wishlist items that have dropped substantially in price or are unavailable
// @version        5
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
        colorElement(vItemsPriceDrop[i], 8, 'lightgreen');
      }
    }

    // Item is 'Currently unavailable'
    for(var j=0; j<vItemsUnavailable1.length; j++) {
      if(vItemsUnavailable1[j].innerText.toLowerCase().match("unavailable")) {
        colorElement(vItemsUnavailable1[j], 10, '#ffdada');
      }
    }

    // Item is 'Unavailable'
    for(var k=0; k<vItemsUnavailable2.length; k++) {
      if(vItemsUnavailable2[k].innerText.toLowerCase().match("unavailable")) {
        colorElement(vItemsUnavailable2[k], 10, '#ffdada');
      }
    }
  }
}, 2000);

function colorElement(node, number, color) {
  if(number > 0) {
    console.log("number != 0");
    colorElement(node.parentNode, number-1, color);
  } else {
    node.style.backgroundColor = color;
  }
}
