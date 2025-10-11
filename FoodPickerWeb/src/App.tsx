import { Route, Routes } from 'react-router-dom'

import './App.css'
import './styles/buttons.css'
import './styles/flex.css'
import './styles/font.css'
import './styles/container.css'
import './styles/global.css'
import MainLayout from './components/layouts/MainLayout/MainLayout'
import Home from './views/Home/Home'
import Foods from './views/Foods/Foods'
import AddFood from './views/AddFood/AddFood'
import FoodIndex from './views/FoodIndex/FoodIndex'
import EditFood from './views/EditFood/EditFood'

function App() {
    return (
        <Routes>
            <Route path='/' element={<MainLayout><Home /></MainLayout>}/>
            <Route path='/foods' element={<MainLayout><Foods /></MainLayout>}></Route>
            <Route path='/foods/add' element={<MainLayout><AddFood /></MainLayout>}/>
            <Route path='/foods/:foodId' element={<MainLayout><FoodIndex /></MainLayout>}/>
            <Route path='/foods/:foodId/edit' element={<MainLayout><EditFood /></MainLayout>}/>
        </Routes>
    )
}

export default App
