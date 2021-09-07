
function displaytime() {   // by this it wiil show real time after every 1 sec
    document.getElementById('time').innerHTML = new Date();;
}
setInterval(displaytime, 1000);

let weather = {
    apikey: "f8a25ef66a1755addbda3bacec9b5ae4",
    fetchweather: function (city) {
        fetch("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid="+this.apikey)
            .then((response) => response.json())
            .then((data) => this.displayweather(data))
    },
    displayweather: function(data) {
        const { name }= data;
        const {description}= data.weather[0];
        const {temp, humidity}= data.main;
        const{speed}= data.wind;
        document.querySelector('.city').innerHTML="Weather in "+name;
        document.querySelector('.temp').innerHTML=temp+"°C";
        document.querySelector('.description').innerHTML=description;
        document.querySelector('.humidity').innerHTML="Humidity: "+humidity+"%";
        document.querySelector('.wind').innerHTML="Wind Speed: "+speed+" Km/h";
        document.querySelector('.weather').classList.remove('loading');
        document.body.style.backgroundImage ="url('https://source.unsplash.com/1600x900/?"+ name+ "')"
    },
    search: function(){
        this.fetchweather(document.querySelector('.search-bar').value)
    },
};


document.querySelector('.search button').addEventListener('click', function(){
    weather.search();
    document.querySelector('.search-bar').value=""
});
document.querySelector('.search-bar').addEventListener('keyup', function(e){
    if (e.key === 'Enter') {
        weather.search();
        document.querySelector('.search-bar').value=""
    }
});