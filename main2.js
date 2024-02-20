const API_KEY='502940776a0f47cba9b920a2b4327f2b';
const getNews = () {
    let url = new URL(
    `https://noona-times90.netlify.app/` 
    
    );
    console.log("uuu", url);

    const response = fetch(url)

    console.log("rrr", response);
};

getNews();
for (let i = 0; i< 20; i++){
    console.log("after", i);
}