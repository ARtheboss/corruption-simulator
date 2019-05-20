var title = document.getElementById('title');

var quiz = document.getElementById('quiz');
var question = document.getElementById('question');
var choice1 = document.getElementById('choice1');
var choice2 = document.getElementById('choice2');
var choice3 = document.getElementById('choice3');
var input = document.getElementById('input');
var getting = document.getElementById('getting');

var info = document.getElementById('info');
var infoText = document.getElementById('text');

var moneyInfo = document.getElementById('money');
var trustInfo = document.getElementById('trust');
var investigationInfo = document.getElementById('investigation');

quiz.style.display = 'none';
info.style.display = 'none';

function giveInfo(s){
	title.style.opacity = 0;
	quiz.style.display = 'none';
	info.style.display = 'block';
	infoText.innerHTML = s;
}

function giveQuestion(q,c = false){
	title.style.opacity = 0;
	info.style.display = 'none';
	quiz.style.display = 'block';
	question.innerHTML = q;
	if(c == false){
		choice1.style.display = 'none';
		choice2.style.display = 'none';
		choice3.style.display = 'none';
		input.style.display = 'block';
	}else{
		input.style.display = 'none';
		choice1.style.display = 'block';
		choice2.style.display = 'block';
		choice3.style.display = 'none';
		choice1.innerHTML = c[0];
		choice2.innerHTML = c[1];
		if(c.length == 3){
			choice3.style.display = 'block';
			choice3.innerHTML = c[2];
		}
	}
}

function showTitle(q,c = false){
	var op = 0.015;  // initial opacity
    title.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        title.style.opacity = op;
        title.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.015;
    }, 10);
	info.style.display = 'none';
	quiz.style.display = 'none';
}

function getMoneyString(s){
	s = s.toString();
	var r = ""
	for(var i = s.length-1; i >= 0; i-=3){
		var c = s.substring(i-2,i+1);
		if(c.length == 3 && i > 2){
			r = "," + c + r;
		}else{
			r = c + r;
		}
	}
	return "$" + r;
}

function animateBg(i) {
    var a = 100;
    var b = false;
    var int = setInterval(function() {
    	if(b){
    		a++;
    	}else{
    		a -= 1;
    	}
        document.body.style.backgroundColor = 'hsl(0, 100%, '+a+'%)';
        if(a == i){
        	clearInterval(int);
        }
        if(a == 0){
        	b = true;
        }
    }, 5);
}

var on = 0;
var qanswered = false;
var results = {};

var money = 0;
var peopleTrust = 5;
var oliAngry = 1;
var researchLevel = 0;
var offshoreLevel = 0;
var suspicious = 0;
var investigation = 0;
var liability = 0;
var impeachment = false;

var complaintActionMult = 1;

var healthcare = 0;

var salary = 0;

var name = "Sudip Bijoy Dutta";

function selected(n){
	results[on] = n;
	run();
}

function engagedInCorruption(){
	return results[3] == 1 || results[6] == 2 || results[9] == 1 || results[11] == 1 || results[17] == 1 || results[21] == 2
}

function isSudip(s){
	return (s.toLowerCase() == "sudip" || s.toLowerCase() == "sudip dutta" || s.toLowerCase() == "dutta");
}


