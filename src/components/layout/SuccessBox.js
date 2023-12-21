export default function SuccessBox({children}) {
    return (
        <h2 className='text-center bg-green-100 p-4 rounded-lg mb-2 border border-green-300'>
            {children}
        </h2>
    )
}