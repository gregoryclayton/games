const startButton = document.getElementById("start-button")
const instructions = document.getElementById("instructions-text")
const mainPlayArea = document.getElementById("main-play-area")
const shooter = document.getElementById("player-controlled-shooter")
const monsterImgs = ['path to images for asteroids/monsters']
const scoreCounter = document.querySelector('#score span')

let justice
let monsterInterval


startButton.addEventListener("click", (event) => {
  playGame()
  startStory()
  updateTimer()
})


function letShipFly(event) {
  if (event.key === "ArrowUp") {
    event.preventDefault()
    moveUp()
  } else if (event.key === "ArrowDown") {
    event.preventDefault()
    moveDown()
  } else if (event.key === " ") {
    event.preventDefault()
    fireLaser()
  }
  
}


function moveUp() {
  let topPosition = window.getComputedStyle(shooter).getPropertyValue('top')
  if (shooter.style.top === "0px") {
    return
  } else {
    let position = parseInt(topPosition)
    position -= 4
    shooter.style.top = `${position}px`
  }
}


function moveDown() {
  let topPosition = window.getComputedStyle(shooter).getPropertyValue('top')
  if (shooter.style.top === "360px") {
    return
  } else {
    let position = parseInt(topPosition)
    position += 4
    shooter.style.top = `${position}px`
  }
}


function fireLaser() {
  let laser = createLaserElement()
  mainPlayArea.appendChild(laser)
  let laserSFX = new Audio('audio/laser-sfx.m4a')
  laserSFX.play()
  moveLaser(laser)
}


function createLaserElement() {
  let xPosition = parseInt(window.getComputedStyle(shooter).getPropertyValue('left'))
  let yPosition = parseInt(window.getComputedStyle(shooter).getPropertyValue('top'))
  let newLaser = document.createElement('img')
  newLaser.src = 'path to laser image'
  newLaser.classList.add('laser')
  newLaser.style.left = `${xPosition}px`
  newLaser.style.top = `${yPosition - (-70)}px`
  return newLaser
}


function moveLaser(laser) {
  let laserInterval = setInterval(() => {
    let xPosition = parseInt(laser.style.left)
    let monsters = document.querySelectorAll(".monster")
    monsters.forEach(monster => {
      if (checkLaserCollision(laser, monster)) {
        let explosion = new Audio('audio/explosion.m4a')
        explosion.play()
        monster.src = "path to explosion image"
        monster.classList.remove("monster")
        monster.classList.add("dead-monster")
        scoreCounter.innerText = parseInt(scoreCounter.innerText) + 100
      }
    })
    if (xPosition === 1000) {
      laser.remove()
    } else {
      laser.style.left = `${xPosition + 4}px`
    }
  }, 10)
}


function createMonster() {
  let newMonster = document.createElement('img')
  let monsterSpriteImg = monsterImgs[Math.floor(Math.random()*monsterImgs.length)]
  newMonster.src = monsterSpriteImg
  newMonster.classList.add('monster')
  newMonster.classList.add('monster-transition')
  newMonster.style.left = '95%'
  newMonster.style.top = `${Math.floor(Math.random() * 330) + 30}px`
  mainPlayArea.appendChild(newMonster)
  moveMonster(newMonster)
}


function moveMonster(monster) {
  
  let moveMonsterInterval = setInterval(() => {
    let xPosition = parseInt(window.getComputedStyle(monster).getPropertyValue('left'))
    //change the belowline to <= 50 to get endgame back
    if (xPosition <= monster) {
      if (Array.from(monster.classList).includes("dead-monster")) {
        monster.remove()
      } else {
        gameOver()
      }
    } else {
      
      monster.style.left = `${xPosition - 4}px`
    }
  }, 50)
}


