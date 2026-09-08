// Hardcoded fake answers for Day 4/Day 7.
// Later, the real API will replace this fake data.

export const FAKE_RESPONSES = [
  {
    question: 'Which colleges in Chennai offer Computer Science Engineering?',
    answer:
      'Anna University, SSN College of Engineering, and 6 other colleges in Chennai offer CSE, across autonomous and private institutions.',
      status: 'success',
    sources: [
      {
        name: 'Anna University',
        detail: 'College and course information',
      },
      {
        name: 'Tamil Nadu Engineering College Dataset',
        detail: 'District and course records',
      },
    ],
  },
  {
    question: 'List all autonomous colleges in Coimbatore with NAAC A grade',
    answer:
      'PSG College of Technology and Coimbatore Institute of Technology are among the autonomous colleges in Coimbatore holding a NAAC A grade.',
      status: 'success',
    sources: [
      {
        name: 'NAAC',
        detail: 'Accreditation information',
      },
      {
        name: 'Tamil Nadu Engineering College Dataset',
        detail: 'College type and district records',
      },
    ],
  },
  {
    question: 'What is the total intake for NIT Trichy across all branches?',
    answer:
      'NIT Trichy has a total sanctioned intake of roughly 900 seats per year across all undergraduate branches.',
      status: 'success',
    sources: [
      {
        name: 'NIT Trichy',
        detail: 'Undergraduate intake information',
      },
    ],
  },
  {
    question: 'How many government colleges are there in the Madurai district?',
    answer:
      'There are 3 government engineering colleges in the Madurai district.',
      status: 'success',
    sources: [
      {
        name: 'Tamil Nadu Engineering College Dataset',
        detail: 'District and college type records',
      },
    ],
  },
]

const FALLBACK_RESPONSE = {
  status: 'no-results',
  answer:
    'No matching results were found in the current sample dataset. Try another college, district, or course.',
  sources: [],
}

// Returns the complete response object.
// This structure matches how a real API response can be handled later.
export function getFakeAnswer(question) {
  const normalized = question.trim().toLowerCase()

  const match = FAKE_RESPONSES.find(
    (response) =>
      response.question.trim().toLowerCase() === normalized,
  )

  return match
  ? {
      status: match.status,
      answer: match.answer,
      sources: match.sources,
    }
  : FALLBACK_RESPONSE
}