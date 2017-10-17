var arr = [1,2,354,34, -89, 45, 0]

for(var i = 0; i < 3; i++) {
	var randomIndex = Math.floor(Math.random()*arr.length)
	console.log(arr[randomIndex])
}