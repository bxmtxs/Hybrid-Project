import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
const Home = lazy(() => import('../pages/lazy/Home'))
const About = lazy(() => import('../pages/lazy/About'))
const NotFound = lazy(() => import('../pages/lazy/NotFound'))
const Customers = lazy(() => import('../pages/Customers'))

export const AppRoutes = () => (
<Suspense fallback={<div>Loading...</div>}>
<Routes>
<Route path="/" element={<Home />} />
<Route path="/home" element={<Home />} />
<Route path="/about" element={<About />} />
<Route path="*" element={<NotFound />} />
<Route path="/customers" element={<Customers />} />
</Routes>
</Suspense>
)