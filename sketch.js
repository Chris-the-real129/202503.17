let angle = 0;
let fishes = [];
let seaweeds = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  // 設置背景透明
  clear();
  for (let i = 0; i < 25; i++) { // 產生25隻魚
    fishes.push({
      x: random(width),
      y: random(height),
      speedX: random(-2, 2),
      speedY: random(-2, 2)
    });
  }
  for (let i = 0; i < 50; i++) { // 產生50根海草
    seaweeds.push({
      x: i * (width / 50) + (width / 100),
      y: height,
      angleOffset: random(TWO_PI),
      frequency: random(0.01, 0.05), // 隨機搖晃頻率
      sway: 0 // 初始擺動幅度
    });
  }
}

function draw() {
  clear(); // 設置背景透明

  blendMode(BLEND); // 設置混合模式

  for (let fish of fishes) {
    // 更新魚的位置
    fish.x += fish.speedX;
    fish.y += fish.speedY;

    // 碰到邊界反彈
    if (fish.x > width || fish.x < 0) {
      fish.speedX *= -1;
    }
    if (fish.y > height || fish.y < 0) {
      fish.speedY *= -1;
    }

    // 計算魚的搖晃角度
    let fishAngle = sin(angle * 0.5) * PI / 6; // 減少晃動速度

    // 根據位置計算顏色
    let r = map(fish.x, 0, width, 0, 255);
    let g = map(fish.y, 0, height, 0, 255);
    let b = map(fish.x + fish.y, 0, width + height, 0, 255);

    // 繪製魚
    push();
    translate(fish.x, fish.y);
    rotate(fishAngle);
    drawFish(r, g, b);
    pop();

    // 檢查魚是否碰到海草
    for (let seaweed of seaweeds) {
      let distance = dist(fish.x, fish.y, seaweed.x, seaweed.y);
      if (distance < 50) { // 假設魚和海草的碰撞範圍為50
        seaweed.sway += random(-20, 20); // 增加海草的擺動幅度
      }
    }
  }

  // 繪製海草
  for (let seaweed of seaweeds) {
    seaweed.sway = sin(angle * seaweed.frequency + seaweed.angleOffset) * 80; // 增加擺動幅度
    let r = map(seaweed.sway, -80, 80, 0, 100); // 綠色系
    let g = map(seaweed.x, 0, width, 100, 255); // 綠色系
    let b = map(seaweed.sway + seaweed.x, -80, width + 80, 100, 255); // 藍色系

    drawSeaweed(seaweed.x, seaweed.y, seaweed.sway, r, g, b);
  }

  // 更新角度
  angle += 0.03; // 減少角度增量以減少晃動速度
}

function drawFish(r, g, b) {
  fill(r, g, b);
  ellipse(0, 0, 100, 50); // 魚的身體
  triangle(-50, 0, -70, -20, -70, 20); // 魚的尾巴
}

function drawSeaweed(x, y, sway, r, g, b) {
  noStroke(); // 移除框線
  fill(r, g, b, 150); // 設置顏色和透明度
  beginShape();
  curveVertex(x, y);
  curveVertex(x + sway / 4, y - 100); // 調整擺動幅度
  curveVertex(x - sway / 4, y - 200); // 調整擺動幅度
  curveVertex(x + sway / 4, y - 300); // 調整擺動幅度
  curveVertex(x, y - 400);
  endShape(CLOSE);
}