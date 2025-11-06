//Arrays

const GALLERY_NAMES = [
  "Orangene Katze",
  "Gestreifte Katze",
  "Zwei weiße Katzen",
  "Sitzende graue Katze",
  "Drei graue Katzen",
  "Schwarze Katze",
  "Schlafende braune Katze",
  "Langhaarige graue Katze",
  "Blauäugige graue Katze",
  "Katze im Garten",
  "Drei Babykatzen",
  "Schwarze Katze mit gelben Augen",
];

const GALLERY = [
  "./img/cat 1.jpg",
  "./img/cat 2.jpg",
  "./img/cat 3.jpg",
  "./img/cat 4.jpg",
  "./img/cat 5.jpg",
  "./img/cat 6.jpg",
  "./img/cat 7.jpg",
  "./img/cat 8.jpg",
  "./img/cat 9.jpg",
  "./img/cat 10.jpg",
  "./img/cat 11.jpg",
  "./img/Cat 12.jpg",
];


// Variablen

const DIALOG_REF = document.getElementById("imgDialog");
const DIALOG_HEADER_REF = document.getElementById("headerDialog");
const FORWARD_BTN_CONTAINER_REF = document.getElementById("forwardBtnContainer");
const BACK_BTN_CONTAINER_REF = document.getElementById("backBtnContainer");
const DIALOG_IMG_REF = document.getElementById("imgDialogBig");
const DIALOG_IMG_COUNTER_CONTAINER_REF = document.getElementById("dialogImgCounterContainer");

let currentIndex = 0;
let autoSlideInterval;

// Funktionen

// Bilder werden beim Laden der Seite in die "images-area" geladen.

function mainRender() {
  const CONTAINER_REF = document.getElementById("imgArea");
  for (let counter = 0; counter < GALLERY.length; counter++) {
    CONTAINER_REF.innerHTML += `<div><img aria-haspopup="dialog" aria-controls="imgDialog" onclick="openDialog(${counter})" class="img-styling" src="${GALLERY[counter]}"></div>`;
  }
}

// Funktion öffnet ein Dialog bei onclick

function openDialog(counterindex) {
  const openedDialog = document.getElementById("imgDialog");
  openedDialog.classList.add("dialog-opened");
  DIALOG_IMG_REF.innerHTML = `<div class="container-img-big"><img id="ImgBigId${counterindex}" class="img-big-styling" src="${GALLERY[counterindex]}"></div>`;
  DIALOG_REF.showModal();
  BACK_BTN_CONTAINER_REF.innerHTML = `<button role="go-backwards-through-gallery" onclick="goBack(${counterindex})" class="dialog-btns" id="goBackBtn">
              <img class="btn-img" src="./img/arrowleft.png" alt="" />
            </button>`;
  FORWARD_BTN_CONTAINER_REF.innerHTML = `<button role="go-forwards-through-gallery" onclick="goForward(${counterindex})" class="dialog-btns" id="goForwardBtn">
              <img class="btn-img" src="./img/arrowright.png" alt="" />
            </button>`;
  DIALOG_HEADER_REF.innerHTML = `<p>${GALLERY_NAMES[counterindex]}</p>`;
  DIALOG_IMG_COUNTER_CONTAINER_REF.innerHTML = `<p>${counterindex + 1} / ${GALLERY.length
    }</p>`;
  currentIndex = counterindex;
  startAutoSlide();
}


//Funktion wechselt Bild bei onclick nach vorne 

function goForward() {
  if (currentIndex + 1 > GALLERY.length - 1) {
    currentIndex = 0;
  } else {
    currentIndex++;
  }
  DIALOG_IMG_REF.innerHTML = "";
  DIALOG_IMG_REF.innerHTML = `<div class="container-img-big"><img id="ImgBigId${currentIndex}" class="img-big-styling" src="${GALLERY[currentIndex]}"></div>`;
  DIALOG_HEADER_REF.innerHTML = `<p>${GALLERY_NAMES[currentIndex]}</p>`;
  DIALOG_IMG_COUNTER_CONTAINER_REF.innerHTML = `<p>${currentIndex + 1} / ${GALLERY.length
    }</p>`;
}


//Funktion wechselt Bild bei onclick nach hinten 

function goBack() {
  if (currentIndex - 1 < 0) {
    currentIndex = GALLERY.length - 1;
  } else {
    currentIndex--;
  }
  DIALOG_IMG_REF.innerHTML = "";
  DIALOG_IMG_REF.innerHTML = `<div class="container-img-big"><img id="ImgBigId${currentIndex}" class="img-big-styling" src="${GALLERY[currentIndex]}"></div>`;
  DIALOG_HEADER_REF.innerHTML = `<p>${GALLERY_NAMES[currentIndex]}</p>`;
  DIALOG_IMG_COUNTER_CONTAINER_REF.innerHTML = `<p>${currentIndex + 1} / ${GALLERY.length
    }</p>`;
}


//Schließende Funktion

function closeDialog() {
  const openedDialog = document.getElementById("imgDialog");
  openedDialog.classList.remove("dialog-opened");
  DIALOG_REF.close();
  stopAutoSlide();
}


// Auto-Slideshow Funktion - Bild wechselt alle 3 Sekunden nach vorne

function startAutoSlide() {
  stopAutoSlide(); // falls schon eins läuft

  autoSlideInterval = setInterval(() => {
    goForward();
  }, 3000); // alle 3 Sekunden
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}


// Dialog beim Klicken neben das Bild schließen

DIALOG_REF.addEventListener("click", (event) => {
  const dialogBounds = DIALOG_REF.getBoundingClientRect();

  // Prüft, ob der Klick außerhalb des Dialog-Inhalts war oder stopPropagation verwenden
  if (
    event.clientX < dialogBounds.left ||
    event.clientX > dialogBounds.right ||
    event.clientY < dialogBounds.top ||
    event.clientY > dialogBounds.bottom
  ) {
    closeDialog();
  }
});