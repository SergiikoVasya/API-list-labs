async function fetchQ(countPage) {
    const users = await fetch(
      `https://api.unsplash.com/photos/?client_id=ab3411e4ac868c2646c0ed488dfd919ef612b04c264f3374c97fff98ed253dc9&page=${countPage === undefined ? 1 : countPage}`
      )
      const json = await users.json()
      return json
    }
    
const mainDiv = document.getElementById('app')
const contentDiv = document.getElementById('content')
const paginationDiv = document.getElementById('pagination')
const usersdiv = document.createElement('div')
usersdiv.classList.add('user-list')
contentDiv.appendChild(usersdiv)
    
async function main(page) {
    const gUsers = await fetchQ(page)
    clearAll()
    createList(gUsers, page)
  }

function createList(users, page){
  
  
  users.forEach(user => {
    const div = document.createElement('div')
    
    div.classList.add('box', 'user', 'list')
    div.id = user.id
    div.textContent = user.user.username

    const profileImg = document.createElement('img')
    profileImg.src = user.user.profile_image.small

    div.appendChild(profileImg)
    usersdiv.appendChild(div)

    div.addEventListener('click', () => showPhoto(mainDiv, users, user))
});
  pagination(page)
}

const showPhoto = (mainDiv, users, chosenUser) => {
    const profileImg = document.createElement('img')
    const photo = document.createElement('img')
    const arrow = document.createElement('div')
    const profileDiv = document.createElement('div')
    const head = document.getElementById('head')
    paginationDiv.classList.add('hide')
    head.classList.add('header_content_changed')
    
    profileImg.src = chosenUser.user.profile_image.small
    
    head.textContent = ""
     
    profileDiv.classList.add('profile')
    profileDiv.textContent = chosenUser.user.username;
    profileDiv.appendChild(profileImg)
    
    head.appendChild(arrow)
    head.appendChild(profileDiv)
    contentDiv.appendChild(photo)

    users.forEach(item => {
        const div = document.getElementById(item.id)
        div.classList.toggle('hide')
    })

    photo.src = chosenUser.urls.regular
    photo.classList.add('bigPhoto')

    arrow.addEventListener('click', () => reset(users, photo, mainDiv, head))
    arrow.classList.add("arrow", 'arrow-left')
  }

const reset = (users, photo, mainDiv, head) =>{
    users.forEach(item => {
      const div = document.getElementById(item.id)
      div.classList.remove('hide')
  })
    paginationDiv.classList.remove('hide')
    photo.remove()
    head.innerHTML = ''
    head.textContent = 'List users:'
    head.classList.remove('header_content_changed')
  }
  
function pagination(page){
  const pagesNum = Array.from(Array(10), (_,i) => i+1)
  page = page === undefined ? 1 : page

  const divArrowRight = document.createElement('div')
  divArrowRight.classList.add('arrow', 'arrow-right')
  const divArrowLeft = document.createElement('div')
  divArrowLeft.classList.add('arrow', 'arrow-left')

  page === 1 ? divArrowLeft.addEventListener('click',()=> main(10)) : divArrowLeft.addEventListener('click',()=> main(page-1))
  page === 10 ? divArrowRight.addEventListener('click',()=> main(1)) : divArrowRight.addEventListener('click',()=> main(page+1))

  paginationDiv.appendChild(divArrowLeft)

  pagesNum.forEach((item) => {
    const divPage = document.createElement('div')
    divPage.classList.add('numPage')
    if (page == item){
      divPage.classList.add('numPage_blue')
    }
    divPage.textContent = item
    paginationDiv.appendChild(divPage)
    divPage.addEventListener('click',()=> main(item))
    
  })
  paginationDiv.appendChild(divArrowRight)

}

function clearAll(){
  paginationDiv.innerHTML = ''
  usersdiv.innerHTML = ''
}

main()
  
