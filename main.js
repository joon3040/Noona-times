const API_KEY='502940776a0f47cba9b920a2b4327f2b';
let newsList=[];
const menus = document.querySelectorAll(".menus button");
menus.forEach(menu=>menu.addEventListener("click", (event)=>getNewsByCategory(event)));

let url = new URL(`https://noona-times90.netlify.app/top-headlines?country=kr&apiKey=${API_KEY}`)

const getNews = async () => {
        try{  
            const response = await fetch(url);
            const data = await response.json();
            if(response.status===200){  // status 200은 정상, 나머지는 오류이므로 정상일경우 그대로 출력하고 else일 경우 error를 던진다.
                if(data.articles.length===0){
                    throw new Error("No result for this search");
                }
                newsList = data.articles;
                render();
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



getLatestNews();



//1. 버튼들에 클릭이벤트를 주기
//2. 카테고리별 뉴스 가져오기
//3. 그 뉴스를 보여주기
