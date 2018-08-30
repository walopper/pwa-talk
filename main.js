const apiEndPointUrl = 'https://jsonplaceholder.typicode.com/photos';

const installSW = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('/sw.js')
            .then(function () {
                console.log('Service worker registered!')
            })
            .catch(console.error)
    }
}

const getPhotos = () => fetch(apiEndPointUrl)
    .then(r => r.json())
    .then(response => {
        return Array.isArray(response) ? response.slice(0, 5) : []
    })
    .then(photos => {
        renderPhotos(photos)
    })
    .catch(console.error)

function renderPhotos(photos) {
    const container = document.getElementById('app')

    function createListItem(photo) {
        const photoList = document.createElement('div')
        photoList.classList.add("photoList")

        const title = document.createElement('div')
        title.classList.add("title")
        const titleText = document.createTextNode(photo.title)
        title.appendChild(titleText)

        const tn = document.createElement('div')
        tn.classList.add("tn")
        const tnImage = document.createElement('img')
        tnImage.src = photo.thumbnailUrl
        tn.appendChild(tnImage)

        photoList.appendChild(tn)
        photoList.appendChild(title)

        return photoList
    }

    photos.forEach(photo => {
        let photoList = createListItem(photo)
        container.appendChild(photoList)
    });
}

(function(){
    getPhotos()
    installSW()
})()
