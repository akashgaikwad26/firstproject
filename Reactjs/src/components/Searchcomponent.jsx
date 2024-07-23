import { useEffect, useState } from "react";

function SearchComponent({data,updateState}){
    console.log("data",data)
  const [searchQuery,setSearchQuery]=useState('');

  useEffect(() => {
    if (Array.isArray(data)) {
      const sortedData = data.filter((item) => {
        const itemValues = Object.values(item).map((value) =>
          String(value).toLowerCase()
        );
        return itemValues.some((value) => value.includes(searchQuery.toLowerCase()));
      });
    //   console.log("updatedata",sortedData)
      updateState(sortedData);
    }
  }, [searchQuery]);

    return(
        <>
         <div className="filter" style={{display:'flex',gap:'1rem',direction:'inherit',alignItems:'center'}}>
         <label>Search:</label>

           <input
                type="text"
              value={searchQuery}
              className='input'
            
            onChange={(e) => setSearchQuery(e.target.value)}
           />

          </div>
        </>
    )
}
export default SearchComponent;