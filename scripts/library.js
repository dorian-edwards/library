const library = []
let selected = null

function reLabel() {
  library.forEach((book, i) => {
    book.index = i
  })
}

function Book(title, author, pages, read = false) {
  this.title = title
  this.author = author
  this.pages = Number(pages)
  this.read = read
}

Book.prototype.createElement = function () {
  const book = document.createElement('div')
  book.classList.add('book')

  const title = document.createElement('h3')
  title.classList.add('title')
  title.textContent = this.title

  const author = document.createElement('p')
  const pages = document.createElement('p')

  author.classList.add('author')
  author.textContent = this.author

  pages.classList.add('pages')
  pages.textContent = `${this.pages} pages`

  const read = document.createElement('div')
  read.classList.add('read')

  const readStatus = document.createElement('span')
  readStatus.classList.add('rd-status')
  readStatus.textContent = this.read ? 'Read' : 'Not Read'

  const readToggle = document.createElement('button')
  readToggle.classList.add('toggle-read')
  this.read && readToggle.classList.add('true')

  const toggleBauble = document.createElement('div')
  toggleBauble.classList.add('toggle-bauble')

  const deleteDiv = document.createElement('div')
  deleteDiv.classList.add('delete')

  const deleteButton = document.createElement('button')
  deleteButton.classList.add('btn-del')
  deleteButton.setAttribute('id', `del_${this.index}`)
  deleteButton.textContent = 'X'

  book.appendChild(title)
  book.appendChild(author)
  book.appendChild(pages)

  readToggle.appendChild(toggleBauble)
  read.appendChild(readStatus)
  read.appendChild(readToggle)

  book.appendChild(read)

  deleteDiv.appendChild(deleteButton)
  book.appendChild(deleteDiv)

  this.addToLibrary()
  book.setAttribute('id', `lib_${this.index}`)
  return book
}

Book.prototype.toggleRead = function () {
  this.read = !this.read
}

Book.prototype.listed = function () {
  let present = false
  library.forEach((book) => {
    if (book.title.toLowerCase() === this.title.toLowerCase()) {
      present = true
    }
  })

  return present
}

Book.prototype.addToLibrary = function () {
  let added = false
  if (library.length === 0) {
    this.index = 0
    library.push(this)
    added = true
  } else {
    if (!this.listed()) {
      this.index = library.length
      library.push(this)
      added = true
    }
  }

  if (added) {
    const localStorageLibary = JSON.stringify(library)
    window.localStorage.setItem('library', localStorageLibary)
  }
}

Book.prototype.removeFromLibrary = function () {
  if (this.listed()) {
    const index = this.index
    library.splice(index, 1)
  }

  reLabel()
}
