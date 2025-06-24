import React from "react"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Dashboard from "../screens/dashboard/dashboard"

export const MainRoutes = () => {
  return (
    <Router>
      <React.Fragment>
        <Routes>
            <Route >
              <Route path="/" element={<Dashboard />} />
            </Route>
        </Routes>
      </React.Fragment>
    </Router>
  )
}
