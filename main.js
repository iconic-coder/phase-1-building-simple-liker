// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
  // 1. Hide the error modal on page load
  const modal = document.getElementById('modal');
  if (modal) {
    modal.classList.add('hidden');
  }

  // 2. Add event listeners to all like glyphs
  const likeHearts = document.querySelectorAll('.like-glyph');
  likeHearts.forEach(heart => {
    heart.addEventListener('click', () => {
      // Only proceed if heart is empty
      if (heart.textContent === EMPTY_HEART) {
        mimicServerCall()
          .then(() => {
            heart.textContent = FULL_HEART;
            heart.classList.add('activated-heart');
          })
          .catch((error) => {
            if (modal) {
              modal.classList.remove('hidden');
              modal.querySelector('#modal-message').textContent = error;
              setTimeout(() => {
                modal.classList.add('hidden');
              }, 3000);
            }
          });
      } else {
        // If heart is full, toggle back to empty
        heart.textContent = EMPTY_HEART;
        heart.classList.remove('activated-heart');
      }
    });
  });
});

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
