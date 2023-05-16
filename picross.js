var winStreak=0;
var winCheckFlag=1;

var hintAmt=0;
var puzzleHeight=10;
var puzzleWidth=10;
var gameBoard=[puzzleWidth];
var playerBoard=[puzzleWidth];

var rowLabels=[puzzleWidth];
var columnLabels=[puzzleHeight];
var helpBtn = document.getElementById("tut");
var startBtn = document.getElementById("start");
var startSetBtn = document.getElementById("startSet");
var hintBtn = document.getElementById("hint");
var loadBtn = document.getElementById("fstart");
var gameInProgress=0;

var piecePlace = new sound("./resources/piecePlace.mp3");
var gameStartSound = new sound("./resources/gameStart.wav");
var gameWinSound = new sound("./resources/gameWin.wav");

var puzzleName="";//NEEDS TO BE IMPLEMENTED

function sound(src)
{
	this.sound = document.createElement("audio");
	this.sound.src = src;
	this.sound.setAttribute("preload", "auto");
	this.sound.setAttribute("controls", "none");
	this.sound.style.display = "none";
	document.body.appendChild(this.sound);

	this.play = function () {
		this.sound.play();
	}

	this.stop = function () {
		this.sound.pause();
	}
}

	function tableCreate(gameHeight, gameWidth)
	{
		//console.log("GameSize: "+gameSize);
	  //body reference
	  var body = document.getElementsByTagName("body")[0];

	  // create elements <table> and a <tbody>
	  var tbl = document.createElement("table");
	  tbl.id=("game");
	  tbl.style.width  = "100px";
	  tbl.align = 'center';

		var creationCheck=document.getElementById("game");
		console.log(creationCheck);

	  if(creationCheck!=null)
	  {
	  	creationCheck.remove();
	  }

	  var tblBody = document.createElement("tbody");

	  var rowa = document.createElement("tr");
	  var de = document.createElement("td");

	  rowa.appendChild(de);

	  for(var k=0; k<gameWidth; k++)
	  {
		var header = document.createElement("th");
		header.scope="col";
		header.id="column"+(k+1);
	    rowa.appendChild(header);
	  }

	  tblBody.appendChild(rowa);

	  // cells creation
	  for (var j = 0; j < gameHeight; j++) {
	    // table row creation
	    var row = document.createElement("tr");
	    row.id="r"+(j+1);

	    var header = document.createElement("th");
	    header.scope="row";
	    header.id="row"+(j+1);
	    row.appendChild(header);

	    for (var i = 0; i < gameWidth; i++) {
	      // create element <td> and text node
	      //Make text node the contents of <td> element
	      // put <td> at end of the table row
	      var cell = document.createElement("td");
	      cell.id="row"+(j+1)+"column"+(i+1);
	      //var cellText = document.createTextNode("cell is row " + j + ", column " + i);

	      var input = document.createElement("input");
	      input.id="r"+(j+1)+"c"+(i+1);
	      input.type="button";
	      input.style="background: white; width: 65px; height: 65px; font-size:40px";
	      input.value="";
	      input.onmousedown=setValue;


	      cell.appendChild(input);
	      row.appendChild(cell);
	    }

	    //row added to end of table body


	    tblBody.appendChild(row);
	  }

	  // append the <tbody> inside the <table>
	  tbl.appendChild(tblBody);
	  // put <table> in the <body>
	  body.appendChild(tbl);
	  // tbl border attribute to
	  tbl.setAttribute("border", "2");

	  console.log(tbl);
	}

	function fillBoard(boardToFill)
	{
		for(var j=0; j<puzzleHeight; j++)
		{
			boardToFill[j]=new Array(puzzleWidth);
		}
	}

	function clearHTMLBoard()
	{
		for(var i=0; i<puzzleWidth; i++)
		{
			for(var j=0; j<puzzleHeight; j++)
			{
				var name="r"+(i+1)+"c"+(j+1);//Used for the grid ID names

				document.getElementById(name).value=""
				document.getElementById(name).style.background="white";
			}
		}
	}

	function updateGameBoard()
	{
		for(var i=0; i<puzzleHeight; i++)
		{
			for(var j=0; j<puzzleWidth; j++)
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
		for(var i=0; i<puzzleHeight; i++)
		{
			for(var j=0; j<puzzleWidth; j++)
			{
				if(gameBoard[i][j]!=playerBoard[i][j])
				{
					win=0;
				}
			}
		}

	if(win==1 && winCheckFlag==1)
	{
		gameWinSound.play();
		winStreak++;
		//totalWins++;
		document.getElementById("status").innerHTML="YOU WIN!\n Puzzles completed: "+winStreak;
		gameInProgress=0;
		winCheckFlag=0;
	}
	else
	{
	}
}

function setPuzzleSize()
{
	do
	{
		puzzleWidth=Math.floor(Math.random()*6)+5;
		puzzleHeight=Math.floor(Math.random()*6)+5;
	}
	while(puzzleWidth>10);
}

function createRandomPuzzle(difficulty)
{
	var fillCount=0;

	for(var i=0; i<puzzleHeight; i++)
	{
		for(var j=0; j<puzzleWidth; j++)
		{
			var rng=Math.floor(Math.random()*10)+1;//Increased by 1

			if(rng<=difficulty)
			{
				gameBoard[i][j]="O";
				fillCount++;
			}
			else
			{
				gameBoard[i][j]="X";
			}
		}
	}

	var lowRange=0.0;
	var highRange=0.0;

	switch(difficulty)
	{
		case 10: lowRange=.91;highRange=.97;break;
		case 9: lowRange=.84;highRange=.89;break;
		case 8: lowRange=.76;highRange=.80;break;
		case 7: lowRange=.68;highRange=.76;break;
		case 6: lowRange=.56;highRange=.61;break;
		case 5: lowRange=.48;highRange=.52;break;
		case 4: lowRange=.48;highRange=.52;break;
		case 3: lowRange=.42;highRange=.47;break;
		case 2: lowRange=.34;highRange=.40;break;
		case 1: lowRange=.29;highRange=.34;break;


		case '6': lowRange=.56;highRange=.61;break;
		case '5': lowRange=.48;highRange=.52;break;
		case '4': lowRange=.48;highRange=.52;break;
		case '3': lowRange=.42;highRange=.47;break;
		default: lowRange=.5;highRange=.5;break;
	}


	if((fillCount<(puzzleHeight*puzzleWidth*lowRange)  || fillCount>(puzzleHeight*puzzleWidth*highRange))&&(puzzleHeight>4)&&(puzzleWidth>4))
	{
		console.log("# of pieces: "+fillCount);
		createRandomPuzzle(document.getElementById("puzzleDifficulty").value);
	}

}

function fillHeaders()
	{
		var reverseBoard=[puzzleWidth];

		for(var j=0; j<puzzleWidth; j++)
		{
			reverseBoard[j]=new Array(puzzleHeight);
		}

		console.log(reverseBoard);

		for(var i=0; i<puzzleHeight; i++)
		{
			for(var j=0; j<puzzleWidth; j++)
			{
				reverseBoard[j][i]=gameBoard[i][j];
			}
		}

		for(var i=0; i<puzzleHeight; i++)
		{
			rowLabels[i]=checkData(gameBoard[i]);
		}

		for(var i=0; i<puzzleWidth; i++)
		{
			columnLabels[i]=checkData(reverseBoard[i]);
		}

		console.log("Row lables: "+rowLabels);
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

	function updateRows()
	{
		var globalRow="row"
		var startingRow=0;

		for(var o=0; o<puzzleHeight; o++)
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

		for(var o=0; o<puzzleWidth; o++)
		{
			startingColumn++;
			var comb=globalRow+startingColumn;
			document.getElementById(comb).innerHTML=columnLabels[o];
		}
	}


function setValue(toBeUpdated)
{
	//console.log("Var: " + toBeUpdated.target.id);
	var newToBeUpdated = toBeUpdated.target.id;//Only line that needed changing for the fix on 5/16
	//console.log(document.getElementById(newToBeUpdated));

	var cheatButton=false;
	var pos=newToBeUpdated.split("c");
	pos[0]=pos[0].replace("r"," ");

	pos[0]-=1;
	pos[1]-=1;

	if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent))//Used for mobile
	{
		if(document.getElementById(newToBeUpdated).value=="" && gameInProgress==1)
		{
			document.getElementById(newToBeUpdated).value="O";
			document.getElementById(newToBeUpdated).style.background="black";
		}
		else if(document.getElementById(newToBeUpdated).value=="O" && gameInProgress==1)
		{
			document.getElementById(newToBeUpdated).value="X";
			document.getElementById(newToBeUpdated).style.background="white";
		}
		else if(document.getElementById(newToBeUpdated).value=="X" && gameInProgress==1)
		{
			document.getElementById(newToBeUpdated).value="";
			document.getElementById(newToBeUpdated).style.background="white";
		}
	}
	else
	{
		if(toBeUpdated.button==0 && gameInProgress==1)
		{
			if(document.getElementById(newToBeUpdated).value=="" && gameInProgress==1)
			{
				document.getElementById(newToBeUpdated).value="O";
				document.getElementById(newToBeUpdated).style.background="black";
			}
			else
			{
				document.getElementById(newToBeUpdated).value="";
				document.getElementById(newToBeUpdated).style.background="white";
			}
		}
		else if(toBeUpdated.button==1 && gameInProgress==1 && cheatButton)
		{
			if(hintAmt>0)
			{
				if(gameBoard[pos[0]][pos[1]]=="O" && gameInProgress==1)
				{
					document.getElementById(newToBeUpdated).value="O";
					document.getElementById(newToBeUpdated).style.background="black";
				}
				else
				{
					document.getElementById(newToBeUpdated).value="X";
					document.getElementById(newToBeUpdated).style.background="white";
				}
				hintAmt--;
				hintBtn.value=hintAmt+" hints left!";
				document.getElementById("status").innerHTML=hintAmt+" hints left!";
			}
		}
		else if(toBeUpdated.button==2 && gameInProgress==1)
		{
			if(document.getElementById(newToBeUpdated).value=="" && gameInProgress==1)
			{
				document.getElementById(newToBeUpdated).value="X";
				document.getElementById(newToBeUpdated).style.background="white";
			}
			else
			{
				document.getElementById(newToBeUpdated).value="";
				document.getElementById(newToBeUpdated).style.background="white";
			}
		}
	}

	piecePlace.play();
	updateGameBoard();
	checkForWin();
}

