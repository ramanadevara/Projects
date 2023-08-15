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
