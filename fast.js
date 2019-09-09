console.clear();

// See the end of the file for an example use of this code.

var list = [],
    filteredList = [],
    textInput       = document.querySelector('.text-filter'),
    displayList     = document.querySelector('.list'),
    countMessage    = document.querySelector('.count-message'),
    pagination      = document.querySelector('.pagination'),
    inputPageNumber = document.querySelector('.input-page-number'),
    columnDetail,
    maxDisplayLimit,
    page = 1,
    n_pages = 0;

function generateCountMessage() {
  // Display a message saying how many items matched.
  var msg = '',
      matches = filteredList.length;
  switch (true) {
    case (matches === 0):
      msg = 'No matches found';
      break;
    case (matches === 1):
      msg = 'Showing 1 item';
      break;
    case (matches <= maxDisplayLimit):
      msg = 'Showing ' + filteredList.length + ' items';
      break;
    default:
      msg = 'Showing ' + matches + ' items';
  }
  countMessage.textContent = msg;
}
  
function pageLink(page, display) {
    // Return the HTML code for a link going to a particular page.
    // page - the page the user will go do
    // display - the displayed part of the link
    // Turn off the link decoration (underscore).
    return '<a href="#" style="text-decoration: none;" onclick="generateList(' + page + ');  return false;">' + display + '</a>';

}

function generatePagination() {
    // Generate and display google-style pagination. Pages are numbered starting with 1
    // Pagination has  elements.
    //   before - the < and << icons if they make sense, and numbers prior to the current page.
    //   here - the current page number in bold.
    //   after - page numbers after the current page and the >> and > icons if they make sense.
    var before = '',
	here = '',
	after = '',
	befores = [pageLink(page - 1, '&lt;'),
		   pageLink(1,        '&Lt;')],
	afters =  [pageLink(n_pages,  '&Gt;'),
		   pageLink(page + 1, '&gt;')];
    if (page > 1) {
	if (page > 2) {
	    before = befores.join(' ');
	} else {
	    before = befores[0];
	}
	before = before + ' ';
    }
    for(var i = page-3; i<page; i++) {
	if (i >= 1) {
	    before = before + pageLink(i, i) + ' ';
	}
    }
    here = '<span style="font-weight: bold">' + page + '</span>';

    for(var i = page+1 ; i<=page+3; i++) {
	if (i <=  n_pages) {
	    after = after + ' ' + pageLink(i, i);
	}
    }
    if (page < n_pages) {
	after = after + ' ';
	if (page + 1 < n_pages) {
	    after = after + afters.join(' ');
	} else {
	    after = after + afters[afters.length - 1];
	}
    }
    pagination.innerHTML = before + here + after;
}


function generateListItem(item) {
    // Put a row into an HTML list item.
    // item - an array of values for a row.
    var li = document.createElement('li');
    for (j=0; j<columnDetail.length; j++) {
	var a_span = document.createElement('span');
	a_span.classList.add(columnDetail[j]);
	a_span.textContent = item[j];
	li.appendChild(a_span);
    }
  return li;
}

function generateList(thisPage) {
  // Generate and display the rows that match the filter.
  var frag = document.createDocumentFragment();
  var pageLen = filteredList.length;
  if (thisPage > n_pages) {
      thisPage = n_pages;
  }
  if (thisPage == 0 && filteredList.length > 0) {
      // Now we have pages, previously we did not.
      thisPage = 1;
  }
  page = thisPage;
  if ( filteredList.length > 0) {
      for (var i = (page - 1)*maxDisplayLimit; i < pageLen; i++) {
	if (i < page*maxDisplayLimit && i < filteredList.length) {
	    var item = filteredList[i];
	    li = generateListItem(item);
	    frag.appendChild(li);
	}
	else break;
      }
      displayList.innerHTML = '';
      displayList.appendChild(frag);
  } else {
      displayList.innerHTML = '';
  }
  generateCountMessage();
  generatePagination();
}

function textMatch(item) {
  // the 'match' function for an item.
  var searchTerm = textInput.value.toLowerCase(),
      itemText = item.join(' ').toLowerCase();
  return itemText.indexOf(searchTerm) !== -1;
}

function getFilteredItems() {
  filteredList = list.filter(textMatch);
  n_pages = Math.ceil(filteredList.length / maxDisplayLimit);
  if (page > n_pages) {
      page = n_pages;
  }
  generateList(page);
}

function initialize(columns, maxRows, listInitFun) {
    // Perform initialization.
    // columns - array of names for the columns.
    // maxRows - maximum number of rows to display.
    // listInitFun - function to initialize the list variable.
    columnDetail = columns;
    maxDisplayLimit = maxRows;

    textInput.addEventListener('keyup', getFilteredItems);
    inputPageNumber.addEventListener('keyup', function x(){generateList(this.value)});

    listInitFun(list);
    getFilteredItems();
}

// -------------------------------------------------------------------------

// The following items may change.
function initializeList(theList) {
  // Initialize the entire list with this function.
  var itemCount = 100000;
  n_pages = Math.ceil(itemCount / maxDisplayLimit);
  for (var i = 0; i < itemCount; i++) {
      // Each row is an array of values.
      var item = new Array(columnDetail.length);
      for (var j = 0; j<columnDetail.length; j++) {
	  item[j] = 'Row ' + (i+1) + ', Column ' + (j+1);
      }
      theList.push(item);
  }
}

initialize(['name', 'type', 'category'], 10, initializeList)

