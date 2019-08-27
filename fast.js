console.clear();

var list = [],
    filteredList = [],
    maxDisplayLimit = 10,
    page = 1,
    n_pages = 0,
    textInput = document.querySelector('.text-filter'),
    displayList = document.querySelector('.list'),
    countMessage = document.querySelector('.count-message'),
    pagination = document.querySelector('.pagination');

function generateDummyList(itemCount) {
  if (!itemCount) return;
  n_pages = Math.ceil(itemCount / maxDisplayLimit);
  for (var i = 0; i < itemCount; i++) {
    var item = {
	name:     'Row ' + (i+1) + ', Column 1',
	type:     'Row ' + (i+1) + ', Column 2',
	category: 'Row ' + (i+1) + ', Column 3'
    };
    list.push(item);
  }
}

function generateCountMessage() {
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
    // page - the page the user will go do
    // display - the displayed part of the link
    return '<a href="#" onclick="generateList(' + page + ');  return false;">' + display + '</a>';
}

function generatePagination() {
    // Pagination is composed of 3 parts:
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
    var li = document.createElement('li'),
          spanName = document.createElement('span'),
          spanType = document.createElement('span'),
          spanCategory = document.createElement('span');
      spanName.classList.add('name');
      spanType.classList.add('type');
      spanCategory.classList.add('category');
      spanName.textContent = item.name;
      spanType.textContent = item.type;
      spanCategory.textContent = item.category;
      li.appendChild(spanName);
      li.appendChild(spanType);
      li.appendChild(spanCategory); 
  return li;
}

function generateList(thisPage) {
  var frag = document.createDocumentFragment();
  var pageLen = filteredList.length;
    page = thisPage;
  for (var i = (page - 1)*maxDisplayLimit; i < pageLen; i++) {
    if (i < page*maxDisplayLimit) {
	var item = filteredList[i],
          li = generateListItem(item);
      frag.appendChild(li);
    }
    else break;
  }
  displayList.innerHTML = '';
  displayList.appendChild(frag);
  generateCountMessage();
  generatePagination();
}

function textMatch(item) {
  var searchTerm = textInput.value.toLowerCase(),
      itemText = (item.name + item.type + item.category).toLowerCase();
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

textInput.addEventListener('keyup', getFilteredItems);

generateDummyList(100000);
getFilteredItems();
