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

// Non-streaming /query endpoint
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

// Streaming /chat endpoint
export async function streamMessage(
  text,
  { onToken, onSources, onError, onDone },
) {
  try {
    const response = await fetch(`${BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        session_id: getSessionId(),
        question: text,
        top_k: 5,
      }),
    })

    if (!response.ok) {
      const error = await handleApiError(response)

      if (onError) {
        onError(error)
      }

      return
    }

    if (!response.body) {
      const error = new Error(
        'Streaming response is not available.',
      )

      if (onError) {
        onError(error)
      }

      return
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()

    let buffer = ''

    while (true) {
      const { value, done } = await reader.read()

      if (done) break

      buffer += decoder.decode(value, {
        stream: true,
      })

      const events = buffer.split('\n\n')
      buffer = events.pop() || ''

      for (const event of events) {
        const line = event
          .split('\n')
          .find((item) => item.startsWith('data: '))

        if (!line) continue

        const payload = line.slice(6).trim()

        if (payload === '[DONE]') {
          if (onDone) onDone()
          return
        }

        try {
          const data = JSON.parse(payload)

          if (data.token && onToken) {
            onToken(data.token)
          }

          if (data.sources && onSources) {
            onSources(data.sources)
          }

          if (data.error && onError) {
            onError(new Error(data.error))
          }
        } catch (error) {
          console.error(
            'Bad SSE payload:',
            payload,
            error,
          )
        }
      }
    }

    if (onDone) onDone()
  } catch (error) {
    if (onError) {
      onError(error)
    }
  }
}