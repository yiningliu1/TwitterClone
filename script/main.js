document.body.onload = getTweets;
// event for clicking the tweet button
document
  .getElementById("tweet-button")
  .addEventListener("click", async (event) => {
    const tweet = document.getElementById("tweet-content");
    const username = document.getElementById("username");

    if (tweet.value.length <= 280 && tweet.value.length > 0) {
      if (username.value === "") {
        username.value = "Anonymous";
      }
      // Post request
      await fetch("http://localhost:3500/tweet", {
        method: "POST",
        body: JSON.stringify({
          username: username.value,
          tweet: tweet.value,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((response) => response.json());

      location.reload();
    }
  });

// updates character count
document.getElementById("tweet-content").addEventListener("input", (event) => {
  const counter = document.getElementById("text-counter");
  const tweet = document.getElementById("tweet-content");
  const button = document.getElementById("tweet-button");
  counter.innerHTML = `${tweet.value.length}/280`;
  if (tweet.value.length > 280) {
    counter.style.color = "red";
    button.style.opacity = 0.5;
  } else if (tweet.value.length === 0) {
    button.style.opacity = 0.5;
  } else {
    button.style.opacity = 1;
    counter.style.color = "black";
  }
});

// updates height of tweet box
document.getElementById("tweet-content").addEventListener(
  "input",
  (event) => {
    tweetBox = document.getElementById("tweet-content");
    tweetBox.style.height = "auto";
    tweetBox.style.height = tweetBox.scrollHeight + "px";
  },
  false
);

// function to get and display all tweets from MongoDB
async function getTweets() {
  try {
    const allTweets = await fetch("http://localhost:3500/tweet").then((res) =>
      res.json()
    );

    allTweets
      .slice()
      .reverse()
      .forEach(function (element) {
        const newDiv = document.createElement("div");
        newDiv.classList.add("tweet");
        const newUser = document.createTextNode(element["username"]);
        const userDiv = document.createElement("div");
        userDiv.classList.add("tweet-user");
        userDiv.appendChild(newUser);

        const newTweet = document.createTextNode(element["tweet"]);
        const contentDiv = document.createElement("div");
        contentDiv.classList.add("tweet-content");
        contentDiv.appendChild(newTweet);

        const newDate = document.createTextNode(element["date"]);
        const dateDiv = document.createElement("div");
        dateDiv.classList.add("tweet-date");
        dateDiv.appendChild(newDate);

        newDiv.appendChild(userDiv);
        newDiv.appendChild(contentDiv);
        newDiv.appendChild(dateDiv);

        const bottom = document.getElementById("bottom");
        const tweetSection = document.getElementById("tweets");
        tweetSection.insertBefore(newDiv, bottom);
      });
  } catch (err) {
    console.log(err);
    const newDiv = document.createElement("div");
    newDiv.classList.add("tweet");
    const newTweet = document.createTextNode("Error retrieving tweets");
    newDiv.appendChild(newTweet);
    const bottom = document.getElementById("bottom");
    const tweetSection = document.getElementById("tweets");
    tweetSection.insertBefore(newDiv, bottom);
  }
}
