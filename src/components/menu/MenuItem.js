import { useContext, useState } from "react"
import toast from "react-hot-toast";
import { CartContext } from "../AppContext"
import MenuItemBox from '../menu/MenuItemBox'
import Image from "next/image";

export default function MenuItem(menuItem) {

    const { image, name, description, basePrice, sizes, extraIngredient } = menuItem;
    
    //Par défaut on sélectionne la première taille (Small)
    const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
    const [selectedExtras, setSelectedExtras] = useState([])

    const [showPopup, setShowPopup] = useState(false);

    const { addToCart } = useContext(CartContext);

    function handleAddToCartButtonClick() {

    //Si le produit a des options (durant sa création dans le backend)
    const hasOptions = sizes.length > 0 || extraIngredient.length > 0

        if (hasOptions && !showPopup) {
            setShowPopup(true);
            return;
        }
       
        addToCart(menuItem, selectedSize, selectedExtras);    
        setShowPopup(false);
        toast.success('Produit ajouter au panier')
                   
    }

    // Fonction pour la selection des extras
    function handleExtraClick(e, extraThing) {
        const checked = e.target.checked;
        if (checked) {
            setSelectedExtras(prev => [...prev, extraThing])
        } else {
            setSelectedExtras(prev => {
                return prev.filter(e => e.name !== extraThing.name);
            })
        }
    }

    // Prix final après sélection taille & extras
    let selectedPrice = basePrice;

    if (selectedSize) {
        selectedPrice += selectedSize.price;
    }

    if (selectedExtras?.length > 0) {
        for (const extra of selectedExtras) {
            selectedPrice += extra.price;
        }
    }
    
    return (
        <>
            {showPopup && (
                <div onClick={() => setShowPopup(false)} className="fixed inset-0 bg-black/80 flex items-center justify-center">
                    <div onClick={e => e.stopPropagation()} className="bg-white my-8 p-2 rounded-lg max-w-md">
                        <div className="overflow-y-scroll p-2" style={{maxHeight:'calc(100vh - 100px)'}}>
                            <Image className="mx-auto" src={image} alt={name} width={300} height={200} />
                            <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
                            <p className="text-center text-gray-500 text-sm mb-2">{description}</p>
                            
                            {sizes?.length > 0 && (
                                <div className="py-2">
                                    <h3 className="text-center text-gray-700">Choisir la taille</h3>
                                    {sizes.map(size => (
                                        <label key={size._id} className="flex items-center gap-2 py-4 rounded-md mb-1">
                                            <input
                                                onChange={() => setSelectedSize(size)}
                                                checked={selectedSize?.name === size.name}
                                                type="radio"
                                                name="size" />
                                            {size.name} {basePrice + size.price}€
                                        </label>
                                    ))}
                                </div>
                            )}

                            {extraIngredient?.length > 0 && (
                                <div className="py-2">
                                    <h3 className="text-center text-gray-700">Ajouter des extras</h3>
                                    {extraIngredient.map(extraThing => (
                                        <label key={extraThing._id} className="flex items-center gap-2 py-4 rounded-md mb-1">
                                            <input
                                                type="checkbox"
                                                checked={selectedExtras.map(e => e._id).includes(extraThing._id)}
                                                onChange={e => handleExtraClick(e, extraThing)}
                                                name={extraThing.name} />
                                            {extraThing.name} +{extraThing.price}€
                                        </label>
                                    ))}
                                </div>
                            )}

                            <button
                                onClick={handleAddToCartButtonClick}
                                className="primary sticky bottom-2"
                                type="button">
                                Ajouter au panier - Prix : {selectedPrice}€
                            </button>
                            <button className="mt-2" onClick={() => setShowPopup(false)}>
                                Annuler
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <MenuItemBox onAddToCart={handleAddToCartButtonClick} {...menuItem} />
            
        </>
    )
}