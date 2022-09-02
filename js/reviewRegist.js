const titleInputTag = document.querySelector('#title');
const contentInputTag = document.querySelector('#content');

const reviewRegistBtnClicked = () => {
  let currentLoginInfo = localStorage.getItem("login");

  let title = titleInputTag.value;
  let content = contentInputTag.value;
  let writer = currentLoginInfo ? currentLoginInfo.name : "GUEST";
  let writeTime = getCurrentTimeString();
  let viewCnt = 0;

  let reviewObject = {
    reviewId : Math.random().toString(36).substr(2,11),
    postId : postId,
    title : title,
    content : content,
    writer : writer,
    writeTime : writeTime,
    viewCnt : viewCnt
  }

  registReview(reviewObject);
  window.onload();
}

const registReview = (reviewObject) => {
  let reviewListJson = localStorage.getItem("review");
  let reviewList = JSON.parse(reviewListJson);

  if(reviewList){
    reviewList.push(reviewObject);
  }else{
    reviewList = [reviewObject];
  }
  reviewListJson = JSON.stringify(reviewList);
  localStorage.setItem("review",reviewListJson);
}

const getCurrentTimeString = () => {
  let today = new Date();

  let year = today.getFullYear();
  let month = ('0' + (today.getMonth() + 1)).slice(-2);
  let day = ('0' + today.getDate()).slice(-2);
  
  let hours = ('0' + today.getHours()).slice(-2); 
  let minutes = ('0' + today.getMinutes()).slice(-2);
  let seconds = ('0' + today.getSeconds()).slice(-2); 

  let dateString = year + '-' + month  + '-' + day;
  let timeString = hours + ':' + minutes  + ':' + seconds;

  let completeString = dateString + " " + timeString;

  return completeString;
}

const cancelReviewRegist = () => {
  window.onload();
}