function FilterComponet({label,selectedFilter,updateState}){

    

    return(
        <>
         <div className="filter" style={{display:'flex',gap:'1rem',direction:'inherit',alignItems:'center'}}>
                    <label>{`Filter by ${label}:`} </label>
        <select value={selectedFilter} onChange={(e) => {
            updateState(e.target.value)
        }}>
          <option value="All">All</option>
          <option value="Last 30 days">Last 30 days</option>
          <option value="Last 15 days">Last 15 days</option>
          <option value="1 week">1 week</option>
        </select>
        </div>
        </>
    )
}
export default FilterComponet;