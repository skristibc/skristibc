import Hero from "@/components/layout/Hero"
import SectionHeaders from "@/components/layout/SectionHeaders"
import Link from "next/link"


export default function Home() {
  return(
    <>
      <Hero />
      <section className="text-center my-16" id="about">
        <SectionHeaders
          mainHeader={'Rólunk'}
        />
        <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
          <p>
          Üdvözöljük az SK Auto autókölcsönzőnél! Küldetésünk, hogy ügyfeleink számára egyszerű, gyors és kényelmes autóbérlési lehetőségeket kínáljunk, bármilyen igényekkel is érkezzenek. Legyen szó üzleti útról, családi kirándulásról vagy hétvégi kalandról, flottánkban mindenki megtalálja a számára legmegfelelőbb járművet – a kompakt városi autóktól kezdve a tágas kisbuszokig.
          </p>
          <p>Többéves tapasztalattal és megbízható ügyfélszolgálattal biztosítjuk, hogy minden bérlés gyorsan, gördülékenyen és kényelmesen zajlik. Foglalja le autóját könnyedén online, és élvezze a szabad mozgás örömét!</p>
          <p>Az SK Auto-nál az ügyfeleink elégedettsége az elsődleges. Mi mindent megteszünk, hogy minden utazás kényelmes és felejthetetlen élmény legyen. Bízza ránk az utat, mi pedig gondoskodunk a többi részletről!</p>
        </div>
      </section>
      <section className="text-center my-8" id="contact">
        <SectionHeaders
          subHeader={'Ne habozzon'}
          mainHeader={'Hívjon bátran'}
        />
      <div className="mt-8">
        <a className="text-4xl underline text-gray-500" href="tel:+421123456789">
        +421 123 456 789
      </a>
      <Link href={'/email'} className="block pt-2 text-xl underline text-gray-500 hover:text-blue-500 hover:underline">
        Vagy vegye fel velünk a kapcsolatot emailben.
      </Link>
</div>

      </section>
    </>
  )
}