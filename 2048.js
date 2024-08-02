var board;
var score;
var rows = 4;
var cols = 4;

var change = false;

window.onload = () => {
	setGame();
}

const setGame = () => {
	board = [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
	];

	score = 0;

	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			let tile = document.createElement("div");
			tile.id = `${r}-${c}`;
			let num = board[r][c];
			updateTile(tile, num);
			document.getElementById("board").append(tile);
		}
	}

	setTwo();
	setTwo();
}

const hasEmptyTile = () => {
	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			if (board[r][c] === 0) {
				return true;
			}
		}
	}
	return false;
}

const setTwo = () => {
	if (!hasEmptyTile()) {
		return;
	}

	let found = false;
	while (!found) {
		let r = Math.floor(Math.random() * rows);
		let c = Math.floor(Math.random() * cols);
		if (board[r][c] === 0) {
			board[r][c] = 2;
			let tile = document.getElementById(`${r}-${c}`);
			tile.innerText = 2;
			tile.classList.add("tile2");
			found = true;
		}
	}
}

const updateTile = (tile, num) => {
	tile.innerText = "";
	tile.classList.value = ""; // overwrite any existing classes of tile

	tile.classList.add("tile");

	if (num > 0) {
		tile.innerText = num;
		if (num <= 4096) {
			tile.classList.add(`tile${num}`);
		} else {
			tile.classList.add("tile8192");
		}
	}
}

const filterZero = (row) => {
	return row.filter(num => num !== 0); // new array without 0s
}

const slide = (row) => {
	row = filterZero(row); // get rid of 0s
	for (let i = 0; i < row.length - 1; i++) {
		if (row[i] === row[i+1]) {
			row[i] *= 2;
			row[i+1] = 0;
			score += row[i];
		}
	}
	
	row = filterZero(row); // get rid of 0s again

	while (row.length < cols) {
		row.push(0);
	}

	return row;
}

const slideLeft = () => {
	for (let r = 0; r < rows; r++) {
		let row = board[r];
		let slided = slide(row);
		for (let i = 0; i < row.length; i++) {
			if (row[i] !== slided[i]) {
				change = true;
			}
		}
		board[r] = slided;

		for (let c = 0; c < cols; c++) {
			let tile = document.getElementById(`${r}-${c}`);
			let num = board[r][c];
			updateTile(tile, num);
		}
	}
}

const slideRight = () => {
	for (let r = 0; r < rows; r++) {
		let row = board[r];
		let slided = row.slice();
		slided.reverse();
		slided = slide(slided);
		slided.reverse();
		console.log(row, slided);
		for (let i = 0; i < row.length; i++) {
			if (row[i] !== slided[i]) {
				change = true;
			}
		}
		board[r] = slided;

		for (let c = 0; c < cols; c++) {
			let tile = document.getElementById(`${r}-${c}`);
			let num = board[r][c];
			updateTile(tile, num);
		}
	}
}

const slideUp = () => {
	for (let c = 0; c < cols; c++) {
		let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
		let slided = slide(row);
		for (let i = 0; i < row.length; i++) {
			if (row[i] !== slided[i]) {
				change = true;
			}
		}

		for (let r = 0; r < rows; r++) {
			board[r][c] = slided[r];
			let tile = document.getElementById(`${r}-${c}`);
			let num = board[r][c];
			updateTile(tile, num);
		}
	}
}

const slideDown = () => {
	for (let c = 0; c < cols; c++) {
		let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
		let slided = row.slice();
		slided.reverse();
		slided = slide(slided);
		slided.reverse();
		console.log(row, slided);
		for (let i = 0; i < rows; i++) {
			if (row[i] !== slided[i]) {
				change = true;
			}
		}

		for (let r = 0; r < rows; r++) {
			board[r][c] = slided[r];
			let tile = document.getElementById(`${r}-${c}`);
			let num = board[r][c];
			updateTile(tile, num);
		}
	}
}

document.addEventListener("keyup", (e) => {
	if (e.code === "ArrowLeft") {
		slideLeft();
		if (change) {
			setTwo();
		}
	} else if (e.code === "ArrowRight") {
		slideRight();
		if (change) {
			setTwo();
		}
	} else if (e.code === "ArrowUp") {
		slideUp();
		if (change) {
			setTwo();
		}
	} else if (e.code === "ArrowDown") {
		slideDown();
		if (change) {
			setTwo();
		}
	}
		console.log(change);
	document.getElementById("score").innerText = score;
	change = false;
});