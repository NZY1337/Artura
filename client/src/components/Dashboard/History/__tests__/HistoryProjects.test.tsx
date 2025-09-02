import React from 'react'
import { render, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { vi } from 'vitest'
import HistoryProjects from '../HistoryProjects'
import { DashboardContext } from '../../context/dashboardContext'

// Restore the real react-query module for this integration test (overrides global test mock)
vi.mock('@tanstack/react-query', async (importOriginal) => {
  const actual = await importOriginal()
  return actual
})

vi.mock('../../../../services/builder', () => ({
  getProjects: vi.fn().mockResolvedValue({ projects: [{ id: 'p1', prompt: 'hello', images: [{ url: 'https://example.com/img1.png' }] }] })
}))

describe('HistoryProjects component', () => {
  it('renders projects from useProjects', async () => {
    const queryClient = new QueryClient()
    const dashboardValue: React.ContextType<typeof DashboardContext> = {
      value: '',
      project: null,
      grid: Array(6).fill(null),
      setValue: vi.fn(),
      setGrid: vi.fn(),
      setProject: vi.fn(),
    }

    const { getByAltText } = render(
      <QueryClientProvider client={queryClient}>
        <DashboardContext.Provider value={dashboardValue}>
          <HistoryProjects />
        </DashboardContext.Provider>
      </QueryClientProvider>
    )

    await waitFor(() => {
      expect(getByAltText('Pexels image 1')).toBeTruthy()
    })
  })
})
