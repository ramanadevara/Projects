const fact_button = document.querySelector(".btn-fact")
const fact_form = document.querySelector(".fact-form")

fact_button.addEventListener("click", () => {
  if (fact_form.classList.contains("hidden")) {
    fact_form.classList.remove("hidden")
    fact_button.textContent = "Close"
  } else {
    fact_form.classList.add("hidden")
    fact_button.textContent = "Share a fact"
  }
})

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

facts_list = document.querySelector(".facts-list")

facts_list.innerHTML = ""

const createFacts = function (factsList) {
  const factsArray = factsList.map(
    (fact) =>
      `<li class="fact">
    <p>
      ${fact.text}

      <a
        class="source"
        href="${fact.source}"
        target="_blank"
        >(Source)</a
      >
    </p>
    <span class="tag" style="background-color: #3b82f6"
      >${fact.category}</span
    >
  </li>`
  )

  factsHtml = factsArray.join("")

  facts_list.insertAdjacentHTML("afterbegin", factsHtml)
}

createFacts(initialFacts)