function giveHints(difficulty)
{
	console.log("Difficulty hint: "+difficulty);
	hintAmt=0;
	hintBtn.disabled=false;
	//hintAmt=Math.floor((puzzleSize-5)+(6-document.getElementById("puzzleDifficulty").value))+1;

	switch(difficulty)
	{
		case 10: hintAmt+=0.0;break;
		case 9: hintAmt+=0.5;break;
		case 8: hintAmt+=0.75;break;
		case 7: hintAmt+=1.0;break;
		case 6: hintAmt+=1.5;break;
		case 5: hintAmt+=2.25;break;
		case 4: hintAmt+=2.5;break;
		case 3: hintAmt+=3.5;break;
		case 2: hintAmt+=4.5;break;
		case 1: hintAmt+=6.5;break;


		case '6': hintAmt+=1.5;break;
		case '5': hintAmt+=2.25;break;
		case '4': hintAmt+=2.5;break;
		case '3': hintAmt+=3.5;break;
		default: hintAmt+=999;break;
	}

	hintAmt+=(puzzleWidth*0.5);

	hintAmt=Math.floor(hintAmt);
	hintBtn.value=hintAmt+" hints left!";
}

startBtn.onclick = function startGame()
{

	puzzleHeight=10;
	puzzleWidth=10;

	//createGameBoard(puzzleSize);

	winCheckFlag=1;

	var difficulty=Math.floor(Math.random()*10)+1;

	setPuzzleSize();

	tableCreate(puzzleHeight, puzzleWidth);

	giveHints(difficulty);
	gameStartSound.play();
	fillBoard(gameBoard);

	createRandomPuzzle(difficulty);
	fillHeaders();
	document.getElementById("game").style.visibility="visible";
	document.getElementById("status").innerHTML="Puzzle: Random "+puzzleHeight+"x"+puzzleWidth;
	//document.getElementById("status").innerHTML=hintAmt+" hints left!";
	console.log(gameBoard);
	fillBoard(playerBoard);
	gameInProgress=1;
}

startSetBtn.onclick = function startGame()
{
	puzzleHeight=document.getElementById("puzzleHeight").value;
	puzzleWidth=document.getElementById("puzzleWidth").value;
	tableCreate(puzzleHeight, puzzleWidth);
	//createGameBoard(puzzleSize);

	winCheckFlag=1;

	giveHints(document.getElementById("puzzleDifficulty").value);

	gameStartSound.play();
	fillBoard(gameBoard);

	createRandomPuzzle(document.getElementById("puzzleDifficulty").value);
	fillHeaders();
	document.getElementById("game").style.visibility="visible";
	document.getElementById("status").innerHTML="Puzzle: Random "+puzzleHeight+"x"+puzzleWidth;
	console.log(gameBoard);
	fillBoard(playerBoard);
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
			rowPos=Math.floor(Math.random()*puzzleHeight);
			colPos=Math.floor(Math.random()*puzzleWidth);
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
	//console.log(totalWins);
	alert("GOAL\nTo use the hints on the rows and columns to fill in the puzzle\n\nCONTROLS\nLeft click: Fill in spot\nRight click: Mark spot as incorrect\nHint: Correctly fills in one correct spot, limited use");
}