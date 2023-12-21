import Image from "next/image";
import Link from "next/link";
import Fleche from "../icons/Fleche";

export default function Hero() {
    return (
        <section className="hero md:mt-4">
            <div className="py-8 md:py-12">
                <h1 className="text-4xl font-semibold">
                    <span className="text-primary">Hey</span> <br />
                    tout est mieux <br />
                    avec une&nbsp;
                    <span className="text-primary">Pizza</span>
                </h1>
                <p className="my-6 text-gray-500 text-sm">
                    La pizza est la pièce manquante qui rend la journée complète,
                    une joie de vivre simple mais délicieuse.
                </p>
                <div className="flex gap-4 text-sm ">

                    <Link href={'/menu'} className="
                    bg-primary
                    uppercase
                    flex
                    justify-center
                    items-center
                    gap-2
                    text-white
                    px-12
                    py-2
                    font-bold
                    rounded-full">
                        Passer commande
                        <Fleche/>
                    </Link>

                    <button className="
                    flex
                    border-0
                    items-center
                    gap-2
                    py-2
                    text-gray-600
                    font-semibold">
                        En savoir plus
                        <Fleche/>
                    </button>

                </div>
            </div>
            <div className="relative hidden md:block">
                <Image src={'/pizzawait.jpg'} layout={'fill'} objectFit={'contain'} alt={'Pizza'} />
            </div>
        </section>
    )
}


// Component Hero de la page d'accueil