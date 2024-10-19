import { useQuery } from "@tanstack/react-query"


function DashboardPage() {

    const fetchProducts = async () => {
        const response = await fetch('http://localhost:3000/products')
        return response.json()
    }
    const {isPending , error , data} = useQuery({
        queryKey: ["products"],
        queryFn : fetchProducts
    })
    
    if (isPending) return <div>Loading...</div>

    if (error) return 'An error has occurred: ' + error.message

    console.log(data)
  return (
    <div>Dashboard</div>
  )
}

export default DashboardPage