async function getData() {
    const key = '1bx-X8xb1m26_4ik0pQ1KLhO1fOaEUqeiLAd-AEultWk'
    const res = await fetch(`https://spreadsheets.google.com/feeds/list/${key}/od6/public/values?alt=json`);
    const data = await res.json()
    return await parseData(data)
}

// Parse the Google Spreadsheet data into a usable form:
// an array of objects, also know as "collection"

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

// Get the users,
// sort them by Steam level,
// render using UserStats component,
// join them into a string,
// and add to the documents <body> tag

getData().then(users => {
    document.querySelector('body').innerHTML = users
        .sort((a, b) => b.steamlevel - a.steamlevel)
        .map(UserStats)
        .join('')
})

// Render the each user

UserStats = user => `
    <div class="UserStats">
        <div>
            <img src="${ user.image }">
        </div>
        <div>
            <h2>
                <span class="${ user.status == 1 ? 'online' : 'offline' }">
                &#9673
                </span>
                ${ user.name }
            </h2>
            ${ UserDetails(user) }
        </div>
    </div>
`

// Render the users detailed data

UserDetails = user => `
    <div class="UserDetails">
        <div>
            <div> Hours played:<b>${ user.hoursplayed }hr</b> </div>
            <div> Games owned:<b>${ user.gamesowned }</b> </div>
            <div> Account Value:<b>$${ user.accountvalue }</b> </div>
        </div>
        <div>
            <div> Profile Created:<b>${ user.profilecreated }</b> </div>
            <div> Steam level:<b>${ user.steamlevel }</b> </div>
            <div> Last online:<b>${ user.status == 1 ? 'now' : user.lastonline }</b> </div>
        </div>
    </div>
`
