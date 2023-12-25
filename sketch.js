var face_colors = "edede9-d6ccc2-f5ebe0-e3d5ca-d5bdaf".split("-").map(a => "#" + a)
var eye_colors = "03045e-023e8a-0077b6-0096c7-00b4d8-48cae4-90e0ef-ade8f4-caf0f8".split("-").map(a => "#" + a)
var pos_x = []
var pos_y = []
var eye_x = 0; // 眼珠的相對位置 x
var eye_y = 0; // 眼珠的相對位置 y
var sizes = []
var colors = []
var v_y = [] //移動速度 y
var v_x = [] //移動速度 x
var mouthOpen = false; // 控制嘴巴開合的變數
var mouthSound;

function preload() {
  // 載入音效文件
  mouthSound = loadSound("mixkit-dog-barking-twice-1.wav");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background("#8ecae6");

  for (var i = 0; i < pos_x.length; i = i + 1) {
    push()
    translate(pos_x[i], pos_y[i])
    drawface(colors[i], sizes[i])
    pop()

    // 更新眼珠位置為滑鼠位置的一部分
    eye_x = mouseX - pos_x[i];
    eye_y = mouseY - pos_y[i];

    pos_y[i] = pos_y[i] + v_y[i];
    pos_x[i] = pos_x[i] + v_x[i];

    if (pos_y[i] > height || pos_y[i] < 0) //判斷有沒有碰到上邊
    {
      // 如果碰到上邊，改變方向
      v_y[i] = -v_y[i];
    }

    if (pos_x[i] > width || pos_x[i] < 0) //判斷有沒有碰到左右邊
    {
      // 如果碰到左右邊，改變方向
      v_x[i] = -v_x[i];
    }
  }
}

function drawface(face_clr = 255, size = 1) {
  push()
  scale(size)
  fill(face_clr)
  noStroke()
  ellipse(0, 0, 400)
  fill("#212529")
  ellipse(-90, -100, 40)
  ellipse(100, -100, 40)

  // 眼珠的位置根據相對位置計算
  fill("#f8f9fa") //眼珠
  ellipse(-90 + eye_x * 0.01, -100 + eye_y * 0.01, 20) // 左眼珠
  ellipse(100 + eye_x * 0.01, -100 + eye_y * 0.01, 20) // 右眼珠

  fill(face_clr)
  noStroke()
  ellipse(-170, -170, 150)
  fill(face_clr)
  noStroke()
  ellipse(170, -170, 150)

  fill("#a68a64")
  ellipse(-170, -170, 70)
  ellipse(170, -170, 70)

  fill("#ddb892")
  ellipse(0, 0, 200)

  fill("#9c6644")
  ellipse(0, -50, 50)

  fill("#ffcfd2")
  // 根據 mouthOpen 變數控制嘴巴的開合
  if (mouthOpen) {
    arc(0, 0, 100, 150, 0, PI)
  } else {
    rect(-50, 0, 100, 25)
  }

  fill("#ffcfd2")
  ellipse(150, -50, 50)


  pop()
}

function mousePressed() {
  pos_x.push(mouseX)
  pos_y.push(mouseY)
  sizes.push(random(0.5, 0.3))
  colors.push(face_colors[int(random(face_colors.length))])
  v_y.push(random(-1, 1))
  v_x.push(random(-1, 1))

  // 切換嘴巴的開合狀態
  mouthOpen = !mouthOpen;

  // 播放音效
  if (mouthOpen) {
    mouthSound.play();
  }
}
