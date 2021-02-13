// press Enter key and search not working.......................................
// document.getElementById('input-search')
// .addEventListener("keypress", function(event){
//     if(event.key === 'Enter'){
//         document.getElementById('search-btn').click();
//     }
// });

const searchSong = () => {
    const searchInput = document.getElementById('input-search').value;
    const url = ` https://api.lyrics.ovh/suggest/:${searchInput}`
    /** <---load data----> */
    toggleSpinner();
    fetch(url)
        .then(res => res.json())
        .then(data => displySong(data.data))
}

const displySong = songs => {
    const songsContainer = document.getElementById('song-container');
    songsContainer.innerHTML = '';
    songs.forEach(incomingSong => {
        const div = document.createElement('div');
        div.className = 'single-result row align-items-center my-3 p-3';
        div.innerHTML = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${incomingSong.title}</h3>
                <p class="author lead">Album by <span>${incomingSong.artist.name}</span></p>
                <audio controls src="${incomingSong.preview}"></audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyrics('${incomingSong.artist.name}','${incomingSong.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
        `;
        songsContainer.appendChild(div);
        toggleSpinner();
    });
}


   //  <---regular old mathod--->
// const getLyrics = (artist, title) => {
//     const url = `https://api.lyrics.ovh/v1/:${artist}/:${title}`;
//     fetch(url)
//     .then(res => res.json())
//     .then(data => displyLyrics(data.lyrics))  
// }    ---------------------...............-------------------


//  <---andvenced mathod--->
const getLyrics = async (artist , title) => {
    const url = `https://api.lyrics.ovh/v1/:${artist}/:${title}`;
    const res = await fetch(url);
    const data = await res.json();
    displyLyrics(data.lyrics);

}

const displyLyrics = lyrics => {
    const lyricsDiv = document.getElementById('lyrics-container');
    lyricsDiv.innerText = lyrics ;
}

const toggleSpinner = (show) =>{
    const spinner = document.getElementById('loading-spinner');
    const songContainer = document.getElementById('song-container');
    songContainer.classList.toggle('d-none')
    spinner.classList.toggle('d-none')
}

// const displyError = error =>{
//     const errors = document.getElementById('error-msg');
//     errors.innerText = error;
// }