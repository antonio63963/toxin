const WIDTH = 120;
const HEIGHT = 120;
const DPI_HEIGHT = HEIGHT * 2;
const DPI_WIDTH = WIDTH * 2;
const ARC_BORDER_WIDTH = 4;
const SPACE_BETWEEN_ARCS = 2;

let goodDraw = 270;
let normalDraw = 0;
let excellentDraw = 92;

let counterAmount = 0;

const goodGradient = ["#6FCF97", "#66D2EA"];
const normalGradient = ["#BC9CFF", "#8BA4F9"];
const excellentGradient = ["#FFE39C", "#FFBA9C"];

function initArcChart(canvas) {
  console.log(canvas);
  const ctx = canvas.getContext("2d");
  // canvas.width = WIDTH;
  // canvas.height = HEIGHT;
  canvas.width = DPI_WIDTH;
  canvas.height = DPI_HEIGHT;

  // buildArc(ctx, {
  //   viewWidth: DPI_WIDTH,
  //   viewHeight: DPI_HEIGHT,
  //   gradientArr: normalGradient,
  //   startAng: 0,
  //   endAng: 90,
  // });

  // buildArc(ctx, {
  //   viewWidth: DPI_WIDTH,
  //   viewHeight: DPI_HEIGHT,
  //   gradientArr: excellentGradient,
  //   startAng: 90 + 2,
  //   endAng: 270 - 2,
  // });
  // buildArc(ctx, {
  //   viewWidth: DPI_WIDTH,
  //   viewHeight: DPI_HEIGHT,
  //   gradientArr: goodGradient,
  //   startAng: 270,
  //   endAng: 359,
  // });

  animate(ctx)
}

function getRadiansFromDegrees(degree) {
  const revertDegree = 360 - degree;
  return (Math.PI / 180) * revertDegree;
}

function buildArc(
  ctx,
  { viewHeight, viewWidth, gradientArr, startAng, endAng }
) {
  const radius = (viewWidth - ARC_BORDER_WIDTH * 4) / 2;
  ctx.beginPath();
  ctx.lineWidth = ARC_BORDER_WIDTH * 2;
  ctx.strokeStyle = setGradient(ctx, gradientArr);

  ctx.arc(
    viewWidth / 2,
    viewHeight / 2,
    radius,
    getRadiansFromDegrees(startAng + SPACE_BETWEEN_ARCS),
    getRadiansFromDegrees(endAng - SPACE_BETWEEN_ARCS),
    true
  );
  ctx.stroke();
}

function setGradient(ctx, gradient) {
  const grad = ctx.createLinearGradient(0, 0, DPI_WIDTH, DPI_HEIGHT);
  grad.addColorStop(0, gradient[0]);
  grad.addColorStop(1, gradient[1]);
  return grad;
}

function addFrames(drawValue, endAng) {
  const dif = endAng - drawValue;
  if(dif < drawValue / 3) {
    return 3;
  } else if (dif < drawValue / 2) {
    return 6;
  }
  return 2;
}

function normalAnimation(ctx, endAng) {
  // console.log('end: ', endAng, 'normalDraw: ', normalDraw, normalDraw < endAng)
  buildArc(ctx, {
    viewWidth: DPI_WIDTH,
    viewHeight: DPI_HEIGHT,
    gradientArr: normalGradient,
    startAng: 0,
    endAng: normalDraw,
  });
  if(normalDraw < endAng +1) {
    normalDraw += addFrames(normalDraw, endAng);
  }
}
function excellentAnimation(ctx, endAng) {
  buildArc(ctx, {
    viewWidth: DPI_WIDTH,
    viewHeight: DPI_HEIGHT,
    gradientArr: excellentGradient,
    startAng: 92,
    endAng: excellentDraw,
  });
  if(excellentDraw < endAng + 1) {
    excellentDraw += addFrames(excellentDraw, endAng);
  }
}
function goodAnimation(ctx, endAng) {
  buildArc(ctx, {
    viewWidth: DPI_WIDTH,
    viewHeight: DPI_HEIGHT,
    gradientArr: goodGradient,
    startAng: 270,
    endAng: goodDraw,
  });
  if(goodDraw < endAng + 1) {
    goodDraw += addFrames(goodDraw, endAng);
  }
}

function animateCounter(ctx, max) {
  ctx.beginPath();
  ctx.font = "bold 48px Montserrat,sans-serif";
  ctx.fillStyle = "#BC9CFF";
  const textWidth = ctx.measureText(counterAmount).width;
  ctx.fillText( counterAmount, (DPI_WIDTH / 2) - (textWidth / 2), DPI_HEIGHT / 2);
  
  if(counterAmount < max) {
    counterAmount += 5;
  }
}
function buildStaticVoiceText(ctx) {
  ctx.beginPath();
  ctx.font = "bold 24px Montserrat,sans-serif";
  ctx.fillStyle = "#BC9CFF";
  const textWidth = ctx.measureText('ГОЛОСОВ').width;
  ctx.fillText('ГОЛОСОВ', (DPI_WIDTH / 2) - (textWidth / 2), (DPI_HEIGHT / 2) + 36)
}

function animate(ctx) {
  ctx.clearRect(0, 0, DPI_WIDTH, DPI_HEIGHT);
  animateCounter(ctx, 260);
  buildStaticVoiceText(ctx);
  normalAnimation(ctx, 90);
  excellentAnimation(ctx, 268);
  goodAnimation(ctx, 359);
  requestAnimationFrame(() => animate(ctx))
}

initArcChart(document.getElementById("arcChart"));
