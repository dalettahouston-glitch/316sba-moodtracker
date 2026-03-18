function updateDateTime() {
  const now = new Date();

  document.getElementById("current-date").textContent =
    now.toLocaleDateString();

  document.getElementById("current-time").textContent =
    now.toLocaleTimeString();
}

updateDateTime();
setInterval(updateDateTime, 1000);


const moodInput = document.getElementById("mood");
const noteInput = document.getElementById("note");
const addBtn = document.getElementById("addMoodBtn");
const errorMsg = document.getElementById("error");
const moodList = document.getElementById("moodList");
const motivationBtn = document.getElementById("motivationBtn");
const motivationMessage = document.getElementById("motivationMessage");
const template = document.getElementById("moodTemplate");


window.onload = () => {
  const saved = JSON.parse(localStorage.getItem("moods")) || [];
  saved.forEach(entry => renderMood(entry));
};


addBtn.addEventListener("click", () => {
  const mood = moodInput.value;
  const note = noteInput.value.trim();

  if (!mood || note.length < 3) {
    errorMsg.style.display = "block";
    return;
  }

  errorMsg.style.display = "none";

  const entry = {
    mood,
    note,
    timestamp: new Date().toLocaleString()
  };

  renderMood(entry);
  saveMood(entry);

  moodInput.value = "";
  noteInput.value = "";
});

function renderMood(entry) {
  const clone = template.content.cloneNode(true);

  clone.querySelector(".mood-text").textContent = `Mood: ${entry.mood}`;
  clone.querySelector(".note-text").textContent = `Note: ${entry.note}`;
  clone.querySelector(".time-text").textContent = entry.timestamp;

  const deleteBtn = clone.querySelector(".delete-btn");

  deleteBtn.addEventListener("click", (e) => {
    const card = e.target.parentNode;
    card.remove();
    deleteMood(entry.timestamp);
  });

  moodList.prepend(clone);
}

function saveMood(entry) {
  const saved = JSON.parse(localStorage.getItem("moods")) || [];
  saved.push(entry);
  localStorage.setItem("moods", JSON.stringify(saved));
}


function deleteMood(timestamp) {
  let saved = JSON.parse(localStorage.getItem("moods")) || [];
  saved = saved.filter(e => e.timestamp !== timestamp);
  localStorage.setItem("moods", JSON.stringify(saved));
}


motivationBtn.addEventListener("click", () => {
  const messages = [
    "You’re doing great!",
    "Keep going — you’ve got this!",
    "Every day is progress.",
    "Your feelings matter.",
    "You’re stronger than you think.",
    "Your mood does not define your worth."
  ];

  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  motivationMessage.textContent = randomMessage;
});