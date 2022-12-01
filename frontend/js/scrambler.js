// Inital image when page loads:
const AVAILABLE_BACKGROUND = ['gorilla', 'dinosaur', 'horse', 'alligator'];
let startImage = AVAILABLE_BACKGROUND[Math.floor(Math.random() * 4)];

// Password tracking:
let chosenImage = startImage
let password = []

// Initialize the original table:
window.onload = () => {
  for (let i = 0; i <= 3; i++) {
    for (let j = 0; j <= 3; j++) {
      const elem = document.createElement('div');
      elem.style.backgroundImage = 'url("../' +
        startImage + '/' + i + '' + j + '.jpg")';
      elem.setAttribute('class', 'non_click_image');
      // Give each tile a unique ID
      elem.setAttribute('id', i + '' + j);
      // Add click handler to everybutton. Functions argument = tile's ID
      elem.setAttribute('onClick', 'handleClick(' + i + ',' + j + ')');
      document.getElementById('row' + i).appendChild(elem);
    }
  }
  // Add event listeners to all the image changing buttons:
  const buttons = document.getElementsByTagName('button');
  // Exclude the "submit" button
  for (let i = 0; i < buttons.length - 1; i++) {
    buttons[i].addEventListener(
      'click', function() {
        setBackground(buttons[i].getAttribute('id'));
      });
  }
  // Set borders on clickable buttons to "red":
  check();
};

// Function to change image selection:
const setBackground = (imageSelection) => {
  // User changed image:
  chosenImage = imageSelection
  password = []
  // Change image:
  const arr = document.getElementsByTagName('div');
  for (let i = 0; i < arr.length; i++) {
    const tempId = arr[i].getAttribute('id');
    if (tempId.charAt(0) != 'r') {
      arr[i].style.backgroundImage = 'url("../' +
        imageSelection + '/' + tempId + '.jpg")';
    };
  }
};

// Function to switch tiles / * track password * :
const handleClick = (row, col) => {
  const id = row + '' + col;
  const clickedImage = document.getElementById(id);
  if (clickedImage.getAttribute('class') == 'clickable_image') {
    swapPhotos(id);
    // Add the tile to password!
    password = [...password, id + chosenImage]
    console.log(password)
    // Re-assign "clickable_images"
    check()
  }
};


// Helper function to swap the tiles:
const swapPhotos = (id) => {
  const curr = document.getElementById(id);
  const currId = curr.id;
  const currSrc = curr.style.backgroundImage;
  const currClicker = curr.getAttribute('onClick');
  // Blank tiles ID is always '33':
  const blankTile = document.getElementById('33');
  // Set curr's attributes to blankTile's
  curr.style.backgroundImage = blankTile.style.backgroundImage;
  curr.id = blankTile.id;
  curr.setAttribute('onClick', blankTile.getAttribute('onClick'));
  // Set blankTile's attributes to to elem's originals
  blankTile.style.backgroundImage = currSrc;
  blankTile.id = currId;
  blankTile.setAttribute('onClick', currClicker);
};

// Function sets red border on tiles that can be clicked:
const check = () => {
  try {
    let arr = [];
    for (let i = 0; i < 4; i++) {
      const temp = document.getElementById('row' + [i]);

      let tempList = [];
      for (let j = 0; j < 4; j++) {
        tempList = [...tempList, temp.getElementsByTagName('div')[j]];
      }
      arr = [...arr, tempList];
    }
    // Reset all the old images back to default
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        arr[i][j].setAttribute('class', 'non_click_image');
      }
    }
    // Set the border on clickable images:
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (i == 0) {
          if (j == 0) {
            if (arr[i][j].id == '33') {
              arr[i][j + 1].setAttribute('class', 'clickable_image');
              arr[i + 1][j].setAttribute('class', 'clickable_image');
            }
          } else if (j == 3) {
            if (arr[i][j].id == '33') {
              arr[i][j - 1].setAttribute('class', 'clickable_image');
              arr[i + 1][j].setAttribute('class', 'clickable_image');
            }
          } else if (arr[i][j].id == '33') {
            arr[i + 1][j].setAttribute('class', 'clickable_image');
            arr[i][j + 1].setAttribute('class', 'clickable_image');
            arr[i][j - 1].setAttribute('class', 'clickable_image');
          }
        } else if (i == 3) {
          if (j == 0) {
            if (arr[i][j].id == '33') {
              arr[i][j + 1].setAttribute('class', 'clickable_image');
              arr[i - 1][j].setAttribute('class', 'clickable_image');
            }
          } else if (j == 3) {
            if (arr[i][j].id == '33') {
              arr[i][j - 1].setAttribute('class', 'clickable_image');
              arr[i - 1][j].setAttribute('class', 'clickable_image');
            }
          } else if (arr[i][j].id == '33') {
            arr[i - 1][j].setAttribute('class', 'clickable_image');
            arr[i][j + 1].setAttribute('class', 'clickable_image');
            arr[i][j - 1].setAttribute('class', 'clickable_image');
          }
        } else if (j == 3 && arr[i][j].id == '33') {
          arr[i + 1][j].setAttribute('class', 'clickable_image');
          arr[i - 1][j].setAttribute('class', 'clickable_image');
          arr[i][j - 1].setAttribute('class', 'clickable_image');
        } else if (j == 0 && arr[i][j].id == '33') {
          arr[i + 1][j].setAttribute('class', 'clickable_image');
          arr[i - 1][j].setAttribute('class', 'clickable_image');
          arr[i][j + 1].setAttribute('class', 'clickable_image');
        } else if (arr[i][j].id == '33') {
          arr[i + 1][j].setAttribute('class', 'clickable_image');
          arr[i - 1][j].setAttribute('class', 'clickable_image');
          arr[i][j + 1].setAttribute('class', 'clickable_image');
          arr[i][j - 1].setAttribute('class', 'clickable_image');
        }
      }
    }
  } catch (e) {
    console.log(e);
  }
};

