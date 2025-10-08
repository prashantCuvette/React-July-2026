
import Header from "./components/Header";
import { useAuth } from "./contexts/AuthContext";


const App = () => {

  
  const context = useAuth();


  console.log(context);
  return (
    <div>
      <Header />
    </div>
  )
}

export default App
