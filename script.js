import {
  q,
  c,
  createFriendEl,
  createMessageEl,
  createFeedEl,
} from "./utils.js";
import { GET, POST, DELETE } from "./api.js";

const messageBodyPost = {};

const friendsEl = q(".friends");
const URL_FRIENDS = "https://edgemony-backend.herokuapp.com/friends";

const URL_MSG = "https://edgemony-backend.herokuapp.com/messages";
const messagesEl = q(".messages");
const addNewMessageEl = q(".add-new-message");
const inputTextEl = q(".input-text");
const inputSender = q(".input-sender");
const addMsgBtn = q(".add-new-message-btn");
const filterInput = q(".filter-input");
const messagesListEl = q(".messages-list");

const feedEl = q(".feed");
const SERIES_URL = "https://edgemony-backend.herokuapp.com/series";

// Friends
GET(URL_FRIENDS).then((friendList) => {
  friendList.map((friend) =>
    createFriendEl(friendsEl, friend.name, friend.photo)
  );
});

// Messages
GET(URL_MSG)
  .then((messagesList) => {
    messagesList
      .reverse()
      .map(({ text, sender, date }) =>
        createMessageEl(messagesListEl, text, sender, date)
      );
  })
  .then(() => {
    const wrapperEls = document.querySelectorAll(".wrapper");
    wrapperEls.forEach;
    (wrapper) => wrapper.addEventListener;
    "click",
      () => {
        DELETE(BASE_URL, wrapper.id).then(() => location.reload());
      };
  });

inputTextEl.addEventListener(
  "input",
  (e) => (messageBodyPost.text = e.target.value)
);

inputSender.addEventListener("input", (e) => {
  messageBodyPost.sender = e.target.value;
  messageBodyPost.date = new Date().toISOString();
});

addMsgBtn.addEventListener("click", () => {
  POST(URL_MSG, messageBodyPost)
    .then(() =>
      document
        .querySelectorAll(".messageCard")
        .forEach((message) => message.remove())
    )
    .then(() =>
      GET(URL_MSG).then((messagesList) => {
        messagesList
          .reverse()
          .map(({ text, sender, date }) =>
            createMessageEl(messagesListEl, text, sender, date)
          );
      })
    );
});

filterInput.addEventListener("input", (e) => {
  document
    .querySelectorAll(".messageCard")
    .forEach((message) => message.remove());

  GET(URL_MSG).then((messagesList) => {
    messagesList
      .reverse()
      .filter((message) =>
        message.sender.toLowerCase().includes(e.target.value.toLowerCase())
      )
      .map(({ text, sender, date }) =>
        createMessageEl(messagesListEl, text, sender, date)
      );
  });
});

// Feed;

GET(SERIES_URL).then((feedList) => {
  feedList.map((feed) => createFeedEl(feedEl, feed.poster, feed.title));
});
