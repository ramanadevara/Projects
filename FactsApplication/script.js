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
//Load facts from database

async function loadFacts() {
  const res = await fetch(
    "https://gxuodrypuqpxjsthcafq.supabase.co/rest/v1/facts",
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4dW9kcnlwdXFweGpzdGhjYWZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE5NzU4MjYsImV4cCI6MjAwNzU1MTgyNn0.bqflSDPylsGreZHQ5Hgdg0FF6RbZOSQO1PuXn2C-rWc",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4dW9kcnlwdXFweGpzdGhjYWZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE5NzU4MjYsImV4cCI6MjAwNzU1MTgyNn0.bqflSDPylsGreZHQ5Hgdg0FF6RbZOSQO1PuXn2C-rWc",
      },
    }
  )

  const data = await res.json()
  createFacts(data)
}

loadFacts()

//Selecting DOM elements
facts_list = document.querySelector(".facts-list")

facts_list.innerHTML = ""

const findColor = function (categoryName) {
  const category = CATEGORIES.find(
    (cat) => cat.name.toLowerCase() === categoryName.toLowerCase()
  )
  return category.color
}

//Creating DOM elements
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
    <span class="tag" style="background-color: ${findColor(fact.category)}"
      >${fact.category}</span
    >
  </li>`
  )

  factsHtml = factsArray.join("")

  facts_list.insertAdjacentHTML("afterbegin", factsHtml)
}
