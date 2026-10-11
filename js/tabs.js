const tabs = document.querySelectorAll('[data-tabs]')

tabs.forEach((tab) => {
    const tabsHeader = tab.querySelectorAll('.tabs-header > button')
    const tabsContent = tab.querySelectorAll('.tab-content > *')

    tabsHeader.forEach((header) => {
        header.addEventListener('click', (e) => {
            const tabIndex = e.target.dataset.tabIndex
            tabsHeader.forEach((h) => {
                h.classList.remove('is-active')

                if(h.dataset.tabIndex === tabIndex) {
                    h.classList.add('is-active')
                }
            })
            tabsContent.forEach((c) => {
                c.classList.remove('not-visible')

                if(c.dataset.tabIndex !== tabIndex) {
                    c.classList.add('not-visible')
                }
            })
        })
    })
})
