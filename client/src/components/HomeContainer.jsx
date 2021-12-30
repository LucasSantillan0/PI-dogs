import s from "./Home.module.css"
import { Routes, Route } from "react-router"

import Dogs from "./Dogs"
import DogDetail from "./DogDetail"

 export default function HomeContainer (){

    return <section className={s.section} >

    <Dogs/>

    <Routes>
        <Route path="/:id/:DB" element={<DogDetail/>}></Route>
    </Routes>
</section>
}

