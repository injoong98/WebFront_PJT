const detailPageTag = document.querySelector("#detail-page");

const detailModalReviewFind = (reviewId) => {
  let reviewListJson = localStorage.getItem("review");
  let reviewList = JSON.parse(reviewListJson);

  if(reviewList){
    reviewList.forEach(review => {
      if(review.reviewId == reviewId){
        detailModalSetting(review);
      }
    });
  }
}

const detailModalSetting = (review) => {
  detailPageTag.innerHTML = 
  `<h1 class="card-title pricing-card-title fs-5">${review.title}</h1>
  <ul class="list-unstyled mt-3 mb-4">
    <li style="font-size: 12px;">작성자 : ${review.writer}</li>
    <li style="font-size: 12px;">작성일 : ${review.writeTime}</li>
    <li style="font-size: 12px;">조회수 : ${review.viewCnt}</li>
    <hr>
    <li>${review.content}</li>
  </ul>
  <div class="d-flex justify-content-evenly">
    <button class="w-30 mb-2 btn btn-md rounded-4 btn-outline-primary me-2" type="submit">글수정</button>
    <button class="w-30 mb-2 btn btn-md btn-outline-danger rounded-4" type="submit">글삭제</button>
  </div>`
}