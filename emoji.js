const emojiContainer = document.getElementById("emojiContainer");
const searchInput = document.getElementById("searchInput");
const showHtmlButton = document.getElementById("showHtmlButton");
const emojiHubAPI = "https://emojihub.yurace.pro/api/all";

// Function to create a Bootstrap card element for each emoji
function createEmojiCard(emoji) {
  const card = document.createElement("div");
  card.classList.add("card", "mb-3");

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const emojiSymbol = document.createElement("span");
  emojiSymbol.innerHTML = emoji.htmlCode;
  emojiSymbol.classList.add("emoji-symbol");
  cardBody.appendChild(emojiSymbol);

  const emojiName = document.createElement("h5");
  emojiName.classList.add("card-title");
  emojiName.innerText = emoji.name;
  cardBody.appendChild(emojiName);

  const emojiCategory = document.createElement("p");
  emojiCategory.classList.add("card-text");
  emojiCategory.innerHTML = `<strong>Category:</strong> ${emoji.category}`;
  cardBody.appendChild(emojiCategory);

  const emojiGroup = document.createElement("p");
  emojiGroup.classList.add("card-text");
  emojiGroup.innerHTML = `<strong>Group:</strong> ${emoji.group}`;
  cardBody.appendChild(emojiGroup);

  card.appendChild(cardBody);
  return card;
}

// Function to display emojis in the container using Bootstrap cards
function displayEmojis(emojiList) {
  emojiContainer.innerHTML = "";
  emojiList.forEach((emoji) => {
    const emojiCard = createEmojiCard(emoji);
    emojiContainer.appendChild(emojiCard);
  });
}

// Function to fetch emoji details from the API
async function fetchEmojiDetails() {
  try {
    const response = await fetch(emojiHubAPI);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching emoji details:", error.message);
    return [];
  }
}

// Initial load of emojis
fetchEmojiDetails()
  .then((data) => displayEmojis(data))
  .catch((error) => console.error("Error loading emojis:", error.message));

// Search event listener
searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  fetchEmojiDetails()
    .then((data) => {
      const filteredEmojis = data.filter((emoji) =>
        emoji.name.toLowerCase().includes(searchTerm)
      );
      displayEmojis(filteredEmojis);
    })
    .catch((error) => console.error("Error searching emojis:", error.message));
});
