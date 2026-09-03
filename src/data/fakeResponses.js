// Hardcoded fake answers for Day 4 — matched against the sample questions
// from the kickoff deck. Week 3 replaces this whole file with a real
// fetch/axios call to the RAG API.

export const FAKE_RESPONSES = [
  {
    question: 'Which colleges in Chennai offer Computer Science Engineering?',
    answer:
      'Anna University, SSN College of Engineering, and 6 other colleges in Chennai offer CSE, across autonomous and private institutions.',
  },
  {
    question: 'List all autonomous colleges in Coimbatore with NAAC A grade',
    answer:
      'PSG College of Technology and Coimbatore Institute of Technology are among the autonomous colleges in Coimbatore holding a NAAC A grade.',
  },
  {
    question: 'What is the total intake for NIT Trichy across all branches?',
    answer:
      'NIT Trichy has a total sanctioned intake of roughly 900 seats per year across all undergraduate branches.',
  },
  {
    question: 'How many government colleges are there in the Madurai district?',
    answer:
      'There are 3 government engineering colleges in the Madurai district.',
  },
]

const FALLBACK_ANSWER =
  "That's outside the sample dataset for now — once the real RAG API is connected in Week 3, this will search the full college dataset."

// Simple normalize + exact-match lookup. Good enough for Day 4 fake data;
// Week 3 sends the real question straight to the API instead.
export function getFakeAnswer(question) {
  const normalized = question.trim().toLowerCase()
  const match = FAKE_RESPONSES.find(
    (r) => r.question.trim().toLowerCase() === normalized,
  )
  return match ? match.answer : FALLBACK_ANSWER
}
