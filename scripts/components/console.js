"use strict";

class ACConsoleElement extends HTMLDialogElement {
	constructor(){
		super();
		this.classList.toggle(`console`, true);
	}
	/**
	 * @param {Object} [object]
	 */
	log(object) {
		if (object === undefined && this.open) {
			this.open = false;
		} else if (object !== undefined && !this.open) {
			this.open = true;
		}
		if (object !== undefined && this.open) {
			this.replaceChildren(...Object.entries(object).flat().map((item) => {
				const span = document.createElement(`span`);
				span.innerText = item;
				return span;
			}));
		}
	}
}
customElements.define(`ac-debugger`, ACConsoleElement, { extends: `dialog` });
