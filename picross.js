//const fs = require('fs');

var hintAmt=0;
var puzzleSize=10;
var gameBoard=[puzzleSize];
var playerBoard=[puzzleSize];

var rowLabels=[puzzleSize];
var columnLabels=[puzzleSize];
var helpBtn = document.getElementById("tut");
var startBtn = document.getElementById("start");
var hintBtn = document.getElementById("hint");
var loadBtn = document.getElementById("fstart");
var gameInProgress=0;

var puzzleName="";//NEEDS TO BE IMPLEMENTED

function fillBoard(boardToFill)
{
	for(var j=0; j<puzzleSize; j++)
	{
		boardToFill[j]=new Array(puzzleSize);
	}
}

function clearHTMLBoard()
{
	for(var i=0; i<puzzleSize; i++)
	{
		for(var j=0; j<puzzleSize; j++)
		{
			var name="r"+(i+1)+"c"+(j+1);//Used for the grid ID names

			document.getElementById(name).value=""
			document.getElementById(name).style.background="white";
		}
	}
}

function updateGameBoard()
{
	for(var i=0; i<puzzleSize; i++)
	{
		for(var j=0; j<puzzleSize; j++)
		{
			var name="r"+(i+1)+"c"+(j+1);//Used for the grid ID names

			if(document.getElementById(name).value=="")
			{
				playerBoard[i][j]="X";
			}
			else
			{
				playerBoard[i][j]=document.getElementById(name).value//Gets values in game board
			}

		}
	}
}

function checkForWin()
{
	var win=1;
	for(var i=0; i<puzzleSize; i++)
	{
		for(var j=0; j<puzzleSize; j++)
		{
			if(gameBoard[i][j]!=playerBoard[i][j])//Needs to be rewritten to account for explosives
			{
				win=0;
			}
		}
	}

	if(win==1)
	{
		document.getElementById("status").innerHTML="YOU WIN!";
		gameInProgress=0;
	}
	else
	{
	}
}
function setPuzzleSize()
{
	do
	{
		puzzleSize=Math.floor(Math.random()*6)+5;
	}
	while(puzzleSize>10);
}

function createRandomPuzzle()
{
	for(var i=0; i<puzzleSize; i++)
	{
		for(var j=0; j<puzzleSize; j++)
		{
			var rng=Math.floor(Math.random()*10);

			if(rng%2==0)
			{
				gameBoard[i][j]="O";
			}
			else
			{
				gameBoard[i][j]="X";
			}
		}
	}

	setBoardVisibility();
}

function setBoardVisibility()
{
	for(var i=0; i<10; i++)
	{
		for(var j=0; j<10; j++)
		{
			var name="r"+(i+1)+"c"+(j+1);//Used for the grid ID names
			var rowcol="row"+(i+1)+"column"+(j+1);//Used for the grid ID names
			var row="r"+(i+1);
			var col="column"+(i+1);

			//console.log(rowcol);

			if(i<puzzleSize && j<puzzleSize)
			{
				document.getElementById(name).style.visibility="visible";
				//document.getElementById(name).style.display="inline";

				document.getElementById(rowcol).style.visibility="visible";
				//document.getElementById(rowcol).style.display="inline";

			}
			else
			{
				document.getElementById(name).style.visibility="hidden";
				//document.getElementById(name).style.display="none";

				document.getElementById(rowcol).style.visibility="hidden";
				//document.getElementById(rowcol).style.display="none";

				document.getElementById(row).style.visibility="hidden";
				document.getElementById(col).style.visibility="hidden";

			}

			if(i<puzzleSize)
			{
				document.getElementById(row).style.visibility="visible";
				document.getElementById(col).style.visibility="visible";
			}
		}
	}

	clearHeaders();
}

function createPuzzleFromFile()
{
	document.getElementById('my_file').click();
	var fileData=document.getElementById('my_file');

	const reader = new FileReader()
	console.log(fileData);

	reader.onload=fileData.textContent;
	var textData=reader.onload;

	console.log(textData);
}

function fillHeaders()
{
	var reverseBoard=[puzzleSize];
	fillBoard(reverseBoard);

	for(var i=0; i<puzzleSize; i++)
	{
		for(var j=0; j<puzzleSize; j++)
		{
			reverseBoard[j][i]=gameBoard[i][j];
		}
	}

	for(var i=0; i<puzzleSize; i++)
	{
		rowLabels[i]=checkData(gameBoard[i]);
		columnLabels[i]=checkData(reverseBoard[i]);
	}

	updateRows();
	updateColumns();
}

