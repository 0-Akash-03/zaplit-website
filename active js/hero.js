function drawLines() {
  const canvas = document.getElementById('connectionLine');
  const ctx = canvas.getContext('2d');
  
  // Get box positions
  const box1 = document.getElementById('box-1');
  const box2 = document.getElementById('box-2');
  const box3 = document.getElementById('box-3');
  const box4 = document.getElementById('box-4');
  
  // Set canvas size to match container
  const container = document.querySelector('.boxes');
  canvas.width = container.offsetWidth;
  canvas.height = container.offsetHeight;
  
  // Get box positions relative to canvas
  const box1Rect = box1.getBoundingClientRect();
  const box2Rect = box2.getBoundingClientRect();
  const box3Rect = box3.getBoundingClientRect();
  const box4Rect = box4.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  
  // Calculate points for first line (curved: box1 to box2)
  const start1X = box1Rect.right - containerRect.left;
  const start1Y = box1Rect.top + box1Rect.height/2 - containerRect.top;
  const end1X = box2Rect.left - containerRect.left;
  const end1Y = box2Rect.top + box2Rect.height/2 - containerRect.top;
  
  // Control points for first curve
  const control1X1 = start1X + (end1X - start1X) * 0.4;
  const control1X2 = start1X + (end1X - start1X) * 0.6;
  
  // Calculate points for second line (straight: box2 to box3)
  const start2X = box2Rect.right - containerRect.left;
  const start2Y = box2Rect.top + box2Rect.height/2 - containerRect.top;
  const end2X = box3Rect.left - containerRect.left;
  const end2Y = box3Rect.top + box3Rect.height/2 - containerRect.top;
  
  // Calculate points for third line (curved: box3 to box4)
  const start3X = box3Rect.right - containerRect.left;
  const start3Y = box3Rect.top + box3Rect.height/2 - containerRect.top;
  const end3X = box4Rect.left - containerRect.left;
  const end3Y = box4Rect.top + box4Rect.height/2 - containerRect.top;
  
  // Control points for third curve
  const control3X1 = start3X + (end3X - start3X) * 0.4;
  const control3X2 = start3X + (end3X - start3X) * 0.6;
  
  // Animation variables
  let dashOffset = 0;
  const dashLength = 5;
  const gapLength = 5;
  const speed = 1;
  
  function animate() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set common line styles
    ctx.setLineDash([dashLength, gapLength]);
    ctx.lineDashOffset = -dashOffset;
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 2;
    
    // Draw first curved line (box1 to box2)
    ctx.beginPath();
    ctx.moveTo(start1X, start1Y);
    ctx.bezierCurveTo(
      control1X1, start1Y,
      control1X2, end1Y,
      end1X, end1Y
    );
    ctx.stroke();
    
    // Draw second straight line (box2 to box3)
    ctx.beginPath();
    ctx.moveTo(start2X, start2Y);
    ctx.lineTo(end2X, end2Y);
    ctx.stroke();
    
    // Draw third curved line (box3 to box4)
    ctx.beginPath();
    ctx.moveTo(start3X, start3Y);
    ctx.bezierCurveTo(
      control3X1, start3Y,
      control3X2, end3Y,
      end3X, end3Y
    );
    ctx.stroke();
    
    // Update dash offset
    dashOffset += speed;
    
    // Reset dash offset when it gets too large
    if (dashOffset > 1000) dashOffset = 0;
    
    requestAnimationFrame(animate);
  }
  
  animate();
}

// Initialize on load and resize
window.addEventListener('load', drawLines);
window.addEventListener('resize', drawLines);
