import { getFakeAnswer } from '../data/fakeResponses.js'

// This service handles chat responses.
// When the real API is ready, replace the fake response logic
// with a fetch call here without changing the UI components.

export async function sendMessage(question) {
  // Temporary fake API delay
  await new Promise((resolve) => setTimeout(resolve, 900))

  const response = getFakeAnswer(question)

  return response
}