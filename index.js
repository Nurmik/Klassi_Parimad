 

 /*
 1.ID
 2.Games owned
 3.Hours played
 4.Profile created
 */

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
{
name: 'Pinkie2', //char+
 gamesowned: '28', //int
 hoursplayed: '945', //float
 profilecreated: '2 years ago'
}
]

userStats = user => `
	<h1> ${user.name} </h1>
	<p> Games owned: ${user.gamesowned} </p>
	<p> Hours played: ${user.hoursplayed} </p>
	<p> Profile created: ${user.profilecreated} </p>

`

document.querySelector('body').innerHTML = users.map(userStats)
	