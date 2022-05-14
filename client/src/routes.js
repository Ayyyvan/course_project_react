import React from "react"
import { Routes, Route } from "react-router-dom"
import { NotFound } from "./components/NotFound"
import { AuthPage } from "./pages/AuthPage"
import { CreatePage } from "./pages/CreatePage"
import { HomePage } from "./pages/HomePage"
import { RegisterPage } from "./pages/RegisterPage"
import { CollectionPage } from "./pages/CollectionPage"
import { AddItem } from "./components/AddItem"
import { ProfilePage } from "./pages/ProfilePage"

export const useRoutes = isAuthenticated => {
  if(isAuthenticated){
     return (
       <Routes>
        <Route path="/" element={<HomePage/>} />

        <Route path="/profile" element={<ProfilePage/>}/>

        <Route path="/create" element={<CreatePage/>} />

        <Route path="/collection/:id" element={<CollectionPage/>} />

        <Route path="/collection/:id/add" element={<AddItem/>} />

        <Route path="*" element={<NotFound/>} />
      </Routes>
     )
  }
  return (
    <Routes>
      <Route path="/login" element={<AuthPage/>} />

      <Route path="/register" element={<RegisterPage/>} />

      <Route path="/collection/:id" element={<CollectionPage/>} />

      <Route path="/" element={<HomePage/>} />

      <Route path="*" element={<NotFound/>} />
    </Routes>
  )
    
}