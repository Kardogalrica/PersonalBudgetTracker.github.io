function createMessague(menssague, type = 'info') {
    const feedback = document.createElement('div')
    feedback.classList.add('feedback-personalizada', type)
    feedback.innerText = menssague

    document.querySelector('body').appendChild(feedback)

    setTimeout(() => {
        feedback.classList.add('feedback-personalizada-active')
    }, 10)

    feedback.addEventListener('click', () => {
        document.querySelector('body').removeChild(feedback)
    })

    setTimeout(() => {
        document.querySelector('body').removeChild(feedback)
    }, 10000 )
}