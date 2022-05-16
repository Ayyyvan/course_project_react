import React, {useState} from "react"
import {IntlProvider} from "react-intl"
import English from '../languages/en.json'
import Russian from '../languages/ru.json'

export const Context = React.createContext();

const languageData = "language"
const local = localStorage.getItem(languageData) || navigator.language

	let lang
	if(local === "en-US"){
		lang = English
	} else{
		lang = Russian
	}

const LanguageSwitcher = (props) => {
	const [locale, setLocale] = useState(localStorage.getItem(languageData))
	const [messages, setMessages] = useState(lang)


	function selectLang(e) {
		const newLocale = e.target.value
		setLocale(newLocale)
		if(newLocale === "en-US"){
			setMessages(English)
			localStorage.setItem(languageData, "en-US")
		} else {
			setMessages(Russian)
			localStorage.setItem(languageData, "ru-RU")
		}
	}

	return(
		<Context.Provider value={{locale, selectLang}}>
			<IntlProvider messages={messages} locale={locale}>
				{props.children}
			</IntlProvider>
		</Context.Provider>
	)
}

export default LanguageSwitcher