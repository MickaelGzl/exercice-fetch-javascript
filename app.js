let searchInput = document.querySelector('.search-input');
let resultDisplay = document.querySelector('.results-display');
let form = document.getElementsByTagName('form')[0];
let loader = document.querySelector('.loader');

loader.style.display = 'none'

form.addEventListener('input', function(){
    resultDisplay.innerHTML = ''
    loader.style.display = 'flex';
    // e.preventDefault();
    let search = searchInput.value;
    fetch(`https://fr.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${search}`)
    .then(response => {
        if(response.ok){
            response.json()
            .then( data => {
                let results = data.query.search;
                results.forEach(result => {
                    const { pageid, title, timestamp, snippet } = result;
                    let divTag = document.createElement('div')
                    let titleTag = document.createElement('h2');
                    let linkTag = document.createElement('a');
                    let descripTag = document.createElement('p');

                    divTag.classList.add('result-item');
                    titleTag.classList.add('result-title');
                    linkTag.classList.add('result-link');
                    descripTag.classList.add('result-snippet');

                    titleTag.innerHTML = title;
                    linkTag.href = `https://fr.wikipedia.org/?curid=${pageid}`;
                    linkTag.target = '_blank';
                    linkTag.innerHTML = linkTag.href;
                    descripTag.innerHTML = snippet;
                    divTag.append(titleTag, linkTag, descripTag);
                    resultDisplay.insertAdjacentElement('beforeend', divTag);
                })
                return;
            })
        }
        else{
            resultDisplay.innerHTML = 'Erreur Réseau, veuillez réessayer ultérieurement.'
        }
        loader.style.display = 'none'
    })
    .catch(error => {
        resultDisplay.innerHTML = `Erreur: ${error}`;
        loader.style.display = 'none'
    })
})