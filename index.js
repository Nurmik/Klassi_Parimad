parseData = async data => {
    return data.feed.entry.map(entry => {
        return Object.keys(entry)
            .map(field => {
                if (field.startsWith('gsx$')) {
                    return [
                        field.split('$')[1],
                        entry[field].$t
                    ]
                }
            })
            .filter(field => field)
            .reduce((field, item) => {
                field[item[0]] = item[1]
                return field
            }, {})
    })
}

async function getData() {
    const key = '1bx-X8xb1m26_4ik0pQ1KLhO1fOaEUqeiLAd-AEultWk'
    const res = await fetch(`https://spreadsheets.google.com/feeds/list/${key}/od6/public/values?alt=json`);
    const data = await res.json()
    return await parseData(data)
}

userStats = user => `
            <img src="${user.img}">
            <h1>${user.name}</h1>
            <p>hoursplayed: ${user.hoursplayed}</p>
            <p>gamesowned: ${user.gamesowned}</p>
            <p>profilecreated: ${user.profilecreated}</p>
            <img>image: ${user.image}</img>
`

getData().then(users => {
    document.querySelector('body').innerHTML = users.map(userStats).join('')
})
