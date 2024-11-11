/***************************************************
* CSC428/2514 - St. George, Fall 2019
*
* File: index.js
* Summary: Entry point of current React app.
*	This assignment will help you become familiar with
*	a HCI experiment in interaction techniques design.
*	This experiment is targeting Text Entry system,
*	a well-known HCI problem.
*	You are going to develop your own experimenet software
*	and measure the performance of your participants, and
*	compare the designed text entry system with a baseline system.
*	Please take time to read through the code and note
*	how following text entry systems are working.
*
* Instruction:
*	The assignment handout and README files contain
*	a detailed description of what you need to do. Please
*	be sure to read them carefully.
*
* TODO:
*	You must implement your own experiment software
*	Either using this or write your own project works, but must fulfill same requirement
*
* The code is commented, and the comments provide information
* about what each js file is doing.
*
* 
****************************************************/

/**
 *  Libraries
 */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js'
import { BrowserRouter} from 'react-router-dom'
import './index.css';

/**
 *  Now, we have routing function in our Starter code. 
 *  Details are implmented in 'App.js' file.
 */
ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById('root')
);