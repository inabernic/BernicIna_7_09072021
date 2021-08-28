export default {
  async login(email, password) {
    // Authenticate against API
    const resp = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    const json = await resp.json();
    if (resp.ok) {
      return json;
    } else {
      console.log(json.error);
      return false;
    }
  },

  async inscription(firstName, lastName, email, password) {
    // Authenticate against API
    const resp = await fetch("http://localhost:3000/api/users/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      }),
    });
    const json = await resp.json();
    if (resp.ok) {
      return json;
    } else {
      console.log(json.error);
      return false;
    }
  },

  async createPost(title, content, file) {
    // Authenticate against API
    let user = JSON.parse(localStorage.user);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("file", file);
    formData.append("userId", user.userId);

    const resp = await fetch("http://localhost:3000/api/posts/new", {
      method: "POST",
      headers: {
        Authorization: localStorage.token,
      },
      body: formData,
    });
    const json = await resp.json();
    if (resp.ok) {
      return json;
    } else {
      console.log(json.error);
      return false;
    }
  },

  async addComment(postId, newComment) {
    // Authenticate against API
    let user = JSON.parse(localStorage.user);
    const resp = await fetch("http://localhost:3000/api/comments/new", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.token,
      },
      body: JSON.stringify({
        comments: newComment,
        userId: user.userId,
        postId: postId,
      }),
    });
    const json = await resp.json();
    if (resp.ok) {
      return json;
    } else {
      console.log(json.error);
      return false;
    }
  },

  async deleteComment(commentId) {
    const resp = await fetch(
      "http://localhost:3000/api/comments/" + commentId,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: localStorage.token,
        },
      }
    );
    const json = await resp.json();
    if (resp.ok) {
      return json;
    } else {
      console.log(json.error);
      return false;
    }
  },

  async deletePost(postId) {
    const resp = await fetch("http://localhost:3000/api/posts/" + postId, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.token,
      },
    });
    const json = await resp.json();
    if (resp.ok) {
      return json;
    } else {
      console.log(json.error);
      return false;
    }
  },

  async getPostById(postId) {
    let post = false;
    let api = "http://localhost:3000/api/posts/" + postId;
    const resp = await fetch(api, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.token,
      },
    });
    const json = await resp.json();
    if (resp.ok) {
      post = json;
    } else {
      console.log(json.error);
    }
    return post;
  },

  async getMyPosts(user) {
    let posts = [];
    let api = "http://localhost:3000/api/posts/user/" + user.userId;
    const resp = await fetch(api, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.token,
      },
    });
    const json = await resp.json();
    if (resp.ok) {
      posts = json;
    } else {
      console.log(json.error);
    }
    return posts;
  },

  async getAllPosts() {
    let posts = [];
    const resp = await fetch("http://localhost:3000/api/posts", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.token,
      },
    });
    const json = await resp.json();
    if (resp.ok) {
      posts = json;
    } else {
      console.log(json.error);
    }
    return posts;
  },

  async getCommentsForPost(postId) {
    let comments = [];
    let api = "http://localhost:3000/api/comments/post/" + postId;
    const resp = await fetch(api, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.token,
      },
    });
    const json = await resp.json();
    if (resp.ok) {
      comments = json;
    } else {
      console.log(json.error);
    }
    return comments;
  },
};
