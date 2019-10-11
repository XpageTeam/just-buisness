import "./forms"

import {domReady, EventListener, Element} from "./xpage/index"

interface state {
	anyScrollOpened?: boolean
}

declare global {
    interface Window {
    	animateScroll: Function; 
    	isScrolledIntoView: Function;
    	get$: Function;
    	preloaderTimer: NodeJS.Timeout;
    	is: any;
    	state: state;
		requestIdleCallback: Function
		cancelIdleCallback: Function
		mainScrollTo: Function
    }
}

;(async function(){
	const customSelect = await import("./xpage/select")
})()

domReady(() => {
	
})