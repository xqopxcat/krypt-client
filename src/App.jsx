import { 
    Navigationbar, 
    Welcome, 
    Footer, 
    Services, 
    Transactions
} from './components';

const App = () => {
  return (
    <div className="min-h-screen">
        <div className="gradient-bg-welcome">
            <Navigationbar />
            <Welcome />
        </div>
        <Services />
        <Transactions />
        <Footer />
    </div>
  )
}

export default App
