import React from "react"
import { FormattedMessage } from "react-intl"

export const NotFound = () => {
  
  return(
    
    <div>
      <h2>
			<FormattedMessage
				id="notFound.message"
				defaultMessage="Page not found"
			/>
			</h2>
      <blockquote cite="https://ru.wikiquote.org/wiki/%D0%9E%D1%88%D0%B8%D0%B1%D0%BA%D0%B0">
        <p>
				<FormattedMessage
					id="notFound.quote"
					defaultMessage="All people make mistakes, but great people confess their mistakes"
				/>
				</p>
        <footer>— <cite>
					<FormattedMessage
						id="notFound.quote.author"
						defaultMessage="Bernard Le Bovier de Fontenelle"
					/>
					</cite></footer>
      </blockquote>
    </div>
  )
}