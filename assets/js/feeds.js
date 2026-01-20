document.addEventListener('DOMContentLoaded', function() {
  fetchGitHubActivity('fourdollars');
  fetchBlogPosts('fourdollars');
  fetchMediumPosts('fourdollars');
});

function fetchGitHubActivity(username) {
  const activityContainer = document.getElementById('github-activity');
  if (!activityContainer) return;

  fetch(`https://api.github.com/users/${username}/events/public`)
    .then(response => response.json())
    .then(data => {
      const events = data; // Show all available events (usually default to 30)
      let html = '<ul>';
      events.forEach(event => {
        const repoName = event.repo.name;
        const type = event.type.replace('Event', '');
        const date = new Date(event.created_at).toLocaleDateString();

        let activityUrl = `https://github.com/${repoName}`;
        if (event.type === 'PushEvent' && event.payload.head) {
          activityUrl = `https://github.com/${repoName}/commit/${event.payload.head}`;
        } else if (event.type === 'PullRequestEvent' && event.payload.pull_request) {
          activityUrl = event.payload.pull_request.html_url;
        } else if (event.type === 'IssueCommentEvent' && event.payload.comment) {
          activityUrl = event.payload.comment.html_url;
        } else if (event.type === 'IssuesEvent' && event.payload.issue) {
          activityUrl = event.payload.issue.html_url;
        } else if (event.type === 'ForkEvent' && event.payload.forkee) {
          activityUrl = event.payload.forkee.html_url;
        } else if (event.type === 'ReleaseEvent' && event.payload.release) {
          activityUrl = event.payload.release.html_url;
        }

        html += `<li><strong>${type}</strong> in <a href="${activityUrl}" target="_blank">${repoName}</a> on ${date}</li>`;
      });
      html += '</ul>';
      activityContainer.innerHTML = '<h3>GitHub Activity</h3>' + html;
    })
    .catch(error => {
      console.error('Error fetching GitHub activity:', error);
      activityContainer.innerHTML = '<h3>GitHub Activity</h3><p>Unable to load activity.</p>';
    });
}

function fetchBlogPosts(username) {
  const blogContainer = document.getElementById('blog-activity');
  if (!blogContainer) return;

  // Using rss2json service to fetch and parse RSS feeds
  const blogspotUrl = `https://fourdollars.blogspot.com/feeds/posts/default?alt=rss`;
  const rss2jsonApi = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(blogspotUrl)}`;

  fetch(rss2jsonApi)
    .then(response => response.json())
    .then(data => {
      if (data.status === 'ok') {
        const posts = data.items.slice(0, 5);
        let html = '<ul>';
        posts.forEach(post => {
          const date = new Date(post.pubDate).toLocaleDateString();
          html += `<li><a href="${post.link}" target="_blank">${post.title}</a> on ${date}</li>`;
        });
        html += '</ul>';
        blogContainer.innerHTML = '<h3>Recent Blog Posts</h3>' + html;
      }
    })
    .catch(error => {
      console.error('Error fetching blog posts:', error);
      blogContainer.innerHTML = '<h3>Recent Blog Posts</h3><p>Unable to load blog posts.</p>';
    });
}

function fetchMediumPosts(username) {
  const mediumContainer = document.getElementById('medium-activity');
  if (!mediumContainer) return;

  const mediumUrl = `https://medium.com/feed/@${username}`;
  const rss2jsonApi = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(mediumUrl)}`;

  fetch(rss2jsonApi)
    .then(response => response.json())
    .then(data => {
      if (data.status === 'ok') {
        const posts = data.items.slice(0, 5);
        let html = '<ul>';
        posts.forEach(post => {
          const date = new Date(post.pubDate).toLocaleDateString();
          html += `<li><a href="${post.link}" target="_blank">${post.title}</a> on ${date}</li>`;
        });
        html += '</ul>';
        mediumContainer.innerHTML = '<h3>Medium Articles</h3>' + html;
      }
    })
    .catch(error => {
      console.error('Error fetching Medium posts:', error);
      mediumContainer.innerHTML = '<h3>Medium Articles</h3><p>Unable to load articles.</p>';
    });
}
