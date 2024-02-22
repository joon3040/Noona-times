const API_KEY='502940776a0f47cba9b920a2b4327f2b';
let newsList=[]
const menus = document.querySelectorAll(".menus button")
menus.forEach(menu=>menu.addEventListener("click", (event)=>getNewsByCategory(event))) 

const getLatestNews = async () => {
    const url = new URL(
        `https://noona-times90.netlify.app/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`) ;
    const response = await fetch(url);
    const data = await response.json();
    newsList = data.articles;
    render();
    console.log("dddddd", newsList);    
};

const getNewsByCategory= async (event)=>{
        const category = event.target.textContent.toLowerCase();
    const url = new URL(
        `https://noona-times90.netlify.app/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`) ;
    const response = await fetch(url);
    const data = await response.json();
        newsList = data.articles;
    render();
}

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
    console.log("html", newsHTML)

    document.getElementById("news-board").innerHTML=newsHTML
}


getLatestNews();
getNewsByCategory();


//1. 버튼들에 클릭이벤트를 주기
//2. 카테고리별 뉴스 가져오기
//3. 그 뉴스를 보여주기
