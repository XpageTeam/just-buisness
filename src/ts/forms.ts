import {domReady, App, EventListener} from "./xpage/index"

domReady(() => {
	new EventListener(".default-input__input--file").add("change", (el: HTMLInputElement) => {
		let files: Array<string> = [],
			label = el.closest(".default-input").querySelector(".default-input__label--file") as HTMLElement;

		for (let i = 0; i < el.files.length; i++)
			files.push(el.files[i].name)

		if (!files.length){
			if (label.getAttribute("data-text"))
				label.innerHTML = label.getAttribute("data-text")

			el.classList.remove("js__have-files")
		}else{
			if (!label.getAttribute("data-text"))
				label.setAttribute("data-text", label.innerText);

			label.innerText = files.join(", ")

			el.classList.add("js__have-files")
		}
	})
})

domReady(() => {
	App.each(".default-input__input", inputValueChecker)
})

const inputValueChecker = (el: HTMLInputElement) => {
	const inputContainer = el.closest(".default-input");

	if (!inputContainer)
		return

	if (el.value)
		inputContainer.classList.add("js__have-content")
	else
		inputContainer.classList.remove("js__have-content")
}