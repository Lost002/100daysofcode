document.addEventListener("DOMContentLoaded", function() {
    var sand1 = document.getElementById("sand1");
    var clonedElements = [];
    var mouseDown = false;
  
    document.addEventListener('mousedown', function() {
      mouseDown = true;
    });
    document.addEventListener('mouseup', function() {
      mouseDown = false;
    });
  
    function t(func, delay) {
      let lastex = 0;
      return function(...args) {
        const currentTime = Date.now();
        if (currentTime - lastex >= delay) {
          func.apply(this, args);
          lastex = currentTime;
        }
      };
    }
    function placeBlock(e) {
      if (mouseDown) {
        var clonedElement = sand1.cloneNode(true);
        clonedElement.style.position = 'absolute';
        clonedElement.style.left = `${e.clientX}px`;
        clonedElement.style.top = `${e.clientY}px`;
        document.body.appendChild(clonedElement);
        clonedElements.push({ element: clonedElement, velocityY: 0 });
      }
    }
    var placeblock = t(placeBlock, 1);
    document.body.onmousemove = function(e) {
      placeblock(e);
    };
    function isColliding(element1, element2) {
      var rect1 = element1.getBoundingClientRect();
      var rect2 = element2.getBoundingClientRect();
  
      return !(rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom);
    }
  
    const gravity = 0.5;
    function update() {
      clonedElements.forEach(sand => {
        var bottomPosition = parseInt(sand.element.style.top) + sand.element.offsetHeight;
  
        if (bottomPosition < window.innerHeight) {
          sand.velocityY += gravity;
          sand.element.style.top = `${parseInt(sand.element.style.top) + sand.velocityY}px`;
        } else {
          sand.velocityY = 0;
        }
      });
  
      checkCollisions();
  
      requestAnimationFrame(update);
    }
  
    function checkCollisions() {
      clonedElements.forEach(sand1 => {
        clonedElements.forEach(sand2 => {
          if (sand1 !== sand2 && isColliding(sand1.element, sand2.element)) {
            handleCollision(sand1, sand2);
          }
        });
      });
    }
  
    function handleCollision(sand1, sand2) {
      sand1.velocityY = 0;
      sand2.velocityY = 0;
    }
  
    update();
  });
  