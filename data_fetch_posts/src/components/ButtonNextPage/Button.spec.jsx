import {ButtonNextPage} from '.'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('<Button />', ()=>{
    it('should render the button with text "Load More Posts"', () => {
        render(<ButtonNextPage text="Load More Posts"/>)
        expect.assertions(1)
        const button = screen.getByRole('button', {name: /load more posts/i})
        expect(button).toBeInTheDocument()
    })
    it('should call a function on button click', () => {
        const fn = jest.fn()
        render(<ButtonNextPage text="Load More Posts" onClick={fn}/>)
        const button = screen.getByRole('button', {name: /load more posts/i})        
        userEvent.click(button)
        expect(fn).toHaveBeenCalledTimes(1)
    })
    it('should be disabled when disabled is true', () => {
        render(<ButtonNextPage text="Load More Posts" disabled={true}/>)
        const button = screen.getByRole('button', {name: /load more posts/i})
        expect(button).toBeDisabled()
    })
})