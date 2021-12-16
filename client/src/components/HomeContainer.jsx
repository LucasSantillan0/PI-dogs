import s from "./Home.module.css"

import Dogs from "./Dogs"

export default function HomeContainer (){
    return <section className={s.section} >
    <Dogs/>
</section>
}