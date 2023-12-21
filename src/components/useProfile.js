import { useEffect, useState } from "react";

//Hooks personaliser pour savoir si on est admin ou non

export function useProfile() {

    const [data, setData] = useState(false)
    const [loading, setLoading] = useState(true);

    // On fetch l'information du profil utilisateur pour savoir si il est admin ou non
    useEffect(() => {
        setLoading(true);
        fetch('/api/profile').then(response => {
            response.json().then(data => {
                setData(data)
                setLoading(false);
            })
        })
    }, [])

    return { loading, data };

}