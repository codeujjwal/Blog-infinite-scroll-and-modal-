const  toggle = document.getElementById('toggle')
const  openmodal = document.getElementById('open')
const  closemodal = document.getElementById('close')
const  modal = document.getElementById('modal')
const postcontainer = document.getElementById('posts_container')
const loader = document.getElementById('loader')
const filter = document.getElementById('filter')

let limit = 5;
let page = 1;

toggle.addEventListener('click', () => {
    document.body.classList.toggle('show-nav')
})

openmodal.addEventListener('click', () => {
    modal.classList.add('show-modal')
})

closemodal.addEventListener('click', () => {
    modal.classList.remove('show-modal')
})


async function getPosts(){
    const resp = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)
    const data = resp.json()
    
    return data;
}

async function printPosts(){
    const posts =  await getPosts()

    posts.forEach(post => {
        
 
    const postel = document.createElement('div')
    postel.classList.add('post')
    postel.innerHTML = `
    <div class="post_no">${post.id}</div>
    <div class="post_title">${post.title}</div>
    <div class="post_body">${post.body}</div>
    `

    postcontainer.appendChild(postel)
});}

printPosts()

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    console.log(scrollHeight, scrollTop, clientHeight)



    if(scrollTop + clientHeight >= scrollHeight - 10 ){
        showLoader()
    }
})


function filterPosts(e) {
    const term = e.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post');
  
    posts.forEach(post => {
      const title = post.querySelector('.post_title').innerText.toUpperCase();
      const body = post.querySelector('.post_body').innerText.toUpperCase();
  
      if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
        post.style.display = 'flex';
      } else {
        post.style.display = 'none';
      }
    });
  }



function showLoader(){
    loader.classList.add('show')
    setTimeout(() =>{
        loader.classList.remove('show')
        setTimeout(() => {
            page++;
            printPosts()
        }, 100)
    }, 1500)
}

filter.addEventListener('input', filterPosts)