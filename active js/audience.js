document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('caConnectionLine');
  const ctx = canvas.getContext('2d');
  
  function resizeCanvas() {
    const container = canvas.parentElement;
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  function getBoxPosition(elementId, position = 'center') {
    const box = document.getElementById(elementId);
    const rect = box.getBoundingClientRect();
    const containerRect = canvas.getBoundingClientRect();
    
    let x = rect.left - containerRect.left;
    if (position === 'right') {
      x += rect.width;
    } else if (position === 'left') {
      x += 0;
    } else if (position === 'center') {
      x += rect.width / 2;
    }
    
    return {
      x: x,
      y: rect.top - containerRect.top + rect.height / 2
    };
  }

  // Animation variables
  let dashOffset = 0;
  const dashLength = 5;
  const gapLength = 5;
  const animationSpeed = 0.5;

  function drawDashedLine(startX, startY, endX, endY, offset) {
    ctx.beginPath();
    ctx.setLineDash([dashLength, gapLength]);
    ctx.lineDashOffset = offset;
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = 'rgb(81, 81, 95)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  function drawCurvedLine(startX, startY, endX, endY, offset) {
    ctx.beginPath();
    ctx.setLineDash([dashLength, gapLength]);
    ctx.lineDashOffset = offset;
    ctx.moveTo(startX, startY);
    
    // Calculate control points for the curve
    const midX = (startX + endX) / 2;
    const controlX = startX + 30; // Reduced from midX + 50 to startX + 30 for tighter curve
    
    ctx.bezierCurveTo(
      controlX, startY,    // First control point
      endX - 30, endY,    // Second control point adjusted to approach from the left
      endX, endY          // End point
    );
    
    ctx.strokeStyle = 'rgb(81, 81, 95)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const box1 = getBoxPosition('ca-box-1');
    const box2Start = getBoxPosition('ca-box-2');
    const box2End = getBoxPosition('ca-box-2', 'right');
    const box3 = getBoxPosition('ca-box-3');
    const box4 = getBoxPosition('ca-box-4', 'left');
    const box5 = getBoxPosition('ca-box-5', 'left');
    const box6 = getBoxPosition('ca-box-6', 'left');

    // Draw main flow lines
    drawDashedLine(box1.x, box1.y, box2Start.x, box2Start.y, dashOffset);
    drawDashedLine(box2Start.x, box2Start.y, box3.x, box3.y, dashOffset);

    // Draw curved lines from box2 to social pixel boxes
    drawCurvedLine(box2End.x, box2End.y, box4.x, box4.y, dashOffset);
    drawCurvedLine(box2End.x, box2End.y, box5.x, box5.y, dashOffset);
    drawCurvedLine(box2End.x, box2End.y, box6.x, box6.y, dashOffset);

    // Update dash offset for animation
    dashOffset -= animationSpeed;
    
    requestAnimationFrame(animate);
  }

  // Start animation
  animate();
});