function checkData(check)
{
	var currentString="";
	var currentCount=0;
	var zeroCheck=1;//Used in the event a row has no spots that should be filled

	for(var i=0; i<check.length; i++)
	{
		if(i==check.length-1 && check[i]=="O")
		{
			zeroCheck=0;
			currentCount++;
			currentString+=currentCount;
			currentCount=0;
		}
		else if(check[i]=="O")
		{
			zeroCheck=0;
			currentCount++;
		}
		else
		{
			if(currentCount!=0)
			{
				zeroCheck=0;
				currentString+=currentCount;
				currentString+=" ";
				currentCount=0;
			}
		}
	}

	if(zeroCheck==1)
	{
		currentString="0";
	}

	return currentString;
}

function clearHeaders()
{
	for(var o=0; o<puzzleSize; o++)
	{
		document.getElementById("row"+(o+1)).innerHTML="";
		document.getElementById("column"+(o+1)).innerHTML="";
	}
}

function updateRows()
{
	var globalRow="row"
	var startingRow=0;

	for(var o=0; o<puzzleSize; o++)
	{
		startingRow++;
		var comb=globalRow+startingRow;
		document.getElementById(comb).innerHTML=rowLabels[o];
	}
}

function updateColumns()
{
	var globalRow="column"
	var startingColumn=0;

	for(var o=0; o<puzzleSize; o++)
	{
		startingColumn++;
		var comb=globalRow+startingColumn;
		document.getElementById(comb).innerHTML=columnLabels[o];
	}
}

function setValue(toBeUpdated, event)
{
	if(event.button==0 && gameInProgress==1)
	{
		if(document.getElementById(toBeUpdated).value=="" && gameInProgress==1)
		{
			document.getElementById(toBeUpdated).value="O";
			document.getElementById(toBeUpdated).style.background="black";
		}
		else
		{
			document.getElementById(toBeUpdated).value="";
			document.getElementById(toBeUpdated).style.background="white";
		}
	}
	else if(event.button==2 && gameInProgress==1)
	{
		if(document.getElementById(toBeUpdated).value=="" && gameInProgress==1)
		{
			document.getElementById(toBeUpdated).value="X";
			document.getElementById(toBeUpdated).style.background="white";
		}
		else
		{
			document.getElementById(toBeUpdated).value="";
			document.getElementById(toBeUpdated).style.background="white";
		}
	}

	updateGameBoard();
	checkForWin();
}


startBtn.onclick = function startGame()
{
	puzzleSize=10;
	hintBtn.disabled=false;

	setPuzzleSize();//Uncomment for different sizes
	hintAmt=Math.floor(puzzleSize/3)+2;
	hintBtn.value=hintAmt+" hints left!";
	fillBoard(gameBoard);

	createRandomPuzzle();
	fillHeaders();
	document.getElementById("game").style.visibility="visible";
	document.getElementById("status").innerHTML="Puzzle: Random";
	console.log(gameBoard);
	fillBoard(playerBoard);
	clearHTMLBoard();
	gameInProgress=1;
}

loadBtn.onclick = function startGame()
{

	createPuzzleFromFile();
	fillBoard(gameBoard);



	fillHeaders();
	document.getElementById("game").style.visibility="visible";
	document.getElementById("status").innerHTML="Puzzle: "+puzzleName;
	console.log(gameBoard);
	fillBoard(playerBoard);
	clearHTMLBoard();
	gameInProgress=1;
}

hintBtn.onclick = function startGame()
{
	if(gameInProgress==1 && hintAmt>0)
	{
		var rowPos=0;
		var colPos=0;
		var nameUpdate="";

		do
		{
			rowPos=Math.floor(Math.random()*puzzleSize);
			colPos=Math.floor(Math.random()*puzzleSize);
			nameUpdate="r"+(rowPos+1)+"c"+(colPos+1);
		}
		while(document.getElementById(nameUpdate).value==gameBoard[rowPos][colPos]);

		if(gameBoard[rowPos][colPos]=="O")
		{
			document.getElementById(nameUpdate).value="O";
			document.getElementById(nameUpdate).style.background="black";
		}
		else//is X
		{
			document.getElementById(nameUpdate).value="X";
			document.getElementById(nameUpdate).style.background="white";
		}

		hintAmt--;
		hintBtn.value=hintAmt+" hints left!";

		if(hintAmt==0)
		{
			hintBtn.disabled=true;
			//Update code to grey out button and make unclickable
		}

		updateGameBoard();
		checkForWin();
	}
}

helpBtn.onclick = function displayInstructions()
{
	alert("GOAL\nTo use the hints on the rows and columns to fill in the puzzle\n\nCONTROLS\nLeft click: Fill in spot\nRight click: Mark spot as incorrect\nHint: Correctly fills in one correct spot, limited use");
}