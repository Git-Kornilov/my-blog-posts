"use strict";

const postContainer = document.getElementById("post-container");
const loading = document.querySelector(".loader");
const filter = document.getElementById("filter");

const postsURL = `https://jsonplaceholder.typicode.com/posts`;

let limit = 3; // number of posts
let page = 1;

// Fetch posts data
const getPosts = async function () {
  const res = await fetch(`${postsURL}?_limit=${limit}&_page=${page}`);

  const data = await res.json();

  return data; // return promise-data
};

// Show post in DOM
const showPosts = async function () {
  const posts = await getPosts();

  posts.forEach((post) => {
    const postEl = document.createElement("div");
    postEl.classList.add("post");

    postEl.innerHTML = `
	<div class="number">${post.id}</div>
        <div class="post-info">
          <h2 class="post-title">${post.title}</h2>
          <p class="post-body">${post.body}</p>
        </div>
	`;

    postContainer.appendChild(postEl);
  });
};

// Show loader and more posts
const showLoading = () => {
  loading.classList.add("show");

  setTimeout(() => {
    loading.classList.remove("show");

    setTimeout(() => {
      page++;

      showPosts();
    }, 300);
  }, 1000);
};

const filterPosts = (e) => {
  const term = e.target.value.toUpperCase();

  const posts = document.querySelectorAll(".post");

  posts.forEach((post) => {
    const title = post.querySelector(".post-title").innerText.toUpperCase();
    const body = post.querySelector(".post-body").innerText.toUpperCase();

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = "flex";
    } else {
      post.style.display = "none";
    }
  });
};

// Show initial post
showPosts();

// Scroll addEventListener
window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});

//Filter addEventListener
filter.addEventListener("input", filterPosts);
