import Image from "next/image"
import Right from "../icons/right"

export default function Grid (){
    return(
        <section>
                <div className="pt-10 px-6">
                    <h1 className="justify-center flex text-2xl font-semibold">Hozza ki a legtöbbet az autóbérléséből</h1>
                    <div className="pt-8 px-12 grid grid-cols-3 gap-3">
                        <div className="bg-gray-300 rounded-lg">
                            <Image src={'/SUV.jpg'} width={300} height={200} layout="responsive" alt={'SUV'} className="rounded-t-lg" />
                            <h1 className="text-2xl font-semibold pt-4 px-4">SUV modelljeink</h1>
                            <p className="pt-4 text-lg pb-4 px-4">Élvezze a terepjárók előnyeit, ötvözve a személyautók kényelmével. Fedezze fel új SUV modelljeinket!</p>
                            <div className="pb-4 flex justify-center">
                                <button className="flex gap-2 bg-primary px-6 py-4  font-semibold text-white rounded-full" >
                                    Megtekintés
                                    <Right />
                                </button>
                            </div>
                    </div>

                        <div className="bg-gray-300 rounded-lg">
                            <Image src={'/hibrid.jpg'} width={300} height={200} layout="responsive" alt={'hibrid'} className="rounded-t-lg" />
                            <h1 className="text-2xl font-semibold pt-4 px-4">Hibrid modellek</h1>
                            <p className="pt-4 text-lg pb-4 px-4"> "Ismerje meg kíváló üzemanyag-takarékos hibrid modelljeinket és élvezze a fenntartható vezetés élményét!"</p>
                            <div className="pb-4 flex justify-center">
                                <button className="flex gap-2 bg-primary px-6 py-4  font-semibold text-white rounded-full" >
                                    Megtekintés
                                    <Right />
                                </button>
                            </div>
                    </div>
                        <div className="bg-gray-300 rounded-lg">
                            <Image src={'/kisbusz.jpg'} width={300} height={200} layout="responsive" alt={'kisbusz'} className="rounded-t-lg" />
                            <h1 className="text-2xl font-semibold pt-4 px-4">Kis busz kínálataink</h1>
                            <p className="pt-4 text-lg pb-4 px-4">Élvezze a kisbuszok tágasságát, ötvözve a személyautók praktikumával. Fedezze fel új kisbusz modelljeinket!</p>
                            <div className="pb-4 flex justify-center">
                                <button className="flex gap-2 bg-primary px-6 py-4  font-semibold text-white rounded-full" >
                                    Megtekintés
                                    <Right />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
        </section>
    )
}