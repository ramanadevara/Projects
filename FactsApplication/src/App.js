import "./style.css"

function App() {
  return (
    <header className='header'>
      <div className='logo'>
        <img src='logo.png' alt='message logo' />

        <h1>Today I learned</h1>
      </div>
      <button className='btn btn-large btn-fact'>Share a fact</button>
    </header>
  )
}

export default App
