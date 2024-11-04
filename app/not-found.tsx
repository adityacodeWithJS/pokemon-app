import Link from "next/link"
const NotFound=()=>{
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-red-500">404</h1>
            <h2 className="mt-2 text-2xl">Page Not Found</h2>
            <Link href="/"> Home </Link>
        </div>
    )
}

export default NotFound
