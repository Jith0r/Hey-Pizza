export default function MenuItemBox({ onAddToCart, ...item }) {

    const { image, description, name, basePrice, sizes, extraIngredients } = item;

    return (

        <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
                <div className="text-center">
                    <img className="max-h-auto max-h-24 block mx-auto" src={image} alt="pizza" />
                </div>

                <h4 className="font-bold my-3 text-xl">{name}</h4>
                {/* line-clamp sert à couper les ligne du text en 4 ligne max */}
                <p className="text-gray-500 text-sm line-clamp-4">
                    {description}
                </p>
                <button type="button" onClick={onAddToCart} className="bg-primary mt-2 text-white rounded-full px-4 py-2">
                    {(sizes?.length > 0 || extraIngredients?.length > 0) ? (
                    <span>Ajouter au panier {basePrice}€</span>
                ) : (
                    <span>Ajouter au panier {basePrice}€</span>    
                    )}
                    
                </button>

        </div>
    )
}