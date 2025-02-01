function createSystemDashedLine() {
  const canvas = document.getElementById('systemDashedLine');
  const ctx = canvas.getContext('2d');

  // Set canvas size based on actual dimensions needed
  const rightContainer = document.querySelector('.right-side-systems');
  const leftContainer = document.querySelector('.system-combined-container');
  const distance =
    rightContainer.getBoundingClientRect().left -
    (leftContainer.getBoundingClientRect().left + leftContainer.offsetWidth);
  canvas.width = distance;
  canvas.height = 2;

  // Animation variables
  let dashOffset = 0;
  const dashArray = [5, 5]; // Adjust dash and gap size as needed

  function animate() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set line style
    ctx.setLineDash(dashArray);
    ctx.lineDashOffset = dashOffset;
    ctx.strokeStyle = 'rgb(81, 81, 95)'; // Adjust color as needed
    ctx.lineWidth = 2;

    // Draw line
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();

    // Update dash offset for animation
    dashOffset -= 0.5;
    if (dashOffset < -dashArray[0] * 2) {
      dashOffset = 0;
    }

    requestAnimationFrame(animate);
  }

  animate();
}

// Call function when page loads
window.addEventListener('load', createSystemDashedLine);
// Recalculate on window resize
window.addEventListener('resize', createSystemDashedLine);
