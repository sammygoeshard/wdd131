//========GET DATE FUNCTION=========
document.getElementById("currentyear").innerHTML =
  "&#169; " + new Date().getFullYear() + " Samuel Jaspe";

// Output the last modified date in the second paragraph
document.getElementById("lastModified").innerHTML =
  "Last Modified: " + document.lastModified;

// Menu toggle functionality
const menuToggle = document.getElementById("menu-toggle");
const navigation = document.querySelector(".navigation");

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    navigation.classList.toggle("open");
  });
}


// Temple data array

const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg",
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg",
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg",
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg",
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg",
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg",
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg",
  },
  {
   templeName: "Casper Wyoming",
   location: "Casper, Wyoming, United States",
   dedicated: "2024, November, 24",
   area: 9950,
   imageUrl:
    "https://churchofjesuschristtemples.org/assets/img/temples/casper-wyoming-temple/casper-wyoming-temple-45007-main.jpg"
  },
  {
    templeName: "Tokyo Japan",
    location: "Tokyo, Japan",
    dedicated: "1980, October, 27",
    area: 53500,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/tokyo-japan-temple/tokyo-japan-temple-26340-main.jpg",
  },
  {
    templeName: "Salt Lake Temple",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 06",
    area: 382207,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake-city-utah/400x250/salt-lake-temple-37762.jpg",
  },
  {
    templeName: "Portland Oregon",
    location: "Portland, Oregon, United States",
    dedicated: "2024, November, 24",
    area: 9950,
    imageUrl:
    "https://churchofjesuschristtemples.org/assets/img/temples/portland-oregon-temple/portland-oregon-temple-1629-main.jpg",
  },
  {
    templeName: "Caracas Venezuela",
    location: "Caracas, Capital District, Venezuela",
    dedicated: "2000, August, 20",
    area: 15332,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/_temp/096-Caracas-Venezuela-Temple.jpg",
  },

];

// Filter helper: non-mutating, accepts criteria string
// Supported criteria: 'old' (<1900), 'new' (>2000), 'large' (>90000), 'small' (<10000)
function filterTemples(criteria) {
  if (!criteria) return temples.slice();
  const c = String(criteria).toLowerCase();

  return temples.filter((t) => {
    const year = Number((t.dedicated || "").split(",")[0]) || 0;
    if (c === "old") return year < 1900;
    if (c === "new") return year > 2000;
    if (c === "large") return typeof t.area === "number" && t.area > 90000;
    if (c === "small") return typeof t.area === "number" && t.area < 10000;
    return true;
  });
}

// Expose for console / other scripts
window.filterTemples = filterTemples;

// Function to create temple cards
function createTempleCard(temple, isPlaceholder = false) {
  const figure = document.createElement("figure");

  const img = document.createElement("img");
  img.src = isPlaceholder ? "images/placeholder.jpg" : temple.imageUrl;
  img.alt = isPlaceholder ? "loading..." : `${temple.templeName} — ${temple.location}`;
  img.loading = "lazy";


  const figcaption = document.createElement("figcaption");

  const info = document.createElement("div");
  info.classList.add("temple-info");
  const locationP = document.createElement("p");
  const dedicatedP = document.createElement("p");
  const sizeP = document.createElement("p");

  figcaption.textContent = temple.templeName;
  const locationStrong = document.createElement("strong");
  locationStrong.textContent = "Location: ";
  const dedicatedStrong = document.createElement("strong");
  dedicatedStrong.textContent = "Dedicated: ";
  const sizeStrong = document.createElement("strong");
  sizeStrong.textContent = "Size: ";
  locationP.appendChild(locationStrong);
  locationP.appendChild(document.createTextNode(temple.location));
  dedicatedP.appendChild(dedicatedStrong);
  dedicatedP.appendChild(document.createTextNode(temple.dedicated));
  sizeP.appendChild(sizeStrong);
  sizeP.appendChild(
    document.createTextNode(`${temple.area.toLocaleString()} sq ft`),
  );

  info.appendChild(locationP);
  info.appendChild(dedicatedP);
  info.appendChild(sizeP);

  // add styles to elements

  figure.appendChild(img);
  figure.appendChild(figcaption);
  figure.appendChild(info);

  return figure;
}

// Render all temples
function renderTemples(templeList, usePlaceholders = false) {
  const gallery = document.getElementById("temple-gallery");
  if (!gallery) return;
  gallery.innerHTML = ""; // Clear existing content

  templeList.forEach((temple) => {
    const card = createTempleCard(temple, usePlaceholders);
    gallery.appendChild(card);
  });
}


// Attach filter behavior to header navigation links (Old, New, Large, Small, Home)
const navLinks = document.querySelectorAll(".navigation a");
navLinks.forEach((link) => {
  const text = link.textContent.trim().toLowerCase();
  if (["old", "new", "large", "small"].includes(text)) {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const filtered = filterTemples(text);
      renderTemples(filtered);
      if (navigation.classList.contains("open"))
        navigation.classList.remove("open");
    });
  } else if (text === "home") {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      renderTemples(temples);
      if (navigation.classList.contains("open"))
        navigation.classList.remove("open");
    });
  }
});

// =======SHOW PLACEHOLDERS, THEN LOAD REAL IMAGES WITH FADE EFFECT========

/**
 * This Function Simulates the waiting Time. 
 * For quiting the delay we call renderTemples(temples) with the second parameter as true, which will render the placeholders instead of the real images.
 */
async function init() {
  // 1. load placeholders first (using the same render function with a flag)
  renderTemples(temples, true);

  // 2. Simulate loading time (e.g., 1 second)
  await new Promise((resolve) => setTimeout(resolve, 100));

  // 3. Then load real images with fade effect
  const images = document.querySelectorAll("#temple-gallery img");

images.forEach((img, index) => {
    // Aplay the fade out effect
    img.classList.add("fade-out");

    // Use a timeout to stagger the loading of real images for a nicer effect
    setTimeout(() => {
      // Replace the placeholder src with the real image URL
      if (temples[index]) {
        img.src = temples[index].imageUrl;
        img.alt = `${temples[index].templeName} — ${temples[index].location}`;
      }

      // When the new image loads, apply the fade-in effect
      img.onload = () => {
        img.classList.remove("fade-out");
        img.classList.add("fade-in");
      };
    }, 100 * index); //
  });
}



// Initialize the page with all temples
init();




