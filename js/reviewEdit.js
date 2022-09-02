const titleEditInputTag = document.querySelector('#title-edit');
const contentEditInputTag = document.querySelector('#content-edit');
const reviewIdInputTag = document.querySelector('#reviewId');
const reviewCntInputTag = document.querySelector('#reviewCnt');

const editModalReviewFind = (reviewId) => {
  let reviewListJson = localStorage.getItem("review");
  let reviewList = JSON.parse(reviewListJson);

  if(reviewList){
    reviewList.forEach(review => {
      if(review.reviewId == reviewId){
        editModalSetting(review);
      }
    });
  }
}

const editModalSetting = (review) => {
  titleEditInputTag.value = review.title;
  contentEditInputTag.value = review.content;
  reviewIdInputTag.value = review.reviewId;
  reviewCntInputTag.value = review.viewCnt;
}

const reviewEditBtnClicked = () => {
  let currentLoginInfo = localStorage.getItem("login");
  let reviewId = reviewIdInputTag.value;

  let title = titleEditInputTag.value;
  let content = contentEditInputTag.value;
  let writer = currentLoginInfo ? currentLoginInfo.name : "GUEST";
  let writeTime = getCurrentTimeString();
  let viewCnt = reviewCntInputTag.value;

  let reviewObject = {
    reviewId : reviewId,
    postId : postId,
    title : title,
    content : content,
    writer : writer,
    writeTime : writeTime,
    viewCnt : viewCnt
  }

  deleteReview(reviewId)
  registReview(reviewObject);

  titleEditInputTag.value = "";
  contentEditInputTag.value = "";

  window.onload();
}

const cancelReviewEdit = () => {
  window.onload();
}