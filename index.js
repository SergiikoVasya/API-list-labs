async function fetchQ(countPage) {
    const posts = await fetch(
      `https://api.unsplash.com/photos/?client_id=ab3411e4ac868c2646c0ed488dfd919ef612b04c264f3374c97fff98ed253dc9&page=${countPage === undefined ? 1 : countPage}`
      )
      const json = await posts.json()
      return json
    }
    
const mainDiv = document.getElementById('app')
const contentDiv = document.getElementById('content')
const paginationDiv = document.getElementById('pagination')
const usersdiv = document.createElement('div')
const headDiv = document.createElement('div')
let heartShowOnPhoto = document.getElementById('heart-anim')
    
async function main(page) {
    const gUsers = await fetchQ(page)
    clearAll()
    createList(gUsers, page)
  }

function createList(posts, page){
  posts.forEach(user => {
    const div = document.createElement('div')
    
    div.classList.add('box', 'user', 'list')
    div.id = user.id
    div.textContent = user.user.username

    const profileImg = document.createElement('img')
    profileImg.src = user.user.profile_image.small

    div.appendChild(profileImg)
    usersdiv.appendChild(div)

    div.addEventListener('click', () => showPhoto(posts, user))
});
  headDiv.classList.add('header_content', 'box')
  headDiv.textContent = 'List users :)'
  usersdiv.classList.add('user-list')
  contentDiv.appendChild(headDiv)
  contentDiv.appendChild(usersdiv)
  pagination(page)
}

const showPhoto = (users, chosenPost) => {
    const profileImg = document.createElement('img') 
    const photo = document.createElement('img')
    const arrow = document.createElement('div')
    const profileDiv = document.createElement('div')

    mainDiv.style.background = chosenPost.color

    photo.src = chosenPost.urls.regular
    photo.classList.add('bigPhoto')

    const likesDiv = addLikes(chosenPost, photo)
    
    paginationDiv.classList.add('hide')
    headDiv.classList.add('header_content_changed')
    
    profileImg.src = chosenPost.user.profile_image.small
    
    headDiv.textContent = ""
     
    profileDiv.classList.add('profile')
    profileDiv.textContent = chosenPost.user.username;
    profileDiv.appendChild(profileImg)
    
    headDiv.appendChild(arrow)
    headDiv.appendChild(profileDiv)
    contentDiv.appendChild(photo)
    contentDiv.appendChild(likesDiv)


    users.forEach(item => {
        const div = document.getElementById(item.id)
        div.classList.toggle('hide')
    })

    arrow.addEventListener('click', () => reset(users, photo, likes))
    arrow.classList.add("arrow", 'arrow-left')
  }

const addLikes = (chosenPost, photo) => {

  const heart = document.createElement('div')
  heart.classList.add('heart')
  if(chosenPost.liked_by_user){
    heart.classList.add('heart-red')
  }
  const likes = document.createElement('div')
  likes.classList.add('likes')
  likes.textContent = chosenPost.likes
  likes.id = 'likes'
  likes.appendChild(heart)

  photo.addEventListener('dblclick', () => pressLike(heart, chosenPost, likes))
  likes.addEventListener('click', () => pressLike(heart, chosenPost, likes))

  return likes
}

const pressLike = (heart, chosenPost, likeDiv) => {
  if (heartShowOnPhoto != undefined){
    contentDiv.removeChild(heartShowOnPhoto)
  }

  heartShowOnPhoto = document.createElement('div')
  heartShowOnPhoto.id = 'heart-anim'
  if(heart.classList.contains('heart-red')){
    heart.classList.remove('heart-red')
    heartShowOnPhoto.classList.add('heart', 'heart-white', 'heart_for_anim')
    contentDiv.appendChild(heartShowOnPhoto)
    chosenPost.liked_by_user = false
    chosenPost.likes--
    likeDiv.textContent = chosenPost.likes
    likeDiv.appendChild(heart)
  }
  else {
    heartShowOnPhoto.classList.add('heart', 'heart-red', 'heart_for_anim')
    contentDiv.appendChild(heartShowOnPhoto)
    heart.classList.add('heart-red')
    chosenPost.liked_by_user = true
    chosenPost.likes++
    likeDiv.textContent = chosenPost.likes
    likeDiv.appendChild(heart)
  }
}

const reset = (users, photo, likes) =>{
    users.forEach(item => {
      const div = document.getElementById(item.id)
      div.classList.remove('hide')
  })
    paginationDiv.classList.remove('hide')
    photo.remove()
    mainDiv.style.background = ''
    headDiv.innerHTML = ''
    headDiv.textContent = 'List users:'
    headDiv.classList.remove('header_content_changed')

    contentDiv.removeChild(likes)
    contentDiv.removeChild(heartShowOnPhoto)
    heartShowOnPhoto = undefined
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
  contentDiv.innerHTML = ''
  usersdiv.innerHTML = ''
}

main()
  
