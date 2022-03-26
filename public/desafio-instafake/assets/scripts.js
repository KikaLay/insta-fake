// Seleccion del DOM
const formInstafake = document.querySelector('#form-instafake')
const imagesSelector = document.querySelector('#img')
const logoutSelector = document.querySelector('#logout')
const moreSelector = document.querySelector('#more')
// Evento de escucha para submit del form
formInstafake.addEventListener('submit', async (e) => {
  e.preventDefault()
  const email = document.querySelector('#email').value
  const password = document.querySelector('#password').value
  const jwt = await postData(email, password)
  const post = await getPosts(jwt)
  logoutSelector.innerHTML = logout
  arrayForeach(post)
  // post.forEach((e) => {
  //   const postImg = e.download_url
  //   const postAutor = e.author
  //   imagesSelector.innerHTML += images(postImg, postAutor)
  // })
  formInstafake.classList.toggle('hide')
  moreSelector.classList.toggle('hide')
  logoutSelector.addEventListener('click', () => {
    localStorage.clear()
    location.reload()
  })
})
const arrayForeach = (array) => {
  array.forEach((e) => {
    const postImg = e.download_url
    const postAutor = e.author
    imagesSelector.innerHTML += images(postImg, postAutor)
  })
}

let paginas = 1
moreSelector.addEventListener('click', async () => {
  const token = localStorage.getItem('jwt-token')
  paginas++
  const getPage = await getPages(token, paginas)
  arrayForeach(getPage)
  // getPage.forEach((e) => {
  //   const postImg = e.download_url
  //   const postAutor = e.author
  //   imagesSelector.innerHTML += images(postImg, postAutor)
  // })
})

// postData
const postData = async (email, password) => {
  try {
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      body: JSON.stringify({ email: email, password: password }),
    })
    const { token } = await response.json()
    localStorage.setItem('jwt-token', token)
    return token
  } catch (err) {
    console.error(`Error: ${err}`)
  }
}

// getPosts
const getPosts = async (jwt) => {
  try {
    const response = await fetch('http://localhost:3000/api/photos', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    const { data } = await response.json()
    return data
  } catch (err) {
    console.error(`Error: ${err}`)
  }
}

// getPages
const getPages = async (jwt, p) => {
  try {
    const response = await fetch(`http://localhost:3000/api/photos?page=${p}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    const { data } = await response.json()
    return data
  } catch (err) {
    console.error(`Error: ${err}`)
  }
}
const logout = `<div id="block">
                  <h2 class="inline-block mb-3">Feed</h2>
                  <button id="logout" type="button" class="btn btn-outline-info mb-3">Cerrar</button>
                </div>`
const images = (img, autor) => ` 
                        <div class="card">
                        <img src="${img}" class="card-img-top" alt="" />
                        <div class="card-body">
                          <p class="card-text"><strong>Autor: </strong>${autor}</p>
                        </div>
                    </div>`
