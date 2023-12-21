"use client"
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import MenuItem from "../menu/MenuItem";
import SectionHeaders from "./SectionHeaders";

export default function HomeMenu() {

    const [bestSellers, setBestSellers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        fetch('/api/product').then(response => {
            response.json().then(product => {
                const lastProduct = product.slice(-3); // les trois dernier produits     
                setBestSellers(lastProduct)
                setLoading(false)
            })
        })
    },[])

    return (
        <section className="">
            {/* Header de la section */}
            <div className="text-center mb-4">
                <SectionHeaders subHeader={'Hum... 🍕'} mainHeader={'Nos meilleurs choix'} />
            </div>

                {loading && (
                    <div className="flex justify-center">
                        <BeatLoader
                        color="#C0392B"
                        size={15}
                        />
                    </div>
                )}

            {/* GRID des menus, 3 card par colonne avec un espace de 4 entre les card */}
            <div className="grid sm:grid-cols-3 gap-4">
                {bestSellers?.length > 0 && bestSellers.map(item => (
                    <MenuItem key={item._id} {...item} />
                ))}
            </div>
        </section>
    )
}


// Component pour afficher les menus de la page d'accueil