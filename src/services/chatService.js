const BASE_URL = 'https://tnea-ai-eng.onrender.com'

function getSessionId() {
  let id = localStorage.getItem('tnea_session_id')

  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem('tnea_session_id', id)
  }

  return id
}

async function handleApiError(response) {
  let body = {}

  try {
    body = await response.json()
  } catch {
    // Ignore invalid JSON responses
  }

  if (response.status === 429) {
    return new Error(
      "You're sending questions too fast — please wait a moment.",
    )
  }

  if (response.status === 422) {
    return new Error(
      body.detail?.[0]?.msg || 'Invalid request.',
    )
  }

  if (response.status === 504) {
    return new Error(
      'The request took too long. Please try a simpler question.',
    )
  }

  return new Error(
    body.message ||
      body.detail ||
      `Request failed (${response.status})`,
  )
}

// Real TN Colleges RAG API
export async function sendMessage(text) {
  const response = await fetch(`${BASE_URL}/query`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      session_id: getSessionId(),
      question: text,
      top_k: 5,
      filters: {},
    }),
  })

  if (!response.ok) {
    throw await handleApiError(response)
  }

  const data = await response.json()

  return {
    answer: data.answer,
    sources: data.sources || [],
    status: 'success',
  }
}