const API_KEY='502940776a0f47cba9b920a2b4327f2b';
let newsList=[];
const menus = document.querySelectorAll(".menus button");
menus.forEach(menu=>menu.addEventListener("click", (event)=>getNewsByCategory(event)));

let url = new URL(`https://noona-times90.netlify.app/top-headlines?country=kr&apiKey=${API_KEY}`);

let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;


const getNews = async () => {
        try{
            url.searchParams.set("page", page); // url함수 중 page 인수를 찾아서 붙여주는 함수, 미리 설정한 page 변수의 값을 인수로 전달하므로 URL 주소에 &page=page로 끝에 붙게 된다.
            url.searchParams.set("pageSize", pageSize);  

            const response = await fetch(url);
            
            const data = await response.json();
            if(response.status===200){  // status 200은 정상, 나머지는 오류이므로 정상일경우 그대로 출력하고 else일 경우 error를 던진다.
                if(data.articles.length===0){
                    throw new Error("No result for this search");
                }
                newsList = data.articles;
                totalResults = data.totalResults
                render();
                paginationRender();
            }else{
                throw new Error(data.message);
            }
            
            

        }catch(error){
            errorRender(error.message) // 해당 오류 상태 결과값을 가진 error를 try에서 던져서 catch에서 잡은 후 error.message로 오류 내용을 errorRender 함수에 전달한다.
        };
  
};

const getLatestNews = async () => {
    url = new URL(
        `https://noona-times90.netlify.app/top-headlines?country=kr&apiKey=${API_KEY}`
        ) ;
        getNews();
};

const getNewsByCategory= async (event)=>{
        const category = event.target.textContent.toLowerCase();
    url = new URL(
        `https://noona-times90.netlify.app/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`) ;
   getNews();
};

const getNewsByKeyword= async () => {

    const keyword = document.getElementById("search-input").value;
    url = new URL(
        `https://noona-times90.netlify.app/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`) ;
    getNews();
};

const render=()=>{
    const newsHTML = newsList.map((news)=>`<div class="row news"> 
    <div class="col-lg-4">
        <img class="news-img-size" src="${news.urlToImage}"/>
    </div>
    <div class="col-lg-8">
    <h2>${news.title}</h2>
    <p>
        ${news.description}
    </p>
    <div>
        ${news.source.name} * ${news.publishedAt}
    </div>
    </div>
</div>`)
    .join("");


    document.getElementById("news-board").innerHTML=newsHTML
};

const errorRender = (errorMessage)=>{
  const errorHTML = `<div class="alert alert-danger" role="alert">
    ${errorMessage}
  </div>`; // 부트스트랩에 있는 error 경고문 HTML을 자바스크립트 형태로 쓰기 위해 errorHTML에 넣어준다.
   
document.getElementById("news-board").innerHTML= errorHTML
};

const paginationRender=()=>{
    //totalResults
    //page
    //pageSize
    //groupSize
    //totalPages;
    
    const totalPages = Math.ceil(totalResults / pageSize);
    //pageGroup
    const pageGroup = Math.ceil(page/groupSize);
    //lastPage
    let lastPage = pageGroup * groupSize; //아래 조건문에 의해 lastPage 값이 변경될 수 있으므로 const가 아닌 let으로 선언한다.
    // 마지막 페이지가 그룹사이즈보다 작을 경우 lastpage = totalpage
    if(lastPage > totalPages){
        lastPage = totalPages;
    }
    //firstPage
    const firstPage = lastPage - (groupSize -1)<=0? 1: lastPage - (groupSize -1);

    
    let paginationHTML = ``;
    if (firstPage >= 6){ 
    paginationHTML=
    `<li class="page-item" onclick="moveToPage(1)"><a class="page-link" href='#js-bottom'>&lt;&lt;</a></li>
     <li class="page-item" onclick="moveToPage(${page - 1})"><a class="page-link" href='#js-bottom'>&lt;</a></li>`
};
// 첫번째 페이지가 6보다 같거나 클 경우 이전 화살표 추가되므로 6~10 그룹부터 이전 화살표 버튼이 생긴다.
  

    for(let i=firstPage; i<=lastPage;i++){
        paginationHTML+=`<li class="page-item ${i===page? "active":""}" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`
    };

    if (lastPage < totalPages){
    paginationHTML += 
    `<li class="page-item" onclick="moveToPage(${page + 1})"><a  class="page-link" href='#js-program-detail-bottom'>&gt;</a></li>
    <li class="page-item" onclick="moveToPage(${totalPages})"><a class="page-link" href='#js-bottom'>&gt;&gt;</a></li>`;
    };    // 마지막 16~20 그룹에서는 lastpage = 20이고 totalpages =20으로 같기 때문에 다음 화살표가 추가되지 않는다.
    document.querySelector(".pagination").innerHTML = paginationHTML;
};
    

/*     <nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
    <li class="page-item"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item"><a class="page-link" href="#">Next</a></li>
  </ul>
</nav> */


const moveToPage=(pageNum)=>{
   console.log("movetopage", pageNum);
   page = pageNum;
   getNews()
}
getLatestNews();



//1. 버튼들에 클릭이벤트를 주기
//2. 카테고리별 뉴스 가져오기
//3. 그 뉴스를 보여주기
