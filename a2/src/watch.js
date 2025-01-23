/***************************************************
* CSC428/2514 - St. George, Fall 2019
*
* File: watch.js
* Summary: Watch Component
*
* The code is commented, and the comments provide information
* about what each js file is doing.
*
****************************************************/

/**
 * Libraries
 */
import React from 'react';
import './index.css';
import TextArea from './textarea'
import KeyboardNormal from './keyboard.normal'
import KeyboardZoom from './keyboard.wip'

/**
 * Functions
 */

/**
 * @Deprecated.
 * Calculate watch size (width and height) in pixels.
 * 	if you decide to use exact AppleWatch size, use this function to get width and height.
 * @param: ppi , your device independent pixel per inch. Can be acheived from the web.
 * @param: watchSize, default apple watch size, 38mm or 42mm.
 * 			other size value will be return zero in size.
 */
const deviceIndependenceSize = (ppi,watchSize) => {
	var width,height,deviceWidthInPixel,deviceHeightInPixel;
	if(watchSize === 42){
		// AppleWatch Series 3 + size 42mm has a resolution of 312x390 px, 302 ppi
		//	DeviceSize: {Width:33.3, Height: 38.6mm}
		//	ScreenSize: {Width: 26mm , Height: 33mm}
		width = 26; height = 33;
		deviceWidthInPixel = width/25.4*ppi;
		deviceHeightInPixel = height/25.4*ppi;
		return {width: deviceWidthInPixel, height:deviceHeightInPixel};
	}else if(watchSize === 38){
		// AppleWatch Series 3 + size 38mm has a resolution of 272x340 px, 290 ppi
		// 	DeviceSize: {Width: 33.3mm, Height:42.5mm}
		//	ScreenSize: {Width: 24mm, Height: 30mm}
		width = 24; height = 30;
		deviceWidthInPixel = width/25.4*ppi;
		deviceHeightInPixel = height/25.4*ppi;
		return {width: deviceWidthInPixel, height:deviceHeightInPixel};
	}else{
		return {width:0, height:0}
	}
}

/**
 * Download user typed content and target phrases
 * you can and should add more measurements
 * that you recorded in your study into the text parameter
 * so that you can save them into a file
 * @param {*} text:
 * @param {*} name:
 * @param {*} type:
 */
function download(text, name, type) {
	// console.log(JSON.parse(text));
	var a = document.createElement("a");
	var file = new Blob([text], {type: type});
	a.href = URL.createObjectURL(file);
	a.download = name;
	a.click();
}

/**
 * Watch Class
 * This class extends React.Component
 */
class Watch extends React.Component {

	/**
	 * Constructor
	 * @param {} props: a paramater which enables you to access
	 * 			values passed from parent Componenet(or Node).
	 * 			e.g., if you pass 'value' as 5 in Watch component
	 * 				<Watch value={5}/>
	 * 				you can access by calling 'this.props.value'
	 * 				props are immutable.
	 */
	constructor(props){
		super(props);

		// Hardcoded target phrases
		this.phrases = [
			"video camera with a zoom lens",
			"have a good weekend",
			"what a monkey sees a monkey will do",
			"that is very unfortunate",
			"the back yard of our house",
			"i can see the rings on saturn",
			"this is a very good idea",
			"the quick brown fox jumps",
			"hello world how are you today",
			"the rain in spain falls mainly on the plain",
			"an apple a day keeps the doctor away",
			"to be or not to be that is the question",
			"all that glitters is not gold",
			"a picture is worth a thousand words",
			"actions speak louder than words",
			"the dreamers of dreams",
			"did you have a good time",
			"space is a high priority",
			"you are a wonderful example",
			"do not squander your time",
			"do not drink too much",
			"take a coffee break",
			"popularity is desired by all",
			"the music is better than it sounds",
			"starlight and dewdrop",
			"the living is easy",
			"fish are jumping",
			"the cotton is high",
			"drove my chevy to the levee",
			"but the levee was dry",
			"thank you for your help",
			"no exchange without a bill",
			"the early bird gets the worm",
			"buckle up for safety",
			"this is too much to handle",
			"protect your environment",
			"world population is growing",
			"the library is closed today",
			"mary had a little lamb",
			"teaching services will help",
			"we accept personal checks",
			"this is a non profit organization",
			"user friendly interface",
			"healthy food is good for you",
			"hands on experience with a job",
			"this watch is too expensive",
			"the postal service is very slow",
			"communicate through email",
			"the capital of our nation",
			"travel at the speed of light",
			"i do not fully agree with you",
			"gas bills are sent monthly",
			"earth quakes are predictable",
			"life is but a dream",
			"take it to the recycling depot",
			"sent this by registered mail",
			"fall is my favorite season",
			"a fox is a very smart animal",
			"the kids are very excited",
			"parking lot is full of trucks",
			"my bike has a flat tire",
			"do not walk too quickly",
			"a duck quacks to ask for food",
			"limited warranty of two years",
			"the four seasons will come",
			"the sun rises in the east",
			"it is very windy today",
			"do not worry about this",
			"i want to hold your hand",
			"the children are playing"
		];

		//Your URL parameter can be accessed with following syntax.
		console.log(this.props.type);
		console.log(this.props.type===undefined);
		this.type = (this.props.type === undefined) ? this.props.match.params.type : this.props.type;
		this.originalScale = (this.props.originalScale === undefined)?this.props.match.params.scaleVal : this.props.originalScale;

		//this.type = this.props.match.params.type;
		//this.originalScale = this.props.match.params.scaleVal;
		console.log("[Watch] type: "+this.type);
		console.log("[Watch] originalScale: "+this.originalScale);
		// React Component States.
		// inputPhrase: a variable containing all characters typed by users.
		// inputChar: a variable containing your current input character from the Keyboard.
		// if 'inputPhrase' or 'inputChar' value has changed by onKeyCharReceived(),
		// Watch Component will re-render the interface if the state has changed by calling
		// 	setState({});
		this.state = {
			inputPhrase: "",
			inputChar: "",
			currentPhrase: this.targetPhrase,
			phraseLog: [], // Array to store completed phrases and inputs
			startTime: null,
			endTime: null
		};

		//add the target phrases here or load them from external files
		//this.targetPhrase =  "I was walking down the street";
		const randomIndex = Math.floor(Math.random() * 70);
		this.targetPhrase = this.phrases[randomIndex];
		this.startTime = Date.now() //Record start time
		//this.targetPhrase = this.phrases[Math.floor(Math.random() * 15)];
		//const currentPhrase = this.targetPhrase;


		// For Debug, uncomment only if you want to measure exact width and height in pixels.
		// Following codes won't be affected on any of your code. 
		/*
		var size42 = deviceIndependenceSize(112,42);
		console.log("AppleWatch 42mm => "+size42.width +"/"+size42.height);
		var size38 = deviceIndependenceSize(112,38);
		console.log("AppleWatch 38mm => "+size38.width +"/"+size38.height);
		*/
	}

