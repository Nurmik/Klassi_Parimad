 
 /*
 1.ID
 2.Games owned
 3.Hours played
 4.Profile created
 */

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
    const res = await fetch(`https://docs.google.com/spreadsheets/d/1bx-X8xb1m26_4ik0pQ1KLhO1fOaEUqeiLAd-AEultWk/edit#gid=0`);
    const data = await res.json()
    return await parseData(data)
}

userStats = user => `
	<h1> ${user.name} </h1>
	<p> Games owned: ${user.gamesowned} </p>
	<p> Hours played: ${user.hoursplayed} </p>
	<p> Profile created: ${user.profilecreated} </p>
`
getData().then(users => {
    document.querySelector('body').innerHTML = users.map(userStats).join('')
})










/*
users = [
{
 name: 'Yeti', //char+
 gamesowned: '47', //int
 hoursplayed: '2332', //float
 profilecreated: '4 years ago'
},
{
name: 'Doggolord', //char+
 gamesowned: '1678', //int
 hoursplayed: '2829.8', //float
 profilecreated: '7 years ago'
},
{
name: 'Pinkie', //char+
 gamesowned: '28', //int
 hoursplayed: '945', //float
 profilecreated: '2 years ago'
},
]	