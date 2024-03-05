	// Function to toggle between light and dark themes
function toggleTheme() {
  const body = document.body;
  body.classList.toggle('theme-light');
  body.classList.toggle('theme-dark');
}

// Function to open the modal and display full image
function openModal() {
  const modal = document.getElementById('modal');
  modal.classList.remove('hidden');
  
  const modalImage = document.getElementById('modalImage');
  const image = document.querySelector('.rounded-full');
  modalImage.src = image.src;
}

// Function to close the modal
function closeModal() {
  const modal = document.getElementById('modal');
  modal.classList.add('hidden');
}