	/**
	 * Callback for input character changes.
	 * @param {} c: changed character
	 *
	 * This callback will be passed to child (Keyboard components, in our case).
	 * when the input character received, it changes inputPhrase state.
	 */
	onKeyCharReceived = (c) => {
		this.setState({inputChar : c});
		this.state.inputPhrase += c;
	};

	saveData = () => {
		const { phraseLog } = this.state;
		let log_file = JSON.stringify(phraseLog);
		download(log_file, "results.txt", "text/plain");
	}

	calculateErrorRate = (inputPhrase, targetPhrase) => {
		let errorCount = 0;
		const maxLength = Math.max(inputPhrase.length, targetPhrase.length);
	
		// Count the number of incorrect characters
		for (let i = 0; i < maxLength; i++) {
			if (inputPhrase[i] !== targetPhrase[i]) {
				errorCount++;
			}
		}
	
		// Calculate percent error: (incorrect characters / total characters in target phrase) * 100
		const percentError = (errorCount / targetPhrase.length) * 100;
		return percentError;
	};


	onDone = () => {

        const { inputPhrase, phraseLog } = this.state;
		const currentPhrase = this.targetPhrase;
		const endTime = Date.now();
		const duration = (endTime - this.startTime) / 1000;
		const percentError = this.calculateErrorRate(inputPhrase,currentPhrase);

		this.setState({
            phraseLog: [...phraseLog, { currentPhrase, inputPhrase, duration, percentError, currentLength: currentPhrase.length }],
			inputPhrase: "",
			inputChar: ""
        }, () => {
			const randomIndex = Math.floor(Math.random() * 70);
        	this.setState({ targetPhrase: this.phrases[randomIndex] });
		})
	}

	onPhraseComplete = () => {
		const randomIndex = Math.floor(Math.random() * 70);
		this.targetPhrase = this.phrases[randomIndex];

        const { inputPhrase, currentPhrase, startTime } = this.state;

		// Log the completed target and input phrases
		this.setState({
			//phraseLog: [...phraseLog, { currentPhrase, inputPhrase, startTime }],
			inputPhrase: "",// Reset input for the new phrase
			inputChar: "",
			startTime: Date.now()
		})
    };


	/**
	 * Render function()
	 * This function will return UI of the system.
	 *	It will return different text-entry system, depending on which
	 *	type property you did pass from index.js
	 */
	render(){
		// style={{}} is an inline styling with calculated screen size
		if(this.type === 'normal'){
			return(
				<div className="watch">
					 <label>{this.targetPhrase}</label>
					<TextArea inputChar={this.state.inputChar}/>
					<KeyboardNormal originalScale={this.originalScale} onKeyCharReceived ={this.onKeyCharReceived}/>
					<button onClick={this.onDone}>Done</button>
					<button onClick={this.onPhraseComplete}>Next Phrase</button>
					<button onClick={this.saveData}>SAVE</button>
				</div>
			);
		}else if(this.type === 'zoom'){
			//the save button below is only to demonstrate to you how to save data
			// to files.
			//TODO: You need to remove it in your experiment and figure out another way
			// call this.saveData function to save user's data
			return(
				<div className="watch">
				  <label>{this.targetPhrase}</label>
					<TextArea inputChar={this.state.inputChar}/>
					<KeyboardZoom originalScale={this.originalScale} onKeyCharReceived ={this.onKeyCharReceived}/>
					<button onClick={this.onDone}>Done</button>
					<button onClick={this.onPhraseComplete}>Next Phrase</button>
					<button onClick={this.saveData}>SAVE</button>
					
				</div>
			);
		}else{
			// exception
			return(
				<div>
					<p> [Rendering Failed] You have got wrong parameters. Check your 'type' property </p>
				</div>
			)
		}
	}
}

export default Watch
