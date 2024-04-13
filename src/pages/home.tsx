import { Link } from 'react-router-dom';
import { Footer } from '../components/footer';
import { Header } from '../components/header';


export function Home(){
    return(
      <>
      <Header />
      <div className="hero min-h-screen bg-base-200" style={{backgroundColor: '#32c3d36b'}}>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src='src\assets\fotoIntrodução.png' className="max-w-sm rounded-lg shadow-2xl" />
        <div>
          <h1 className="text-5xl font-bold">Box Office News!</h1>
          <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          <Link to="/login" className="btn btn-primary">login</Link>
        </div>
      </div>
    </div>
        <Footer />
      </>
    )
} 
