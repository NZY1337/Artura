import { render, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { vi } from 'vitest'

// Restore the real react-query module for this integration test (overrides global test mock)
vi.mock('@tanstack/react-query', async (importOriginal) => {
  const actual = await importOriginal()
  return actual
})

import LatestProjects from '../LatestProjects'

vi.mock('../../../../services/builder', () => ({
  getProjects: vi.fn().mockResolvedValue({ projects: [{ id: 'p1', prompt: 'hello', images: [{ url: 'https://example.com/img1.png' }] }] })
}))

describe('LatestProjects component', () => {
  it('renders latest projects carousel', async () => {
    const queryClient = new QueryClient()

  const { getAllByAltText } = render(
      <QueryClientProvider client={queryClient}>
        <LatestProjects />
      </QueryClientProvider>
    )
  await waitFor(() => expect(getAllByAltText('Interior 1').length).toBeGreaterThan(0))
  })
})
