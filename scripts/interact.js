document.querySelector('body').addEventListener('click', (e) => {
  const { classList } = e.target

  if (classList.contains('add-book')) return toggleAdd()
  if (classList.contains('form-wrapper')) return toggleAdd()

  if (classList.contains('btn-del')) {
    deleteBook(e)
  }

  if (classList.contains('delete-wrapper')) {
    selected.classList.toggle('active')
    selected = null
    toggleDelete(e.target)
  }

  if (classList.contains('toggle-read')) return toggleBookRead(e)
  if (classList.contains('toggle-bauble')) return toggleBookRead(e)
})

form.onsubmit = submit

function toggleAdd() {
  toggleLock()
  formWrapper.classList.toggle('hidden')
}

function toggleDelete(e) {
  toggleLock()
  del.classList.toggle('hidden')
}

function toggleLock() {
  body.classList.toggle('locked')
  html.classList.toggle('locked')
  menu.classList.toggle('hidden')
}

function clearForm() {
  titleInput.value = ''
  authorInput.value = ''
  pagesInput.value = ''
  Array.from(readInput).forEach((e) => (e.checked = false))
}

function submit(e) {
  e.preventDefault()

  const bookTitle = titleInput.value.trim()
  const bookAuthor = authorInput.value.trim()
  const bookPages = pagesInput.value.trim()
  const readChoice = Array.from(readInput).filter(
    (element) => element.checked
  )[0]
  const bookRead = Boolean(Number(readChoice.id))

  if (!bookTitle) return console.error('Please enter a title')
  if (!bookAuthor) return console.error('Please enter an author')
  if (Number(bookPages) !== Number(bookPages))
    return console.error('Please enter a valid number')

  const newUserBook = new Book(bookTitle, bookAuthor, bookPages, bookRead)
  newUserBook.addToLibrary()
  clearForm()
  toggleAdd()
  displayLibrary()
}

function clearBooks() {
  const books = Array.from(document.querySelectorAll('.book')).filter(
    (book) => book.classList[0] === 'book'
  )

  books.forEach((book) => libraryDisplay.removeChild(book))
}

function displayLibrary() {
  clearBooks()
  library.forEach((book) => {
    libraryDisplay.insertBefore(book.createElement(), addBook)
  })
}

function deleteBook(e) {
  if (!selected) {
    selected = e.target
    selected.classList.toggle('active')
    const bookIndex = selected.parentElement.parentElement.id.split('_')[1]
    deleteSelection.textContent = library[bookIndex].title
  } else if (e.target.id === 'del-yes') {
    const bookIndex = selected.parentElement.parentElement.id.split('_')[1]
    library[bookIndex].removeFromLibrary()
    selected.classList.toggle('active')
    selected = null
    displayLibrary()
  } else {
    selected.classList.toggle('active')
    selected = null
  }
  toggleDelete(e.target)
}

function toggleBookRead(e) {
  // get enclosing book element
  let node = e.target
  while (!node.classList.contains('book')) {
    node = node.parentElement
  }

  const bookIndex = node.id.split('_')[1]
  const read = !library[bookIndex].read

  library[bookIndex].read = read

  document.querySelector(`#${node.id} .toggle-read`).classList.toggle('true')
  document.querySelector(`#${node.id} .rd-status`).textContent = read
    ? 'Read'
    : 'Not Read'
}
