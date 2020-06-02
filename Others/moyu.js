document.title = "Getting started with Yeoman | Yeoman";

const progress = document.querySelector(".right-container");
progress.style.backgroundImage = "url('https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=23096620,2902845481&fm=26&gp=0.jpg)";
progress.style.backgroundSize = "100%";
// progress.style.backgroundColor = "rgba(74, 77, 87, 1)";
progress.querySelector('div').style.opacity = 0.1

const videoProgress = document.querySelector(".vjs-progress-control");
videoProgress.style.opacity = 0.1;

const pre = document.querySelector("#pc-control-prev");
pre.style.opacity = 0;

const pause = document.querySelector("button.vjs-paused");
if (pause) {
  pause.style.opacity = 0;
}

const playing = document.querySelector("button.vjs-playing");
if (playing) {
  playing.style.opacity = 0;
}

const currTime = document.querySelector(".vjs-current-time");
currTime.style.opacity = 0.1;

const endTime = document.querySelector(".vjs-duration-display");
endTime.style.opacity = 0.1;

const next = document.querySelector("#pc-control-next");
next.style.opacity = 0.1;

const volume = document.querySelector(".vjs-volume-panel");
volume.style.opacity = 0;

const fullscreen = document.querySelector(".vjs-fullscreen-control");
fullscreen.style.opacity = 0;

const rate = document.querySelector(".vjs-playback-rate");
rate.style.opacity = 0.1;

const end = document.querySelector(".end-modal-content");
end.style.opacity = 0.1



//  隐藏水印
const css = '.watermark-dom-template {display: none !important}',
      head = document.head || document.getElementsByTagName('head')[0],
      style = document.createElement('style');

head.appendChild(style);

style.type = 'text/css';
style.appendChild(document.createTextNode(css));

//  隐藏logo
const logoFilter = document.createElement('div');
Object.assign(logoFilter.style, {
  width: '100px',
  height: '50px',
  filter: 'blur(20px)',
  backgroundColor: 'rgba(0,0,0,0.5)',
  position: 'absolute',
  top: 0,
  right: 0,
})
document.body.appendChild(logoFilter)
