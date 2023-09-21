/*
 * @Author: shaky
 * @Date: 2023-09-10 14:53:43
 * @LastEditTime: 2023-09-17 15:20:41
 * @FilePath: /shaky/cycle1/js/home.js
 * Intimat: jason
 * Copyright (c) 2023 by shakywdy@gmail.com All Rights Reserved. 
 */
const btn =document.querySelector('.header-li.wide');
const detail =document.querySelector('.Recommend');
btn.onmouseenter = function() {
 detail.style.height = 'auto';
 const { height} = detail.getBoundingClientRect();
 detail.style.height = 0;
 detail.style.transition ='.5s';
 detail.offsetHeight;
 detail.style.height =height+'px';
}
// blur
document.querySelector('.header-li.wide').addEventListener('mouseover', function() {
  document.querySelector('.blur').classList.add('blur-area');
});


document.querySelector('.header-li.wide').addEventListener('mouseout', function() {
  document.querySelector('.blur').classList.remove('blur-area');
});
// blur
//#region logo move  
// logo move
document.querySelectorAll('.logo').forEach((logo, index, arr) => {
  const textContentArray = logo.textContent.split('');
  const results = textContentArray
    .map((c) => `<span>${c.trim() ? c : '&nbsp;'}</span>`)
    .join('');

  logo.innerHTML = textContentArray
    .map((c, i) => `<span style="--i: ${textContentArray.length - i}; animation-delay: ${i * 0.1}s">${c}</span>`)
    .join('');
});
//#endregion

//#region  infolist
var liItems = document.querySelectorAll('.infolist li');
var infoBox = document.getElementById('info-box');

liItems.forEach(function(li, index) {
  var info = li.getAttribute('data-info');
  var liRect = li.getBoundingClientRect();
  var liTop = liRect.top + window.scrollY;
  var liLeft = liRect.left + liRect.width + 120;

  li.addEventListener('mouseenter', function(event) {
    infoBox.textContent = info;
    infoBox.style.top = liTop + 'px';
    infoBox.style.left = liLeft + 'px';
    infoBox.style.display = 'block';
    // Fade in effect
    infoBox.style.opacity = 0;
    infoBox.style.display = 'block';
    infoBox.style.textAlign = 'center';

    // Fade to full opacity
    setTimeout(() => {
      infoBox.style.opacity = 1;
    }, 300);

    infoBox.className = 'font-style-' + (index + 1);
  });

  li.addEventListener('mouseleave', function() {
    infoBox.style.display = 'none';
  });
});
// info list end

//#endregion

// #region chatbox open
  
const showChatButton = document.getElementById('show-chat-button');
const chatBox = document.getElementById('chat-box');
const closeChatButton = document.getElementById('close-chat');
let typeTextTimeout; 

showChatButton.addEventListener('click', () => {
  chatBox.style.display = 'block';
  chatBox.classList.add('open');
  chatBox.classList.remove('closed');

  const chatContent = document.getElementById('chat-content');
  const text = 'Hello, Tell us about the problems you encountered! ';
  const delay = 100; 
  
  let index = 0;

  function typeText() {
    if (index < text.length) {
      chatContent.innerHTML += text.charAt(index);
      index++;
      typeTextTimeout = setTimeout(typeText, delay);
    }
  }

  typeText();


  chatContent.style.textAlign = 'center';
  chatContent.style.fontSize = '28px';
  chatContent.style.fontFamily ='Georgia'
});

closeChatButton.addEventListener('click', () => {
  clearTimeout(typeTextTimeout); 
  chatBox.classList.remove('open');
  chatBox.classList.add('closed');
  setTimeout(() => {
    chatBox.style.display = 'none';
    const chatContent = document.getElementById('chat-content');
    chatContent.innerHTML = ''; 
    text = ''; 
  }, 200);
});
//#endregion

// #region typetext
const messageInput = document.getElementById('message-input');
const chatContent = document.getElementById('chat-content');

messageInput.addEventListener('input', function() {
  const maxCharsPerLine = 21;
  const maxLines = 4;

  const lines = this.value.split('\n');
  let formattedText = '';

  lines.forEach((line, index) => {
    let formattedLine = '';

    while (line.length > maxCharsPerLine) {
      formattedLine += line.substr(0, maxCharsPerLine) + '\n';
      line = line.substr(maxCharsPerLine);
    }

    formattedLine += line;
    formattedText += formattedLine + (index < maxLines - 1 ? '\n' : '');
  });

  this.value = formattedText.trim();

  const lineCount = Math.min(lines.length, maxLines);
  const newHeight = lineCount * 20; // Assuming line height is 20px

  if (lineCount >= maxLines) {
    this.style.transition = 'height 0.2s';
    this.style.height = newHeight + 'px';
    chatContent.style.height = `calc(200px - ${newHeight}px)`;
  } else {
    this.style.transition = 'height 0.2s';
    this.style.height = ''; // Reset the height to the default
    chatContent.style.height = ''; // Reset the chat content height to the default
  }
});
//#endregion