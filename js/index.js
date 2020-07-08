let setTodo = document.querySelector(".settodo");
let addTodo = document.querySelector(".addtodo");
let list = document.querySelector(".list");

let alertbg = document.querySelector(".alertBg");
let alertposit = document.querySelector(".alertPosit");

let dotColor = "";
//開啟彈跳視窗
function alertbox(text) {
  alertbg.style.display = "block";
  alertposit.style.top = "50%";
  alertposit.style.opacity = "1";
  if (text == null) {
    document.querySelector(".alertText").innerHTML = "資料要填完整喔~";
  } else {
    document.querySelector(".alertText").innerHTML = text;
  }
}
//關閉彈跳視窗
let alertBtn = document.querySelector(".alertBtn");
function closebox() {
  alertbg.style.display = "none";
  alertposit.style.top = "-15%";
  alertposit.style.opacity = "0";
}
alertBtn.addEventListener("click", closebox);
//得到輸入的值 放入local裡
function addItem() {
  //得到輸入的文字
  let todolist = JSON.parse(localStorage.getItem("list"));
  let text = setTodo.value;
  let color = dotColor;
  let item = {
    text: text,
    color: color,
  };
  let list = localStorage.getItem("list");
  if (list == null) {
    localStorage.setItem("list", JSON.stringify([]));
  }
  let arr = JSON.parse(localStorage.getItem("list"));
  if (item.text == "" || item.color == "") {
    alertbox();
    return;
  }
  if (todolist.length > 10) {
    let text = "太多囉!先將計劃做完吧!";
    alertbox(text);
    return;
  }

  //得到輸入的顏色
  arr.push(item);
  localStorage.setItem("list", JSON.stringify(arr));
  setTodo.value = "";
  dotColor = "";
  document.querySelector(
    ".holderplace"
  ).innerHTML = `選個標籤<i class="choose-icon fas fa-angle-down"></i
  >`;
  getItem();
}
//從local取出 放在網頁上
function getItem() {
  let todolist = JSON.parse(localStorage.getItem("list"));

  if (todolist.length == 0) {
    list.innerHTML = "<li class='nocontent'>快來建立夢想吧~</li>";
    return;
  }

  todoitem = "";
  for (let i = 0; i < todolist.length; i++) {
    todoitem += `<li><span><img class="dotimg" src="../public/img/${todolist[i].color}" >
    ${todolist[i].text}</span>
    <img data-num="${i}" class="delebtn" src="../public/img/dele_btn.png" onMouseOver="this.src='../public/img/dele_btn_hover.png'" onMouseOut="this.src='../public/img/dele_btn.png'"></img>
    </li>`;
  }
  list.innerHTML = todoitem;
}
getItem();
addTodo.addEventListener("click", addItem);
//刪除 點擊取的子項目的編號
function removeList(e) {
  if (e.target.className !== "delebtn") {
    return;
  }
  let targetTagNum = e.target.dataset.num;
  let todolist = JSON.parse(localStorage.getItem("list"));
  todolist.splice(targetTagNum, 1);
  localStorage.setItem("list", JSON.stringify(todolist));
  getItem();
}
list.addEventListener("click", removeList);
//enter可以放入local裡
let keydown = document.body;
function sendTodo(e) {
  if (e.key == "Enter") {
    addItem();
  }
}
keydown.addEventListener("keydown", sendTodo);

//選取想要的標籤顏色
//打開列表
let selectTeg = document.querySelector(".holderplace");
let icon = document.querySelector(".choose-icon");
function openlist() {
  if (document.querySelector(".chooselist").style.display === "block") {
    closelist();
    return;
  }
  document.querySelector(".chooselist").style = "display:block";
  icon.classList.add("fa-angle-up");
}
selectTeg.addEventListener("click", openlist);

function closelist() {
  document.querySelector(".chooselist").style = "display:none";
  icon.classList.remove("fa-angle-up");
}

let chooselist = document.querySelector(".chooselist");
function chooseitem(e) {
  let content = document.querySelector(".holderplace");
  if (e.target.dataset.color == null) {
    return;
  }
  switch (e.target.dataset.color) {
    case "red":
      dotColor = "dot_orange.png";
      content.innerHTML =
        '<img src="../public/img/dot_orange.png" alt="" />RED<i class="choose-icon fas fa-angle-down"></i>';
      closelist();
      return;
    case "yellow":
      dotColor = "dot_yellow.png";
      content.innerHTML =
        '<img src="../public/img/dot_yellow.png" alt="" />YE<i class="choose-icon fas fa-angle-down"></i>';
      closelist();
      return;
    case "blue":
      dotColor = "dot_blue.png";
      content.innerHTML =
        '<img src="../public/img/dot_blue.png" alt="" />BLUE<i class="choose-icon fas fa-angle-down"></i>';
      closelist();
      return;
  }
}
chooselist.addEventListener("click", chooseitem);

let body = document.body;
body.addEventListener("click", function (e) {
  if (
    e.target.className !== "chooselist-item" &&
    e.target.className !== "holderplace" &&
    document.querySelector(".chooselist").style.display === "block"
  ) {
    closelist();
    return;
  }
});
