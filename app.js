const url="https://api.dictionaryapi.dev/api/v2/entries/en/"
const apiPhoto="nnCaB2sFk92J5EoRm049Hw-yi4-gP1nQACR8M_Y3U2Y"
const Btn=document.querySelector("#search-btn")
const input=document.querySelector('input')
const result=document.querySelector('#result')
const sound=document.querySelector("#sound")
const img=document.querySelector('img')
const searchResult=document.querySelector('.search-results')

Btn.addEventListener("click",()=>{
    let inputValue=input.value
    
    fetch(`${url}${inputValue}`)
    .then(res => res.json())
    .then(data => {
        searchImage();
        searchResult.innerHTML=''
        console.log(data);
        input.value=''
        result.innerHTML=`
            <div class="word">
                <h3>${inputValue}</h3>
                <button onclick="playSound()">
                    <i class="fas fa-volume-up"></i>
                </button>
            </div>
            <div class="details">
                <p>${data[0].meanings[0].partOfSpeech}</p>
                <p>${data[0].phonetic}</p>
            </div>
            <p class="word-meaning">${data[0].meanings[0].definitions[0].definition || ""} </p>
            <p class="word-example">${data[0].meanings[0].definitions[0].example || ""}</p>
            </div>
    </div>
`
            
            sound.setAttribute("src",`${data[0].phonetics[1].audio ||  data[0].phonetics[0].audio }` )

        })
        .catch(
            result.innerHTML=`<h3 class="error"> You couldn't find word</h3>`
        )
})

function playSound (){
    sound.play();
}

let inputData=""
async function searchImage(){
    inputData=input.value
    const url=`https://api.unsplash.com./search/photos?page&&query=${inputData}&client_id=${apiPhoto}`

    const respose=await fetch(url)
    const data=await respose.json()
    const results=data.results

    results.map((res)=>{
        const imgWrapper=document.createElement('div')
        imgWrapper.classList.add('search-result')

        const image=document.createElement('img')
        image.src=res.urls.small;

        imgWrapper.appendChild(image)
        searchResult.appendChild(imgWrapper)
    })
    
}
