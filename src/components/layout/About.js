import SectionHeaders from "./SectionHeaders";

export function About() {
    return (
        <section className="text-center my-10" id="about">
            <SectionHeaders
                subHeader={'Hey Pizza ? 👨‍🌾'}
                mainHeader={'A propos'}
            />
            <p className="max-w-2xl mx-auto  mt-4 text-gray-500">
                <span className="text-xl">👋</span> moi c'est <b>Unkn0w_ind</b>, développeur web, ce site est une démo avec NextJS<br />
                Un client peut s'inscrire, ajouter ce qu'il veut dans le panier puis passer au paiement via Stripe. <br />
            </p>
        </section>
    )
}