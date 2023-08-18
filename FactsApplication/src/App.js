import { useEffect, useState } from "react"
import { message } from "statuses"
import "./style.css"
import supabase from "./supabase"

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
  const [formHidden, setFormState] = useState(true)
  const [factsList, setFactsList] = useState([])
  const [factPosted, setFactPosted] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(function () {
    async function getFacts() {
      setLoading(true)
      const { data: facts, error } = await supabase.from("facts").select("*")
      setFactsList(facts)
      setLoading(false)
    }

    getFacts()
  }, [])

  return (
    <>
      <Header
        formHidden={formHidden}
        setFormState={setFormState}
        setFactPosted={setFactPosted}
      />
      {factPosted ? (
        formHidden ? (
          <Message
            message='Your fact has been successfully posted'
            valid={true}
          />
        ) : null
      ) : null}

      {error ? (
        <Message
          message='Your fact could not be posted. Please enter all the fields properly'
          valid={false}
        />
      ) : null}
      {formHidden ? null : (
        <FactsForm
          factsList={factsList}
          setFactsList={setFactsList}
          setFormState={setFormState}
          setFactPosted={setFactPosted}
          setError={setError}
        />
      )}
      <main className='main'>
        <Categories />
        {loading ? <Loader /> : <FactsList factsList={factsList} />}
      </main>
    </>
  )
}

function Loader() {
  return <h1 className='loading'>Loading...</h1>
}
function Message({ message, valid }) {
  return (
    <div className='message-box'>
      {valid ? (
        <img className='message-logo' src='right.png' />
      ) : (
        <img className='message-logo' src='wrong.png' />
      )}

      <h3 className='message'>{message}</h3>
    </div>
  )
}

function Header({ formHidden, setFormState, setFactPosted }) {
  return (
    <header className='header'>
      <div className='logo'>
        <img src='logo.png' alt='message logo' />

        <h1>Today I learned</h1>
      </div>
      <button
        className='btn btn-large btn-fact'
        onClick={() => {
          setFormState((formhide) => !formhide)
          setFactPosted(false)
        }}
      >
        {formHidden ? "Share a fact" : "Close"}
      </button>
    </header>
  )
}

function FactsForm({
  factsList,
  setFactsList,
  setFormState,
  setFactPosted,
  setError,
}) {
  const [text, setText] = useState("")
  const [source, setSource] = useState("")
  const [category, setCategory] = useState("")

  const submitForm = (e) => {
    e.preventDefault()

    if (text && source.endsWith(".com") && category) {
      const newFact = {
        id: initialFacts.length,
        text: text,
        source: source,
        category: category,
        votesInteresting: 0,
        votesMindblowing: 0,
        votesFalse: 0,
        createdIn: 2015,
      }

      setFactsList((factsList) => [newFact, ...factsList])
      setText("")
      setSource("")
      setCategory("")
      setFormState(true)
      setFactPosted(true)
      setError(false)
      console.log("facts form list", factsList)
    } else {
      setError(true)
    }
  }
  return (
    <form class='fact-form' onSubmit={(e) => submitForm(e)}>
      <input
        type='text'
        placeholder='Share a fact with the world..'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <span>{200 - text.length}</span>
      <input
        type='text'
        placeholder='Trustworthy source..'
        value={source}
        onChange={(e) => setSource(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value=''>Choose a category</option>
        {CATEGORIES.map((category) => (
          <option value={category.name}>{category.name}</option>
        ))}
      </select>
      <button class='btn btn-large'>Post</button>
    </form>
  )
}

function Categories() {
  return (
    <aside>
      <ul>
        <li className='category'>
          <button className='btn btn-category btn-all-categories'>All</button>
        </li>
        {CATEGORIES.map((cat) => (
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
          backgroundColor: category.color,
        }}
      >
        {category.name}
      </button>
    </li>
  )
}
function FactsList({ factsList }) {
  return (
    <section>
      <ul className='facts-list'>
        {console.log("Final fact", factsList)}
        {factsList.map((fact) => (
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
          backgroundColor: CATEGORIES.find(
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
