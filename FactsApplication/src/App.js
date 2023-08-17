import "./style.css"

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
]

const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
]

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
  const catList = []

  initialFacts.forEach((initialFact) => {
    catList.push(initialFact.category)
  })

  const catSet = new Set(catList)

  const catUniqueList = [...catSet]

  return (
    <aside>
      <ul>
        <li className='category'>
          <button className='btn btn-category btn-all-categories'>All</button>
        </li>
        {catUniqueList.map((cat) => (
          <Category category={cat} />
        ))}
      </ul>
    </aside>
  )
}

function Category({ category }) {
  return (
    <li className='category'>
      <button
        className='btn btn-category'
        style={{
          "background-color": CATEGORIES.find(
            (cat) => cat.name.toLowerCase() === category.toLowerCase()
          ).color,
        }}
      >
        {category}
      </button>
    </li>
  )
}
function FactsList() {
  const facts = initialFacts

  return (
    <section>
      <ul className='facts-list'>
        {facts.map((fact) => (
          <Fact fact={fact} />
        ))}
      </ul>
    </section>
  )
}

function Fact({ fact }) {
  return (
    <li className='fact'>
      <p>
        {fact.text}
        <a className='source' href={fact.source} target='_blank'>
          (Source)
        </a>
      </p>
      <span
        className='tag'
        style={{
          "background-color": CATEGORIES.find(
            (cat) => cat.name.toLowerCase() === fact.category.toLowerCase()
          ).color,
        }}
      >
        {fact.category}
      </span>
      <div className='vote-buttons'>
        <button>
          👍 <strong>{fact.votesInteresting}</strong>
        </button>
        <button>
          🤯 <strong>{fact.votesMindblowing}</strong>
        </button>
        <button>
          ⛔️ <strong>{fact.votesFalse}</strong>
        </button>
      </div>
    </li>
  )
}
export default App
