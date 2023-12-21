"use client"
import SectionHeaders from "@/components/layout/SectionHeaders";
import MenuItem from "@/components/menu/MenuItem";
import { useEffect, useState } from "react"
import { BeatLoader } from "react-spinners";

export default function MenuPage() {

    const [categories, setCategories] = useState([]);
    const [productItems, setProductItems] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        setLoading(true)
        fetch('/api/categories').then(response => {
            response.json().then(categories => setCategories(categories))
            setLoading(false)
        });

        fetch('/api/product').then(response => {
            response.json().then(productItems => setProductItems(productItems))
        })
        

    },[])

    return (
        <section className="mt-8">
            
             {loading && (
                    <div className="flex justify-center">
                        <BeatLoader
                        color="#d63644"
                        size={15}
                        />
                    </div>
            )}

            {categories?.length > 0 && categories.map(categorie => (
                <div key={categorie._id} >

                    <div className="text-center">
                        <SectionHeaders mainHeader={categorie.name} />
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4 mt-6 mb-12">
                        {/* Filtrer et afficher les produits par leur catégorie */}
                        {productItems.filter(item => item.category === categorie._id).map(item => (
                            <MenuItem key={item._id} {...item} />
                        ))}
                    </div>

               </div>
           ))}
        </section>
    )
}