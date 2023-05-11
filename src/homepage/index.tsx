import { useState,useEffect } from "react"
import { myFetch } from "../../utils/Myfetch"
import '../css/homepage.css'


interface Sales{
    date_sold:string;
    id:number;
    total_sales:number
}
interface User{
  username:string;
  email:string;
  image_file:string;
  sales:Sales[]
}

const HomePage = () => {
  const [users, setUsers] = useState([])

 useEffect(() =>{
  const getUsers =async () => {
    const response = await myFetch('https://stockify-store-management.vercel.app/users')
    const data = await response.json()
    console.log(data.users)
    setUsers(data.users)
  }
  getUsers()
 },[])


  return (
    <div className="home_page">
      <section className="home_page_heading">
        welcome to the home page
      </section>
      <section className="home_page_body">
      {users?.map((user:User) =>{
        return(
          <div className="home_page_body_users">
          <div className="homepage_user_image">
            <img src={user.image_file} alt="user_images" style={{width:'100px',height:'100px'}}/>
          </div>
          <div className="homepage_user_sales">
            {user.sales.map((sale:Sales) =>{
              return(
                <div>
                  <p>{sale.total_sales}</p>
                </div>
              )
            })}
          </div>
        </div>
        )
      })}
      </section>
    </div>
  )
}

export default HomePage