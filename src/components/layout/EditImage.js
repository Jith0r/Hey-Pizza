import Image from 'next/image';
import toast from 'react-hot-toast';

//Composant pour upload image
export default function EditImage({ link, setLink }) {

    // Fonction qui change le fichier dans l'input de type file (ici l'image)
    async function handleFileChange(e) {
        // On grabb les fichiers via l'event
        const files = e.target.files;

        //Si on a un fichier on va procéder à l'upload
        if (files?.length === 1) {

            const data = new FormData;
            data.set('file', files[0])

            const uploadPromise = new Promise(async (resolve, reject) => {
            
                const response = await fetch('/api/upload', { //ENDPOINT
                    method: 'POST',
                    body: data,
                });

                if (response.ok) {
                    const link = await response.json(); //Lien de l'image upload (string)
                    setLink(link);
                    resolve() // On retourne resolve()
                } else {
                    reject()
                }
            });

            await toast.promise(uploadPromise, {
                loading: 'Téléchargement en cours...',
                success: 'Téléchargement avec succès !',
                error: 'Oops une erreur est survenue !'
           })

        }
    }

    return (
        <>
        {link && (
        <Image className='rounded-lg max-w-[120px] mb-1' src={link} width={100} height={100} alt={'avatar'} />
            )}
            
        {!link && (
                <div className='bg-gray-200 p-4 text-gray-500 rounded-lg mb-1 text-center'>
                    Pas d'image
                </div>
        )}
        
        <label>
            <input type="file" onChange={handleFileChange} className='hidden' />
            <span className='block border-gray-300 text-center cursor-pointer border rounded-lg p-2'>...</span>
        </label>
        </>
    )
}