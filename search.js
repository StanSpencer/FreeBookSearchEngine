const api = new GutendexAPI();

function searchBooks() {
  const query = document.getElementById('searchInput').value;

  axios
    .get(`https://gutendex.com/books?search=${query}`)
    .then(response => {
      const books = response.data.results;
      displaySearchResults(books);
    })
    .catch(error => {
      console.error('Error occurred during search:', error);
    });
}

function displaySearchResults(books) {
  const searchResultsContainer = document.getElementById('searchResults');
  searchResultsContainer.innerHTML = '';

  if (books.length === 0) {
    searchResultsContainer.innerHTML = 'No results found.';
    return;
  }

  // Display the search results box
  searchResultsContainer.style.display = 'block';

  books.forEach(book => {
    const resultItem = document.createElement('div');
    resultItem.classList.add('result-item');

    // Check if cover image URL is available
    if (book.formats && book.formats['image/jpeg']) {
      const coverImage = document.createElement('img');
      coverImage.src = book.formats['image/jpeg'];
      coverImage.alt = 'Book Cover';
      coverImage.classList.add('cover-image'); // Add a class for styling
      resultItem.appendChild(coverImage);
    }

    // Create the result content container
    const resultContent = document.createElement('div');
    resultContent.classList.add('result-content');

    // Create the book title link
    const bookLink = document.createElement('a');
    bookLink.href = `https://www.gutenberg.org/ebooks/${book.id}`;
    bookLink.textContent = book.title;
    resultContent.appendChild(bookLink);

    // Add additional content, such as subjects
    if (book.subjects && book.subjects.length > 0) {
      const subjectsInfo = document.createElement('p');
      subjectsInfo.textContent = `Subject(s): ${book.subjects.join(', ')}`;
      resultContent.appendChild(subjectsInfo);
    }

    // Append the result content container to the result item
    resultItem.appendChild(resultContent);

    // Append the result item to the search results container
    searchResultsContainer.appendChild(resultItem);
  });
}
