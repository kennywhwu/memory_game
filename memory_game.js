document.addEventListener('DOMContentLoaded', function() {
  // Create array of image objects
  var imgArray = [
    {
      name: 'got1',
      filename: 'img/got1.png'
    },
    {
      name: 'got2',
      filename: 'img/got2.png'
    },
    {
      name: 'got3',
      filename: 'img/got3.png'
    },
    {
      name: 'got4',
      filename: 'img/got4.png'
    },
    {
      name: 'got5',
      filename: 'img/got5.png'
    },
    {
      name: 'got6',
      filename: 'img/got6.png'
    },
    {
      name: 'got7',
      filename: 'img/got7.png'
    },
    {
      name: 'got8',
      filename: 'img/got8.png'
    }
  ];

  // Duplicate and randomly arrange images
  var imgDuplicateArray = imgArray.concat(imgArray);

  // Set deck variable
  var deck = document.querySelector('.deck');
  var card = deck.querySelectorAll('.card');
  var lowestDisplay = document.querySelector('.lowestScore');
  var savedScore = '--';

  // Define function to start a new game
  function newArrangement() {
    // Remove all cards from display
    while (deck.firstChild) {
      deck.removeChild(deck.firstChild);
    }

    // Randomize grid
    imgDuplicateArray.sort(function() {
      return 0.5 - Math.random();
    });

    // Lay out new grid of cards
    imgDuplicateArray.forEach(function(element) {
      var card = document.createElement('div');
      card.classList.add('card');
      card.dataset.name = element.name;

      var front = document.createElement('img');
      front.classList.add('front');
      front.src = 'img/got_logo.png';

      var back = document.createElement('img');
      back.classList.add('back');
      back.src = element.filename;

      card.appendChild(front);
      card.appendChild(back);
      deck.appendChild(card);

      savedScore = localStorage.getItem('lowestScore');
      lowestDisplay.innerHTML = savedScore;
    });
  }

  newArrangement();

  var openedCards = deck.querySelectorAll('.open');
  var counter = 0;
  var countDisplay = document.querySelector('.count');
  var matchCounter = 0;

  // Set function for clicking on unopen card
  // Open card
  // Disable card
  // Set openedCards array to all cards that are open
  // var displayCard = function(event) {
  //   if (event.target.classList.contains('front')) {
  //     event.target.parentNode.classList.toggle('open');
  //     event.target.parentNode.classList.toggle('disabled');
  //     openedCards = deck.querySelectorAll('.open');
  //     if (openedCards.length === 2) {
  //       if (openedCards[0].dataset.name === openedCards[1].dataset.name) {
  //         matched();
  //       } else {
  //         unmatched();
  //       }
  //       counter++;
  //       countDisplay.innerHTML = counter;
  //     }
  //   }
  // };

  var openCount = 0;
  var displayCard = function(event) {
    if (openedCards.length < 2) {
      if (event.target.classList.contains('front')) {
        event.target.parentNode.classList.toggle('open');
        event.target.parentNode.classList.toggle('disabled');
        openedCards = deck.querySelectorAll('.open');
        if (openedCards.length === 2) {
          if (openedCards[0].dataset.name === openedCards[1].dataset.name) {
            matched();
          } else {
            unmatched();
          }

          counter++;
          countDisplay.innerHTML = counter;
        }
      }
    }
  };

  // Define function when cards match
  function matched() {
    openedCards[0].classList.add('matched');
    openedCards[1].classList.add('matched');
    openedCards[0].classList.remove('open');
    openedCards[1].classList.remove('open');
    matchCounter += 2;
    openedCards = [];
  }

  // Define function when cards don't match
  function unmatched() {
    openedCards[0].classList.add('unmatched');
    openedCards[1].classList.add('unmatched');
    setTimeout(function() {
      openedCards[0].classList.remove('open', 'unmatched', 'disabled');
      openedCards[1].classList.remove('open', 'unmatched', 'disabled');
      openedCards = [];
    }, 1300);
  }

  // Define function for game completion
  function complete() {
    if (matchCounter === imgDuplicateArray.length) {
      saveScore();
      setTimeout(function() {
        alert(
          'Congratulations, you finished after ' +
            counter +
            ' moves!  You are the matching master!'
        );
      }, 1000);
    }
  }

  // Define function to save lowest score
  function saveScore() {
    if (counter < savedScore || savedScore === null || savedScore === '--') {
      localStorage.setItem('lowestScore', counter);
      lowestDisplay.innerHTML = counter;
    }
  }

  deck.addEventListener('click', displayCard);
  deck.addEventListener('click', complete);

  // Define function for restarting new game
  function startNewGame() {
    newArrangement();
    for (var i = 0; i < card.length; i++) {
      card[i].classList.remove('open', 'disabled', 'matched', 'unmatched');
    }
    counter = 0;
    countDisplay.innerHTML = 0;
    matchCounter = 0;
  }

  // Define function for resetting lowest score
  function resetScore() {
    localStorage.setItem('lowestScore', '--');
    lowestDisplay.innerHTML = '--';
  }

  // Set event listeners for New and Clear buttons
  var newGame = document.querySelector('.new');
  newGame.addEventListener('click', startNewGame);
  var clearScore = document.querySelector('.clear');
  clearScore.addEventListener('click', resetScore);
});
