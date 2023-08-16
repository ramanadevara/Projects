import "./style.css"

function App() {
  return (
    <>
      <header className='header'>
        <div className='logo'>
          <img src='logo.png' alt='message logo' />

          <h1>Today I learned</h1>
        </div>
        <button className='btn btn-large btn-fact'>Share a fact</button>
      </header>
      <FactsForm />
      <main className='main'>
        <Categories />
        <FactsList />
      </main>
    </>
  )
}

function FactsForm() {
  return <form className='fact-form'>FactsForm</form>
}

function Categories() {
  return <aside> Categories</aside>
}

function FactsList() {
  return <section>Facts List</section>
}
export default App
