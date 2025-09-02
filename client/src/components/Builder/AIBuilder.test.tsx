import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import AIBuilder from './AIBuilder'
import type { EditableProjectProps } from '../../types/project'
import React from 'react'
import { vi } from 'vitest'

// vi.mock('../../hooks/useBuilderPrompt', () => {
//   return {
//     default: () => ({
//       handleClickCategory: vi.fn(),
//       handleGenerateBaseDesign: vi.fn(),
//       handlePromptChange: vi.fn(),
//     }),
//   }
// })

const setBuilderState = vi.fn() as unknown as React.Dispatch<React.SetStateAction<EditableProjectProps>>

const baseBuilderState: EditableProjectProps = {
  category: 'DESIGN_GENERATOR',
  prompt: '',
  images: [],
  outputFormat: 'PNG',
  quality: 'LOW',
  size: 'AUTO',
  designTheme: 'MODERN',
  spaceType: 'LIVING_ROOM',
  n: 1,
}

describe('AIBuilder', () => {
  it('renders without crashing', () => {
    render(<AIBuilder isLoading={false} builderState={baseBuilderState} setBuilderState={setBuilderState} onHandleSubmit={setBuilderState} />)
  })
})
