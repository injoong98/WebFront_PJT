const tbodyTag = document.querySelector('tbody');
const reviewListTag = document.querySelector('#review-list');
const registModalTag = document.querySelector('#review-regist-modal');
const detailModalTag = document.querySelector('#review-detail-modal');
const editModalTag = document.querySelector('#review-edit-modal');

let index;
let postId;

window.onload = () => {
  registModalTag.style.display = "none";
  detailModalTag.style.display = "none";
  editModalTag.style.display = "none";
  reviewListTag.style.display = "block";

  index = 1;
  postId = getParam("postId");

  loadReviewList();
}

const loadReviewList = () => {
  tbodyTag.innerHTML = "";

  let reviewListJson = localStorage.getItem("review");
  let reviewList = JSON.parse(reviewListJson);

  if(reviewList){
    reviewList.forEach(review => {
      if(review.postId == postId){
        setReviewElement(review);
        index++;
      }
    });
  }
}

const setReviewElement = (review) => {
  let newRow = document.createElement("tr");
  newRow.innerHTML = 
    `<th scope="row">${index}</th>
    <td onclick="detailModalOn('${review.reviewId}')">${review.title}</td>
    <td>${review.writer}</td>
    <td>${review.viewCnt}</td>
    <td>${review.writeTime}</td>`;

  tbodyTag.appendChild(newRow);
}

const registModalOn = () => {
  reviewListTag.style.display = "none";
  registModalTag.style.display = "block";
}

const detailModalOn = (reviewId) => {
  detailModalReviewFind(reviewId);
  reviewListTag.style.display = "none";
  detailModalTag.style.display = "block";
}

const editModalOn = (reviewId) => {
  editModalReviewFind(reviewId);
  reviewListTag.style.display = "none";
  detailModalTag.style.display = "none";
  editModalTag.style.display = "block";
}

// url 에서 parameter 추출
function getParam(sname) {
  var params = location.search.substr(location.search.indexOf("?") + 1);
  var sval = "";

  params = params.split("&");
  for (var i = 0; i < params.length; i++) {
      temp = params[i].split("=");
      if ([temp[0]] == sname) {
       sval = temp[1]; 
      }
  }

  return sval;
}

