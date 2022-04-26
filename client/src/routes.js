import React from "react"
import {Routes, Route, Navigate} from "react-router-dom"
import { NotFound } from "./components/NotFound"
import { AuthPage } from "./pages/AuthPage"
import { HomePage } from "./pages/HomePage"
import { RegisterPage } from "./pages/RegisterPage"

export const useRoutes = isAuthenticated => {
	if(isAuthenticated){
		 return (
		 	<Routes>
				<Route path="/" element={<HomePage/>} />

				<Route path="*" element={<NotFound/>} />
			</Routes>
		 )
	}
	return (
		<Routes>
			<Route path="/login" element={<AuthPage/>} />

			<Route path="/register" element={<RegisterPage/>} />

			<Route path="/" element={<HomePage/>} />

			<Route path="*" element={<NotFound/>} />
		</Routes>
	)
		
}