function checkLaserCollision(laser, monster) {
  let laserLeft = parseInt(laser.style.left)
  let laserTop = parseInt(laser.style.top)
  let laserBottom = laserTop - 20
  let monsterTop = parseInt(monster.style.top)
  let monsterBottom = monsterTop - 30
  let monsterLeft = parseInt(monster.style.left)
  if (laserLeft != 340 && laserLeft + 40 >= monsterLeft) {
    if ( (laserTop <= monsterTop && laserTop >= monsterBottom) ) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}


function collision() {
  let topPositionShooter = window.getComputedStyle(shooter).getPropertyValue('top')
  let topPositionMonster = window.getComputedStyle(monster).getPropertyValue('top')
  let leftPositionShooter = window.getComputedStyle(shooter).getPropertyValue('left')
  let leftPositionMonster = window.getComputedStyle(monster).getPropertyValue('left')
  
  if (topPositionShooter === topPositionMonster, leftPositionShooter === leftPositionMonster) {
    gameOver()
  } 
}

function gameOver() {
  window.removeEventListener("keydown", letShipFly)
  justice.pause()
  let gameOverSfx = new Audio('audio/game-over.m4a')
  gameOverSfx.play()
  clearInterval(monsterInterval)
  let monsters = document.querySelectorAll(".monster")
  monsters.forEach(monster => monster.remove())
  let lasers = document.querySelectorAll(".laser")
  lasers.forEach(laser => laser.remove())
  setTimeout(() => {
    alert(`Game Over! The monsters made it to Earth. Your final score is ${scoreCounter.innerText}!`)
    shooter.style.top = "180px"
    startButton.style.display = "block"
    instructions.style.display = "block"
    scoreCounter.innerText = 0
  }, 1100)
}

function playGame() {
  startButton.style.display = 'none'
  instructions.style.display = 'none'
  window.addEventListener("keydown", letShipFly)
  justice = new Audio("path to song")
  justice.play()
  monsterInterval = setInterval(() => { createMonster() }, 6000)
  
}

let draggableElem = document.getElementById("player-controlled-shooter");
let initialX = 0,
  initialY = 0;
let moveElement = false;
//Events Object
let events = {
  mouse: {
    down: "mousedown",
    move: "mousemove",
    up: "mouseup",
  },
  touch: {
    down: "touchstart",
    move: "touchmove",
    up: "touchend",
  },
};
let deviceType = "";
//Detech touch device
const isTouchDevice = () => {
  try {
    document.createEvent("TouchEvent");
    deviceType = "touch";
    return true;
  } catch (e) {
    deviceType = "mouse";
    return false;
  }
};
isTouchDevice();
//Start (mouse down / touch start)
draggableElem.addEventListener(events[deviceType].down, (e) => {
  e.preventDefault();
  //initial x and y points
  initialX = !isTouchDevice() ? e.clientX : e.touches[0].clientX;
  initialY = !isTouchDevice() ? e.clientY : e.touches[0].clientY;
  //Start movement
  moveElement = true;
});
//Move
draggableElem.addEventListener(events[deviceType].move, (e) => {
  //if movement == true then set top and left to new X andY while removing any offset
  if (moveElement) {
    e.preventDefault();
    let newX = !isTouchDevice() ? e.clientX : e.touches[0].clientX;
    let newY = !isTouchDevice() ? e.clientY : e.touches[0].clientY;
    draggableElem.style.top =
      draggableElem.offsetTop - (initialY - newY) + "px";
    draggableElem.style.left =
      draggableElem.offsetLeft - (initialX - newX) + "px";
    initialX = newX;
    initialY = newY;
  }
});
//mouse up / touch end
draggableElem.addEventListener(
  events[deviceType].up,
  (stopMovement = (e) => {
    moveElement = false;
  })
);
draggableElem.addEventListener("mouseleave", stopMovement);
draggableElem.addEventListener(events[deviceType].up, (e) => {
  moveElement = false;
});





let startBtn = document.getElementById('start-button');

let resetBtn = document.getElementById('start-button');
 
let hour = 00;
let minute = 00;
let second = 00;
let count = 00;
 
startBtn.addEventListener('click', function () {
    timer = true;
    stopWatch();
});
 
stopBtn.addEventListener('click', function () {
    timer = false;
});
 
resetBtn.addEventListener('click', function () {
    timer = false;
    hour = 0;
    minute = 0;
    second = 0;
    count = 0;
    document.getElementById('hr').innerHTML = "00";
    document.getElementById('min').innerHTML = "00";
    document.getElementById('sec').innerHTML = "00";
    document.getElementById('count').innerHTML = "00";
});
 
function stopWatch() {
    if (timer) {
        count++;
 
        if (count == 100) {
            second++;
            count = 0;
        }
 
        if (second == 60) {
            minute++;
            second = 0;
        }
 
        if (minute == 60) {
            hour++;
            minute = 0;
            second = 0;
        }
 
        let hrString = hour;
        let minString = minute;
        let secString = second;
        let countString = count;
 
        if (hour < 10) {
            hrString = "0" + hrString;
        }
 
        if (minute < 10) {
            minString = "0" + minString;
        }
 
        if (second < 10) {
            secString = "0" + secString;
        }
 
        if (count < 10) {
            countString = "0" + countString;
        }
 
        document.getElementById('hr').innerHTML = hrString;
        document.getElementById('min').innerHTML = minString;
        document.getElementById('sec').innerHTML = secString;
        document.getElementById('count').innerHTML = countString;
        setTimeout(stopWatch, 10);
    }
}

// setTimeout uses milliseconds. 

function startStory() {

  const el = document.getElementById('story');
  const el1 = document.getElementById('story1');
  const el2 = document.getElementById('story2');
  const el3 = document.getElementById('story3');
  const el4 = document.getElementById('story4');
  const el5 = document.getElementById('story5');
  const el6 = document.getElementById('story6');
  const el7 = document.getElementById('story7');
  const el8 = document.getElementById('story8');
  const el9 = document.getElementById('story9');
  const el10 = document.getElementById('story10');
  const el11 = document.getElementById('story11');
  const el12 = document.getElementById('story12');
  const el13 = document.getElementById('story13');
  const el14 = document.getElementById('story14');
  const el15 = document.getElementById('story15');
  const el16 = document.getElementById('story16');
  const el17 = document.getElementById('story17');
  const el18 = document.getElementById('story18');
  const el19 = document.getElementById('story19');
  const el20 = document.getElementById('story20');
  const el21 = document.getElementById('story21');
  const el22 = document.getElementById('story22');
  const el23 = document.getElementById('story23');
  const el24 = document.getElementById('story24');
  const el25 = document.getElementById('story25');
  const el26 = document.getElementById('story26');



setTimeout(() => {
  el.style.visibility = 'visible';
}, 1000);
setTimeout(() => {
  el.style.visibility = 'hidden';
}, 6000);

setTimeout(() => {
  el1.style.visibility = 'visible';
}, 12000);
setTimeout(() => {
  el1.style.visibility = 'hidden';
},19000);

setTimeout(() => {
  el2.style.visibility = 'visible';
}, 23000);
setTimeout(() => {
  el2.style.visibility = 'hidden';
}, 29000);

setTimeout(() => {
  el3.style.visibility = 'visible';
}, 30000);
setTimeout(() => {
  el3.style.visibility = 'hidden';
}, 36000);
  
setTimeout(() => {
  el4.style.visibility = 'visible';
}, 37000);
setTimeout(() => {
  el4.style.visibility = 'hidden';
}, 43000);

setTimeout(() => {
  el5.style.visibility = 'visible';
}, 45000);
setTimeout(() => {
  el5.style.visibility = 'hidden';
}, 51000);

setTimeout(() => {
  el6.style.visibility = 'visible';
}, 53000);
setTimeout(() => {
  el6.style.visibility = 'hidden';
}, 58000);

setTimeout(() => {
  el7.style.visibility = 'visible';
}, 60000);
setTimeout(() => {
  el7.style.visibility = 'hidden';
}, 66000);

setTimeout(() => {
  el8.style.visibility = 'visible';
}, 68000);
setTimeout(() => {
  el8.style.visibility = 'hidden';
}, 73000);

setTimeout(() => {
  el9.style.visibility = 'visible';
}, 75000);
setTimeout(() => {
  el9.style.visibility = 'hidden';
}, 81000);

setTimeout(() => {
  el10.style.visibility = 'visible';
}, 82000);
setTimeout(() => {
  el10.style.visibility = 'hidden';
}, 88000);

setTimeout(() => {
  el11.style.visibility = 'visible';
}, 90000);
setTimeout(() => {
  el11.style.visibility = 'hidden';
}, 97000);

setTimeout(() => {
  el12.style.visibility = 'visible';
}, 99000);
setTimeout(() => {
  el12.style.visibility = 'hidden';
}, 106000);

setTimeout(() => {
  el13.style.visibility = 'visible';
}, 107000);
setTimeout(() => {
  el13.style.visibility = 'hidden';
}, 110000);

setTimeout(() => {
  el14.style.visibility = 'visible';
}, 117000);
setTimeout(() => {
  el14.style.visibility = 'hidden';
}, 123000);

setTimeout(() => {
  el15.style.visibility = 'visible';
}, 124000);
setTimeout(() => {
  el15.style.visibility = 'hidden';
}, 130000);
  
setTimeout(() => {
  el16.style.visibility = 'visible';
}, 132000);
setTimeout(() => {
  el16.style.visibility = 'hidden';
}, 138000);

setTimeout(() => {
  el17.style.visibility = 'visible';
}, 140000);
setTimeout(() => {
  el17.style.visibility = 'hidden';
}, 146000);

setTimeout(() => {
  el18.style.visibility = 'visible';
}, 148000);
setTimeout(() => {
  el18.style.visibility = 'hidden';
}, 155000);

setTimeout(() => {
  el19.style.visibility = 'visible';
}, 157000);
setTimeout(() => {
  el19.style.visibility = 'hidden';
}, 163000);

setTimeout(() => {
  el20.style.visibility = 'visible';
}, 164000);
setTimeout(() => {
  el20.style.visibility = 'hidden';
}, 170000);

setTimeout(() => {
  el21.style.visibility = 'visible';
}, 172000);
setTimeout(() => {
  el21.style.visibility = 'hidden';
}, 177000);

setTimeout(() => {
  el22.style.visibility = 'visible';
}, 178000);
setTimeout(() => {
  el22.style.visibility = 'hidden';
}, 183000);

setTimeout(() => {
  el23.style.visibility = 'visible';
}, 185000);
setTimeout(() => {
  el23.style.visibility = 'hidden';
}, 191000);
  
setTimeout(() => {
  el24.style.visibility = 'visible';
}, 192000);
setTimeout(() => {
  el24.style.visibility = 'hidden';
}, 197000);

setTimeout(() => {
  el25.style.visibility = 'visible';
}, 206000);
setTimeout(() => {
  el25.style.visibility = 'hidden';
}, 214000);

setTimeout(() => {
  el26.style.visibility = 'visible';
}, 216000);

  
}
