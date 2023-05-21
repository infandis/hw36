function fetchPostById(id) {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Пост не знайдено');
        }
        return response.json();
      });
  }

  function fetchCommentsByPostId(id) {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Помилка отримання коментарів');
        }
        return response.json();
      });
  }

  function displayPost(post) {
    const postElement = document.getElementById('post');
    postElement.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.body}</p>
    `;
    document.getElementById('postContainer').style.display = 'block';
  }

  function displayComments(comments) {
    const commentsElement = document.getElementById('comments');
    commentsElement.innerHTML = `
      <h3>Коментарі:</h3>
      <ul>
        ${comments.map(comment => `<li>${comment.name}: ${comment.body}</li>`).join('')}
      </ul>
    `;
  }

  document.getElementById('searchBtn').addEventListener('click', () => {
    const postId = document.getElementById('postId').value;
    if (postId >= 1 && postId <= 100) {
      fetchPostById(postId)
        .then(post => {
          displayPost(post);
          document.getElementById('commentsBtn').addEventListener('click', () => {
            fetchCommentsByPostId(postId)
              .then(comments => displayComments(comments))
              .catch(error => console.error(error));
          });
        })
        .catch(error => console.error(error));
    } else {
      console.error('Некоректний ID поста');
    }
  });