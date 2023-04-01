let booksByAuthor = null;
let booksByTitle = null;

function processInput() {
  const input = document.getElementById('command').value.trim().split(' ');

  // Handle --help command
  if (input[0] === '--help') {
    // Output a usage message and exit
    let output = "Usage:\n" +
      "--help    Display this help message and exit.\n" +
      "-s, --search _TERMS_ Search the Goodreads' API and display the results on screen.\n" +
      "--sort _FIELD_ where field is one of 'author' or 'title'\n" +
      "-h, --host _HOSTNAME_ the hostname or ip address where the server can be found, should default to 127.0.0.1";

    document.getElementById("output").innerHTML = output; // Display the output in the page
    return; // And exit
  }

  // Handle search command
  if (input[0] === '-s' || input[0] === '--search') {
    if (input.length < 2) {
      document.getElementById("output").innerHTML = "Please provide search terms.";
      return;
    }
    const query = input.slice(1).join('+'); // Join search terms with '+'
    getAndDisplayBooks(query);
    return;
  }

  // Handle sort command
  if (input[0] === '--sort') {
    if (input.length < 2) {
      displayBooksByTitle();
      return;
    }
    const field = input[1];
    if (field === 'author') {
      displayBooksByAuthor();
    } else if (field === 'title') {
      displayBooksByTitle();
    } else {
      document.getElementById("output").innerHTML = "Unknown sort field.";
    }
    return;
  }

  let hostname = '127.0.0.1'; // Default hostname

  // Handle host command
  if (input[0] === '-h' || input[0] === '--host') {
    if (input.length < 2) {
      document.getElementById("output").innerHTML = "Please provide a hostname or IP address.";
      return;
    }
    hostname = input[1];
    document.getElementById("output").innerHTML = "Hostname set to " + hostname;
    return;
  }


  // Handle unknown command
  document.getElementById("output").innerHTML = "Unknown command.";
}

function getAndDisplayBooks(query) {
  const url = 'http://localhost:8080/search?q=' + query;
  const ul = document.getElementById('bookList');

  clearElement(ul);

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    }).then(function(books) {
      books.sort(compareBookTitles);
      booksByTitle = books;

      booksByAuthor = books.slice().sort(compareBookAuthors);

      displayBooksByTitle(); // Display search results sorted by title
    }).catch(error => {
      console.error('Error:', error)
      const errorSpan = document.getElementById('errorSpan');
      errorSpan.innerHTML = "Please retry.";
      setBooksToNull();
    });
}


function setBooksToNull(){
	booksByAuthor = null;
	booksByTitle = null;
}

function createNode(element) {
	return document.createElement(element);
}

function append(parent, element) {
	return parent.appendChild(element);
}

 function clearElement(element){
	element.innerHTML = '';
 }

 function compareBookAuthors(a, b){
	if(a.author > b.author){
		return 1;
	} else if(a.author < b.author){
		return -1;
	} else{
		return 0;
	}
 }

function compareBookTitles(a, b){
	if(a.title > b.title){
		return 1;
	} else if(a.title < b.title){
		return -1;
	} else{
		return 0;
	}
 }

function displayBooks(books, ul){
	if(books === null){
		return;
	}

	clearElement(ul);
	return books.map(function(book){
				const li = createNode('li');
				const img = createNode('img');
				const titleSpan = createNode('span');
				const authorSpan = createNode('span');

				img.src = book.imgUrl;
				titleSpan.innerHTML = book.title;
				authorSpan.innerHTML = book.author;

				append(li, img);
				append(li, titleSpan);
				append(li, authorSpan);
				append(ul, li);
			})
}

function displayBooksByAuthor(){
displayBooks(booksByAuthor, document.getElementById('bookList'));
}

function displayBooksByTitle(){
displayBooks(booksByTitle, document.getElementById('bookList'));
}