document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('coConnectionLine');
  const ctx = canvas.getContext('2d');
  
  function resizeCanvas() {
    const container = canvas.parentElement;
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  function getBoxPosition(elementId) {
    const box = document.getElementById(elementId);
    const rect = box.getBoundingClientRect();
    const containerRect = canvas.getBoundingClientRect();
    
    return {
      x: rect.left - containerRect.left + rect.width / 2,
      y: rect.top - containerRect.top + rect.height / 2
    };
  }

  // Animation variables
  let dashOffset = 0;
  const dashLength = 5;
  const gapLength = 5;
  const animationSpeed = 1;

  function drawDashedLine(startX, startY, endX, endY, offset) {
    ctx.beginPath();
    ctx.setLineDash([dashLength, gapLength]);
    ctx.lineDashOffset = offset;
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = 'rgb(81, 81, 95)';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  function drawCurvedLine(startX, startY, endX, endY, offset) {
    ctx.beginPath();
    ctx.setLineDash([dashLength, gapLength]);
    ctx.lineDashOffset = offset;
    ctx.moveTo(startX, startY);
    
    // Calculate midpoint
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;
    
    // Adjust these values to control the curve intensity
    const curveOffsetX = 50;
    const curveOffsetY = 30;
    
    ctx.bezierCurveTo(
      midX + curveOffsetX, startY, // First control point
      midX + curveOffsetX, endY,   // Second control point
      endX, endY                   // End point
    );
    
    ctx.strokeStyle = 'rgb(81, 81, 95)';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const box1 = getBoxPosition('co-box-1');
    const box2 = getBoxPosition('co-box-2');
    const box3 = getBoxPosition('co-box-3');
    const box4 = getBoxPosition('co-box-4');
    const box5 = getBoxPosition('co-box-5');

    // Main flow lines
    drawDashedLine(box1.x, box1.y, box2.x, box2.y, dashOffset);
    drawDashedLine(box2.x, box2.y, box3.x, box3.y, dashOffset);

    // Additional flow lines
    drawCurvedLine(box3.x, box3.y, box5.x, box5.y, dashOffset);
    drawCurvedLine(box5.x, box5.y, box4.x, box4.y, dashOffset);
    drawCurvedLine(box4.x, box4.y, box2.x, box2.y, dashOffset);

    // Update dash offset for animation
    dashOffset -= animationSpeed;
    
    requestAnimationFrame(animate);
  }

  // Start animation
  animate();
}); 