const API_KEY='502940776a0f47cba9b920a2b4327f2b';
const getNews = () {
    let url = new URL(
    `https://noona-times90.netlify.app/top-headlines?country=us&category=${category}&apiKey=${API_KEY}` 
    
    );
    console.log("uuu", url);

    const response = fetch(url)

    console.log("rrr", response);
};

getNews();
