import './styles.css'

export const SearchInput = ({searchValue, handleChange}) => {
    return(
      <div className='search-container'>
        <input type='search' onChange={handleChange} value={searchValue} placeholder="Search"/>

        {!!searchValue && (
          <p>Search value: {searchValue}</p>
        )}
      </div>

    )
}