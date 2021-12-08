const searchShops = (poi, lon, lat, shop, width, height) => {
    axios.get('/filter'
    ).then( response => {
        console.log(response); // Gets all shops printed in the browsers console but cant send json body for search
    });
};

//window.onload so that the Eventlistener waits for the site to be loaded
window.onload=function(){ 
    const searchForm = document.querySelector('.form_overview');
    if(searchForm)
    {
        searchForm.addEventListener('submit', event => {
            event.preventDefault();
            const poi = document.getElementById('poi').value;
            const lon = document.getElementById('lon').value;
            const lat = document.getElementById('lat').value;
            const shop = document.getElementById('shop').value;
            const width = document.getElementById('width').value;
            const height = document.getElementById('height').value;
            console.log(poi, lon, lat, shop, width, height);
            //searchShops(poi, lon, lat, shop, width, height);
        }); 
    }
};