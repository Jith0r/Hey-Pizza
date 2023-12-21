export default function InfoBox({children}) {
    return (
        <h2 className='text-center bg-blue-100 p-4 rounded-lg mb-2 border border-blue-300'>
            {children}
        </h2>
    )
}