function run(){
	if(on == 0){
		giveQuestion("What is your name?")
		on = 1;
	}else if(on == 1){
		name = getting.value;
		if(isSudip(name)){
			giveInfo("<b style='color:white;'>Welcome to Graftlandia, "+name+"!</b><br><br> Recently, you decided that running an aluminium foil company wasn't good enough, so you run for President, and you won!<br><br>Congratulations!<br><br> You know you will go down as one of the all-time great Presidents. But you can only serve two terms, so your goal right now is to earn as much money as possible to build on your Wrapper Tycoon before your inevitable retirement.<br><br>The method of earning said money is up to you...");
			money = 300000000;
		}else{
			giveInfo("<b style='color:white;'>Welcome to Graftlandia, "+name+"!</b><br><br> You and your highly successful political party have just won the recent elections.<br><br>Congratulations!<br><br> You know you will go down as one of the all-time great Presidents. But you can only serve two terms, so your goal right now is to earn as much money as possible before your inevitable retirement.<br><br>The method of earning said money is up to you...");
		}
		on = 2;
	}else if(on == 2){//Q0
		giveQuestion("Your friend asks if you want to start an offshore company, slowly taking money out of your defence budget in fake but secure transactions. This is low risk unless someone is looking for you. (You will earn money periodically)",['Yes','No','No and Report']);
		on = 3;
	}else if(on == 3){
		if(results[on] == 3){
			peopleTrust += 1;
			giveInfo("You have gained more trust from the people, but have made some enemies in very powerful places. Beware! You also won't earn easy money.");
			oliAngry = 2;
		}else if(results[on] == 2){
			giveInfo("Your friend understands, but you are going to lose out on good money now.");
		}else{
			peopleTrust -= 0.5 * oliAngry * complaintActionMult;
			offshoreLevel++;
			giveInfo("You will earn money periodically.");
		}
		on = 4;
	}else if(on == 4){
		giveInfo("Offshore companies are companies that headquartered in other countries that are secretly owned by leaders. The leaders make transactions of money into these companies so that it seem like they are legitimate expenditures. This method makes it quite easy to steal millions from a country's budget.")
		on = 5;
	}else if(on == 5){//Q1
		giveQuestion("You just received a confidential report on a corrupt member of parliament by an investigator. Nobody else knows that this report exists. Now the decision is up to you.",["Put the accused to justice","Blackmail the accused for money"])
		on = 6;
	}else if(on == 6){
		if(results[on] == 2){
			peopleTrust -= 0.5 * oliAngry * complaintActionMult;
			money += 20000000;
			giveInfo("A dangerous decision, but they will have to pay up if they value their career.");
		}else{
			peopleTrust += 1;
			giveInfo("The people are happy that you are doing the right thing for them, but was that the right choice for you?");
		}
		on = 7;
	}else if(on == 7){
		giveInfo("Failure to take action about known problems is as big a problem as the corruption itself. If nobody takes action and just tolerates corruption, nothing will improve. For example, Russia is a country with a high tolerance of corruption. They also have high rates of corruption, for such a powerful country. Coincidence?");
		on = 8;
	}else if(on == 8){
		giveQuestion("An international supermarket named Fencemart has recently been competing with a couple others for a prime spot of land in the Graftlandia capital city. They offer you a bit of money as a 'gift', but you know what it really means.",['Accept','Decline']);
		on = 9;
	}else if(on == 9){//Q2
		if(results[on] == 1){
			peopleTrust -= 0.5 * oliAngry * complaintActionMult;
			money += 50000000;
			giveInfo("The company will stay quiet about this incident for their own sake, and you just made good money.");
		}else{
			giveInfo("The company expects you to not tell anyone, or there will be repercussions. One of the repercussions have already occured. You missed out on making an easy $20 million.");
		}
		on = 9.5;
	}else if(on == 9.5){
		giveInfo("Companies resorting to bribes results in disadvantages to both others and the company itself. If they go through on a bribe, it means that they may not be meeting one of the standards for acquiring land, which can potentially be dangerous. It also affects other smaller companies, who cannot afford to give bribes. Finally, it also affects the company itself, because the bribe will be an expense that will require more expensive products to overcome.")
		on = 9.7;
	}else if(on == 9.7){
		if(money < 2000000){
			giveInfo("Do you want to earn money or not?")
		}else if(money < 130000000){
			giveInfo("You could do a better job for setting up your retirement...")
		}else{
			giveInfo("Keep it up! At this rate your old age will be one of pure luxury!")
		}
		on = 10;
	}else if(on == 10){
		if(results[3] == 1){
			giveQuestion("Your redirecting of funds from the defense budget is being noticed, as the defense budget is falling short in some areas where it shouldn't be. It's up to you now. Do you want to continue redirecting funds?",["Yes","No"]);
			on = 11;
		}else if(results[3] == 2){
			giveQuestion("Your friend has given you another offer for making an offshore company. It's good, easy money. Why wouldn't you agree?",["Start offshore company","Turn down again"])
			on = 11;
		}else{
			results[11] = -1;
			on = 12;
			run();
		}
	}else if(on == 11){//Q3
		if(results[3] == 1){
			if(results[11] == 1){
				peopleTrust -= 2 * oliAngry * complaintActionMult;
				giveInfo("The population knows that something fishy is going on, they may trace it to you if your bank friend didn't do a good job.");
			}else{
				offshoreLevel -= 1;
				giveInfo("You won't earn money anymore, but your bank friend burned all traces.");
			}
		}else{
			if(results[11] == 1){
				peopleTrust -= 0.5 * oliAngry * complaintActionMult;
				giveInfo("Good choice. You will earn money periodically.");
				offshoreLevel += 1;
			}else{
				giveInfo("Your friend has cut all contact with you. You lost a friend, as well as millions of dollars.");
			}
		}
		on = 12;
	}else if(on == 12){
		if(peopleTrust < 5){
			giveQuestion("Your advisors have recommended a press conference about potential corruption in the government. What do you want to say to the media?",["Promise to decrease corruption","Deny corruption","Confess"]);
			on = 13;
		}else{
			on = 14;
			liability = 100000;
			run();
			results[13] = -1;
		}
	}else if(on == 13){
		if(results[13] == 3){
			giveInfo("Bad decision. Your impeachment proceedings have started.");
			impeachment = true;
			on = 50;
			liability = 100000;
		}else if(results[13] == 2){
			giveInfo("A solid move, only problem is that this makes everyone a bit more suspicious.");
			peopleTrust -= 1 * oliAngry * complaintActionMult;
			on = 14;
			liability = 100000;
		}else{
			giveInfo("A promise granted means more liability. You have a job on your hands.");
			peopleTrust += 1;
			liability = peopleTrust + 3;
			on = 14;
		}
	}else if(on == 14){
		giveQuestion("Now you have a decision to make. How should your officials handle corruption complaints?",["Take Action","Ignore (-$25,000,000 in bribes)","Shut down complaint acceptance"]);
		on = 15;
	}else if(on == 15){
		if(results[15]==1){
			complaintActionMult = 3;
			peopleTrust += 0.5;
			giveInfo("The people trust you more, but now your corruption will be noticed much more. Even the smallest mistake can ruin your career.");
		}else if(results[15] == 2){
			peopleTrust -= 0.5 * oliAngry * complaintActionMult;
			money -= 25000000;
			giveInfo("That cost you quite a bit of money, but it was worth it. At least now you can continue doing what you do with the same amount of consequence.");
		}else{
			peopleTrust -= 5 * oliAngry * complaintActionMult;
			giveInfo("The people were not happy with that decision at all. You saved $25 million, but you may have jepordized your career in the process.");
		}
		on = 16;
	}else if(on == 16){
		giveQuestion("A friend of yours suggested that you should secretly buy shares in local businesses, and then use your influence to help them grow, earning money in the process. Do you want to do this?",["Yes","No"])
		on = 17;
	}else if(on == 17){
		if(results[17] == 1){
			offshoreLevel += 0.5;
			peopleTrust -= 0.25 * oliAngry * complaintActionMult;
			giveInfo("You will earn money periodically.");
		}else{
			giveInfo("A missed opportunity to make some easy money...")
		}
		on = 18;
	}else if(on == 18){
		giveQuestion("A billionare named Kai Rupt that lives in your country recently approached you, offering a large bribe if you allow him to avoid taxation.",["Yes","No"]);
		on = 19;
	}else if(on == 19){
		if(results[19] == 1){
			money += 20000000;
			peopleTrust -= 0.25 * oliAngry * complaintActionMult;
			giveInfo("A good sum of money, for something that didn't cost you anything.");
		}else{
			giveInfo("Kai Rupt is not happy with how things turned out.");
			oliAngry += 0.5;
		}
		on = 20;
	}else if(on == 20){
		if(peopleTrust < 6){
			giveQuestion("Covering up corruption is costing you more money. How do you want to provide this money?",["Out of pocket","Out of healthcare budget","Confess"]);
			on = 21;
		}else{
			giveInfo("You could probably do a better job of earning money...");
			on = 22;
		}
	}else if(on == 21){
		if(results[21] == 1){
			money -= 50000000;
			giveInfo("Probably the safest option, but also the most expensive...");
			on = 22;
		}else if(results[21] == 2){
			peopleTrust -= 2 * oliAngry * complaintActionMult;
			giveInfo("A dangerous decision, but the cheapest for you. Good work.");
			on = 22;
		}else{
			giveInfo("Bad decision. Your impeachment proceedings have started.");
			impeachment = true;
			on = 50;
		}
	}else if(on == 22){
		if(liability!=100000){
			giveInfo("The day of reckoning has arrived. A couple months ago, you promised to decrease corruption. Your verdict is that...");
			on = 23;
		}else{
			on = 24;
			run();
		}
	}else if(on == 23){
		if(peopleTrust >= liability){
			peopleTrust += 1 * oliAngry * complaintActionMult;
			giveInfo("You passed! The people are gonna love this!");
			suspicious = 0;
		}else if(peopleTrust > liability - 3){
			peopleTrust -= 0.5 * oliAngry * complaintActionMult;
			giveInfo("...you decreased corruption a bit, but not enough.");
		}else{
			peopleTrust -= 2 * oliAngry * complaintActionMult;
			giveInfo("...that you really don't live upto your word, do you?");
		}
		on = 24;
	}else if(on == 24){
		if(peopleTrust < 6){
			giveQuestion("People are still accusing you of corruption. How would you like to respond?",["Confess","Deny"])
			on = 25;
		}else{
			on = 26;
			run();
		}
	}else if(on == 25){
		if(results[25] == 1){
			giveInfo("Bad decision. Your impeachment proceedings have started.");
			impeachment = true;
			on = 50;
		}else{
			peopleTrust -= 0.5 * oliAngry * complaintActionMult;
			giveInfo("The best choice available. But not necessarily a good one.");
			on = 26;
		}
	}else if(on == 26){
		giveQuestion("A member of one of the biggest organized crime units in Graflandia discretely approaches you (so there is no evidence that it is actually him). He is offering you a large sum of money if you work with him. What do you want to do?",["Agree to the money","Decline"]);
		on = 26.1;
	}else if(on == 26.1){
		if(results[on] == 1){
			money += 80000000;
			peopleTrust -= 0.5 * oliAngry * complaintActionMult;
			giveInfo("That's a lot of money you earned right there.");
		}else{
			giveInfo("Be careful. You might have made him angry...");
		}
		on = 26.9;
	}else if(on == 26.9){
		if(engagedInCorruption()){
			giveQuestion("Your term in nearing an end. What do you want to do about your corruption status?",["Cover up (expensive)","Ignore","Confess"]);
			on = 27;
		}else{
			giveQuestion("Your term in nearing an end. How do you want to give the people a farewell?",["Emotional speech","Motorcade across capital city"]);
			on = 27;
		}
	}else if(on == 27){
		if(engagedInCorruption()){
			if(results[27] == 1){
				money -= 20000000 * (5-peopleTrust);
				investigation /= 2;
				giveInfo("An expensive decision, but definitely safer.");
			}else if(results[27] == 2){
				peopleTrust -= 0.5 * oliAngry * complaintActionMult;
				giveInfo("You're very courageous. Foolishly courageous.");
			}else{
				giveInfo("Bad decision. Your impeachment proceedings have started.");
				impeachment = true;
				on = 50;
			}
		}else{
			if(results[27] == 1){
				giveInfo("The viewers loved your speech, and they feel much closer to you! You're trending on many social media platforms!");
				peopleTrust += 0.5;
			}else if(results[27] == 2){
				giveInfo("Your motorcade wowed many of your citizens. However, some people still don't feel a connection to you.");
			}
		}
		on = 28;
	}else if(on == 28){
		giveQuestion("As one of your final acts, what would you want to do to corruption laws that exist in Graftlandia today?",["Stricten","Don't change"]);
		on = 29;
	}else if(on == 29){
		if(results[29] == 1){
			if(peopleTrust < 7){
				peopleTrust -= 0.5;
				giveInfo("People are a bit suspicious that you left it so late, but at least they will now see some change in the future.");
			}else{
				giveInfo("The people see you as the ideal leader in Graftlandia's fight against corruption.");
			}
		}else{
			giveInfo("Leave it to the next leader to decide. Not a bad choice.");
		}
		on = 30;
	}else if(on == 30){
		if(!engagedInCorruption()){
			giveInfo("You made the term! The people absolutely loved you as a leader!");
		}else{
			if(money > 200000000){
				giveInfo("Congratulations! You survived without your corruption being discovered. You made a total of "+ getMoneyString(money) +"! Your retirement is set! Three stars!");
			}else{
				giveInfo("Congratulations! You survived without your corruption being discovered. You made a total of "+ getMoneyString(money) +"! You could have made some more money, but not bad a bad effort. I'll give you two stars for your effort.");
			}
		}
		on = 31;
	}else if(on == 31){
		if(!engagedInCorruption()){
			giveInfo(name+" will go down in history as one of the first leaders that made a strong stand against corruption in Graftlandia. But how did your behavior affect your country?");
		}else{
			giveInfo("But all this wealth you accumalated, that costed you nothing, what did it cost your country?");
		}
		on = 51;
	}else if(on == 50){
		giveInfo("You foolishly revealed your corruption to the country. But even though it is now out in the open, it had many consequences on your country.")
		on = 51;
	}else if(on == 51){
		giveInfo("You made you choices as a President, and in the next phase of this game you will find out what the consequences of your actions are by becoming a regular member of the population.");
		document.getElementById('nextBut').innerHTML = "Corruption Simulator: Part 2";
		on = 52;
	}

	else if(on == 52){
		document.getElementById('nextBut').innerHTML = "Next";
		animateBg(360);
		on = 100;
		run();
	}




	else if(on == 100){
		document.getElementById('popstat').style.display = "none";
		document.getElementById('invstat').style.display = "none";
		if(isSudip(name)){
			money = 1;
			giveInfo("Congratulations, "+name+"! You just graduated from high school in Banglore! You had never thought this day would come, and now it has. With $1 in your pocket, you will leave the shelter of your home and move to Mumbai!<br><br>In other news, the term of President "+name+" ended (who weirdly happens to have the same name as you). Now, onto life. Let's see if you will be able to become the Wrapper Tycoon...");
		}else{
			money = 2000;
			giveInfo("Congratulations, "+name+"! You just graduated from high school! You had never thought this day would come, and now it has. With $2,000 in your pocket, you will leave the shelter of your home and go into the working world!<br><br>In other news, the term of ex-President "+name+" ended (who weirdly happens to have the same name as you). Now, onto life...");
		}
		on = 101;
	}else if(on == 101){
		if(results[9] == 1){
			giveQuestion("Finding a job might be a bit difficult, considering that the supermarket giant Fencemart recently fired about half of their staff, and nobody knows why. You now have more competition in your job search. Also, after the rule of President "+name+", there have been few foreign companies coming into Graftlandia. What do you want to do?",["Wait some time before applying","Apply for some jobs"]);
		}else{
			giveQuestion("Your first step will be to decide what to do with your job situation.",["Wait some time before applying","Apply for some jobs"]);
		}
		on = 102;
	}else if(on == 102){
		if(results[9] == 1){
			if(results[on] == 1){
				giveInfo("Not like you would have found a job anyway...")
			}else{
				giveInfo("Futile effort, but you gotta do what you gotta do...")
			}
		}else{
			if(results[on] == 1){
				giveInfo("You will be racking up losses every week.")
			}else{
				giveInfo("Let's see what you get.")
			}
		}
		on = 102.5;
	}else if(on == 102.5){
		giveInfo("According to Olivia Durden, a businesses expert, companies need to raise prices to neutralize the costs of their corruption. This means that less people buy their products, and the company goes into loss. The fictional Fencemart is an example of such a company that had to fire half of their staff to cut costs and get back on track. Not to mention the massive PR problems if their corruption gets discovered.");
		on = 103;
	}else if(on == 103){
		if(engagedInCorruption()){
			giveQuestion("Your driving license recently elapsed, and although you can't yet afford a car, you want to get it renewed so that you can drive your parent's car. When you go to the office, the man working there says it will take at least 5 months, but you can get it within a week if you pay him a small fee...",["Pay the fee (-$200)","Wait 5 months"]);
			on = 104;
		}else{
			giveQuestion("Your driving license recently elapsed, and although you can't yet afford a car, you still want to drive your parent's car.",["Renew license","Wait until you get a car"]);
			on = 104.5;
		}
	}else if(on == 104){
		if(results[104] == 1){
			money -= 200;
			giveInfo("You got your driving license, but it cost you a lot.");
		}else{
			giveInfo("That's a long time...");
		}
		on = 105;
	}else if(on == 104.5){
		giveInfo("Fair decision");
		on = 109;
	}else if(on == 105){
		giveInfo("Put yourself in the perspective of the government officer. He can earn some quick cash, and since the leaders are loose on corruption he won't face any consequences. Why wouldn't he ask for a bribe?");
		on = 106;
	}else if(on == 106){
		giveQuestion("You return home and realized that the man that asked for a bribe should be put to justice. If you don't take action against corruption, it will just grow and ruin your life even more, right?",["Report the incident","Stay quiet"]);
		on = 107;
	}else if(on == 107){
		if(results[107] == 1){
			if(results[15] == 2){
				giveInfo("You don't know about this, but the government anti-corruption organizations were actually paid off by President "+name+" to ignore the complaints. You reporting the incident was sort of useless.");
			}else if(results[15] == 3){
				giveInfo("Too bad for you, President "+name+" actually shut down reports for corruption. In other words, you cannot report corruption any more.");
			}else{
				giveInfo("Your report was submitted. Let's see if the government's anti-corruption agencies do anything.")
			}
		}else{
			giveInfo("That doesn't help anyone.")
		}
		on = 108;
	}else if(on == 108){
		giveInfo("Even the smallest actions against corruption come in handy. To solve corruption, vigilant populations are required. A country with a high level of tolerance for corruption is Russia (Moscow Times), and today they are ranked very high on the corruption rankings, especially for one of the major world powers.");
		on = 109.1;
	}else if(on == 109.1){
		giveQuestion("You have been offered a job at a construction site for a week (after two of their members got injured right before the deadline).",["Accept (+$200)","Decline"]);
		on = 109.2;
	}else if(on == 109.2){
		if(results[on] == 1){
			money += 200;
			if(engagedInCorruption()){
				giveInfo("When you get to the construction site, you are appalled by the safety standards. Workers are using cheap cement, half of the hard hats are broken, and workers are put into risky situations. For exmaple, you had to hang off the side of the 4th floor for a job without a harness! It was very scary.");
			}else{
				giveInfo("The work was surprisingly easy. A quick $200 that will last you some time.");
			}
			on = 109.3;
		}else{
			giveInfo("You are quickly running out of money...");
			on = 109.3;
		}
	}else if(on == 109.3){
		giveInfo("Corruption can also cause companies to ignore safety standards. Safety is often expensive, and it can be cheaper for companies to bribe government officials to overlook that fact. Of course, the jepordizes the safety of the workers, and is ethically wrong.");
		on = 109;
	}else if(on == 109){
		if(results[109.2] == 2 || !engagedInCorruption()){
			if(results[21] == 2){
				giveQuestion("You realize you should probably get a health insurance, because if something happens to you it will be hard for you to afford it. However, President "+name+" recently got rid of government provided healthcare. What do you want to do?",["Get the Gold Package (-$39 every turn)","Get the Silver Package (-$19 every turn)","Opt out"]);
				on = 110;
			}else{
				giveQuestion("You realize you should probably get a health insurance, because if something happens to you it will be hard for you to afford it. What do you want to do?",["Apply for free governmental healthcare","Opt out"]);
				on = 111;
			}
		}else{
			if(results[21] == 2){
				giveQuestion("Your experience at the construction site made you realize you should probably get a health insurance, because if something happens to you it will be hard for you to afford it. However, President "+name+" recently got rid of government provided healthcare. What do you want to do?",["Get the Gold Package (-$39 every turn)","Get the Silver Package (-$19 every turn)","Opt out"]);
				on = 110;
			}else{
				giveQuestion("Your experience at the construction site made you realize you should probably get a health insurance, because if something happens to you it will be hard for you to afford it. What do you want to do?",["Apply for free governmental healthcare","Opt out"]);
				on = 111;
			}
		}
	}else if(on == 110){
		if(results[110] == 1){
			healthcare = 39;
			giveInfo("Expensive! Doesn't it make you angry at President "+name+" for stopping healthcare?");
		}else if(results[110] == 2){
			healthcare = 19;
			giveInfo("Expensive! Doesn't it make you angry at President "+name+" for stopping healthcare?");
		}else if(results[110] == 3){
			giveInfo("A risky move. Even a broken bone might be too expensive for you...");
		}
		on = 112;
	}else if(on == 111){
		if(results[111] == 1){
			healthcare = 1;
			giveInfo("Doesn't it make you happy that President "+name+" didn't do anything to the healthcare budget?");
		}else if(results[111] == 2){
			giveInfo("That was a bit stupid. Why would you not want free healthcare?");
		}
		on = 112;
	}else if(on == 112){
		if(results[17] == 1){
			giveQuestion("Your friend's startup recently went out of business, after some other local businesses suddenly started growing very quickly. What do you want to do?",["Buy her flowers (-$30)","Do nothing"]);
		}else{
			giveQuestion("Your friend's startup recently became a proper company. What do you want to do?",["Send flowers (-$30)","Congratulate her in person"]);
		}
		on = 113;
	}else if(on == 113){
		if(results[113] == 1){
			money -= 30;
		}
		giveInfo("If certain businesses are given an unfair advantage, it will kill other businesses in competition who are not getting that extra benefit.");
		on = 114;
	}else if(on == 114){
		if(results[19] == 1){
			giveInfo("You read an interesting article in today's newspaper about how after Kai Rupt's corruption scandal, it is clear why the difference between the rich and the poor has been on the rise in Graftlandia.");
			on = 114.5;
		}else{
			giveInfo("You read an interesting article in today's newspaper about the improving condition of economic equality in Graftlandia.");
			on = 114.5;
		}
	}else if(on == 114.5){
		giveInfo("Corruption has many adverse affects on economic equality. Recently in Malaysia, PM Najib Razak was convicted of stealing $600 million from a state fund. He obviously denied it. When a local courier was interviewed, he said 'How did [Najib] accumulate such wealth when the majority of us live a modest life?'");
		on = 115;
	}else if(on == 115){
		if(results[104] == 1){
			if(engagedInCorruption()){
				giveQuestion("You notice a lot of cars have been involved in nasty crashes recently. Probably because people are paying off the traffic officers when they are speeding. What do you want to do?",["Speed with the rest of the country","Abide the law"]);
			}else{
				giveQuestion("Your dad gets a promotion in his job, so he wants to buy a new car. Considering that you will be driving it, what type of car do you want?",["SUV","Sedan"])
			}
		}else{
			if(engagedInCorruption()){
				giveQuestion("Even though you don't have a driving license, you still want to drive your parent's car to places.",["Drive their car","Abide the law"]);
			}else{
				giveQuestion("Your dad gets a promotion in his job, so he wants to buy a new car. What type of car do you want?",["SUV","Sedan"])
			}
		}
		on = 210;
	}else if(on == 210){
		giveQuestion("You are visiting a friend today. What mode of transportation do you want to use?",["Metro (-$2)","Taxi (-$20)"]);
		if(engagedInCorruption()){
			on = 211;
		}else{
			on = 230;
		}
	}else if(on == 230){
		if(results[on] == 1){
			giveInfo("Cheaper, but slower.");
		}else{
			giveInfo("More expensive, but faster.");
		}
		on = 116;
	}else if(on == 211){
		if(results[211] == 1){
			if(results[26.1]==1){
				money -= 4;
				giveInfo("This was the cheaper option, so it would have made sense if you weren't at the wrong place at the wrong time. You encountered two rival gangs going at each other on the train. A bullet grazed you.");
				on = 220;
			}else{
				money -= 4;
				giveInfo("Unfortunately, the bus cost you $4. Prices of public services have been on the rise recently.");
				on = 220.1;
			}
		}else{
			money -= 20;
			if(results[26.1] == 1){
				giveInfo("The next day, you read about a gang shootout in the paper, in the very train you were about to go on. Close call.");
			}else{
				giveInfo("The more expensive option.");
			}
			on = 212;
		}
	}else if(on == 220.1){
		giveInfo("Corruption can cause inflation and make governmental services more expensive. Think about it. If there are government officials that are stealing money from the country, the country will have less money to subsidize certain services.");
		on = 116;
	}else if(on == 220){
		if(healthcare > 0){
			giveQuestion("How would you like to pay for your wounds?",["Use your healthcare package (free)","Clean them yourself at home"]);
			on = 212;
		}else{
			giveQuestion("How would you like to pay for your wounds?",["Go to hospital","Clean them yourself at home"]);
			on = 221;
		}
	}else if(on == 221){
		if(results[221] == 1){
			money -= 1254;
			giveInfo("Expensive. Makes you wish you went for one of those healthcare packages...");
		}else{
			giveInfo("You're gonna be out for a while, and the wound will definitely hurt. You should probably call a friend over to help you...");
		}
		on = 212;
	}else if(on == 212){
		giveInfo("Corruption fosters crime in neighborhoods (U4 Anti Corruption). For one, corruption means higher rates of unemployment and a poorer population, and it is common knowledge that poverty causes crime. Another reason corruption fosters crime is because the police may end up being tolerant to bribes from the mafia (organized crime) or gang members, allowing them to grow unchecked.");
		on = 116;
	}else if(on == 116){
		if(engagedInCorruption()){
			if(impeachment){
				giveInfo("BREAKING NEWS: ex-President "+name+" has escaped from the Graftlandia Central Prison! It seems like they bribed their way out! How ironic...");
				on = 250;
			}else if(results[27] == 1){
				giveInfo("BREAKING NEWS: ex-President "+name+" recently died of a stroke!");
				on = 300;
			}else{
				giveInfo("BREAKING NEWS: A massive corruption scandal on ex-President "+name+" has just been released! He allegedly stole millions from the country! What a shocker!");
				on = 117;
			}
		}else{
			on = 150;
			run();
		}
	}else if(on == 117){
		giveQuestion("A few people have started a peaceful protest against corruption. Do you want to take part? (This is potentially dangerous)",["Yes","No"]);
		if(results[3] == 1 || results[11] == 1){
			on = 118;
		}else{
			on = 135;
		}
	}else if(on == 118){
		if(results[118] == 1){
			giveInfo("Many people thought similarly. The protest turned out to be massive! The people really don't want corruption in their country...");
			on = 119;
		}else{
			giveInfo("Many people thought similarly. The protest was at best feeble. The people seem very tolerant towards corruption...");
			on = 400;
		}
	}else if(on == 119){
		giveInfo("Oh no!<br><br>So much for 'peaceful' protest. The conflict quickly became violent and people started attacking cops and setting cars on fire! The recently downsized military isn't helping...");
		on = 120;
	}else if(on == 120){
		if(results[118] == 1){
			on = 121;
		}else{
			on = 130;
		}
		run();
	}else if(on == 121){
		giveQuestion("A group of people near you got the bright idea to storm ex-President "+name+"'s house in all this chaos. Will you go with them?",["Yes","No"]);
		on = 122;
	}else if(on == 122){
		if(results[122] == 1){
			giveInfo("Your group heads into "+name+"'s nearby manor, and overpower the frightened secuirty guards very quickly. You and the group rush up the stairs of the house...");
		}else{
			giveInfo("The group continues without you into  "+name+"'s nearby manor, and overpower the frightened secuirty guards very quickly. They rush up the stairs of the house...");
		}
		on = 123;
	}else if(on == 123){
		if(results[122] == 1){
			giveInfo("And see the frigthened "+name+". He seem to know what is coming. In all this mess you have gotten a gun from somewhere...");
		}else{
			giveInfo("And see the frigthened "+name+". He seem to know what is coming. In all this mess the group has gotten a gun from somewhere...");
		}
		on = 124;
	}else if(on == 124){
		animateBg(360);
		giveInfo("As you see the group of young, desperate citizens that crowd your office, you realize the actual consequence of your stolen millions.");
		on = 125;
	}else if(on == 125){
		if(results[122] == 1){
			animateBg(360);
			giveQuestion("Pull the trigger?",["Yes","No"]);
		}
		on = 126;
	}else if(on == 126){
		giveInfo("A single gunshot echoes across the Graftlandia capital city.");
		on = 200;
	}

	else if(on == 135){
		if(results[on] == 1){
			giveInfo("Many people thought similarly. The protest turned out to be massive! The people really don't want corruption in their country...");
			on = 135.1;
		}else{
			giveInfo("Many people thought similarly. The protest was at best feeble. The people seem very tolerant towards corruption...");
			on = 400;
		}
	}else if(on == 135.1){
		giveInfo("Such a big protest was destined to go south. Nobody really knows how it happened, or why it happened, but the gunshots that echoed across the city said that it did happen. 12 civilians were shot dead, with at least 50 that were injured.");
		on = 136;
	}else if(on == 136){
		animateBg(360);
		giveInfo("Just days after the massacre, you sit in your office, on top of the millions you accumlated in your bank account, and think: Was the money really worth it at the end of the day?");
		on = 137;
	}else if(on == 137){
		giveInfo("Right as you think that, a young man slams open your door and pulls something metallic out of his pocket...");
		on = 138;
	}else if(on == 138){
		animateBg(360);
		giveInfo("You read about ex-President "+name+"'s assassination in the paper the next day. The man stole millions from the country...");
		on = 139;
	}else if(on == 139){
		giveInfo("...but did he really deserve such an ending?");
		on = 200;
	}


	else if(on == 400){
		giveInfo("As expected, the protest was pretty useless. The government barely batted an eye.");
		on = 401;
	}else if(on == 401){
		giveQuestion("The international media is already claiming that Graflandia's latest President is also heavily corrupt.",["Believe them","Don't believe"]);
		on = 402;
	}else if(on == 402){
		giveInfo("Unfortunately, it doesn't matter what you believe. You are lucky to have access to such news. Most of your neighbours will probably never hear such news because of Graftlandia's censorship anyway...");
		on = 403;
	}else if(on == 403){
		giveInfo("And even though you had this knowledge, what did you do with it? When the time came to protest the corrupt government, you refused. If YOU don't take action, who will?");
		on = 200;
	}

	else if(on == 200){
		document.getElementById('final').style.display = 'block';
		document.getElementById('nextBut').innerHTML = "Finish";
		on = 200.1;
	}else if(on == 200.1){
		showTitle();
		document.getElementById('final').style.display = 'none';
		document.getElementById('startBut').innerHTML = "Replay";
		on = 201;
	}else if(on == 201){
		location.reload();
	}




	else if(on == 150){
		if(results[102] == 2){
			giveQuestion("Your job application in the warehouse of a local paper company has been approved! Accept offer at $100/week?",["Yes","No"]);
		}else{
			giveQuestion("The job situation in Graftlandia is looking very promising. Would you like to apply now?",["Yes","No"])
		}
		on = 151;
	}else if(on == 151){
		if(results[151] == 1){
			salary += 100;
		}
		giveInfo("BREAKING NEWS: ex-President "+name+" recently died of a stroke!")
		on = 152;
	}else if(on == 152){
		giveQuestion("The country wants to pay respects to the ex-President. Would you support the building of a statue in the ex-President's memory?",["Yes","No"]);
		on = 153;
	}else if(on == 153){
		giveInfo("The results were overwhelmingly positive. Looks like the people don't want to forget the rule of "+name+" any time soon...");
		on = 170;
	}else if(on == 170){
		giveInfo("Congratulations, President. You did well. If only they all were like you.");
		on = 200;
	}

	else if(on == 300){
		giveQuestion("The country wants to pay respects to the ex-President. Would you support the building of a statue in the ex-President's memory?",["Yes","No"]);
		on = 301;
	}else if(on == 301){
		giveInfo("The results were overwhelmingly negative. People even made effigies of ex-President " + name + " and burned them. Looks like the people want to forget the rule of "+name+" as soon as possible...");
		on = 301;
	}else if(on == 302){
		giveInfo("Although not official, everybody knows that ex-President "+name+" was extremely corrupt. The people voted " + name + " for change, but instead got more of the same...");
		on = 200;
	}

	else if(on == 250){
		animateBg(360);
		giveInfo("As you sit in the Bahamas, a wanted man after escaping prison, you think: Was the money worth it at the end of the day?");
		on = 251;
	}else if(on == 251){
		giveInfo("Was it worth never feeling safe again, and spending the rest of your life on the run?");
		on = 200;
	}

	if(on < 30){
		if(peopleTrust < 1){
			suspicious = (-peopleTrust + 1)/2;
		}
		if(complaintActionMult == 3){
			peopleTrust += 0.1;
		} 
			money += Math.round(offshoreLevel * (Math.random()+0.5) * 10000000);
			money += 25000;
			investigation += suspicious * oliAngry * complaintActionMult;
			moneyInfo.innerHTML = getMoneyString(money);
			trustInfo.style.left = (Math.max(Math.min(peopleTrust,10),0) * 1.66 + 1.3) + "vw";
			investigationInfo.style.left = (Math.max(Math.min(investigation,10),0) * 1.66 + 1.3) + "vw";
		if(investigation > 10 && impeachment == false){
			giveInfo("A report on you has been released. Specifically, a report on your corruption. Whoever made it uncovered every single one of your scandals, providing more than enough evidence for you impeachment.")
			on = 50;
			impeachment = true;
		}
	}else{
		if(money !== 0){
			money -= Math.round((Math.random()/4+0.25) * 200);
			money -= healthcare;
			money += salary;
			moneyInfo.innerHTML = getMoneyString(money);
		}
		if(money < 0){
			money = 0;
			moneyInfo.innerHTML = getMoneyString(money);
			giveInfo("Unfortunately, you ran out of money. This is what corruption does. It steals money from the population and makes the rich richer. Corruption didn't allow you to get a job, made you pay more for public services, and generally made your life worse. Corruption is truly a global issue that plagues our modern world...");
			on = 200;
		}
	}
}




