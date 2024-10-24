import { useState } from 'react'

function Pagination() {
    const [page ,  setPage]= useState(1)
  return (
    <div>
        <button>previous</button>
        <p>{page}</p>
        <button>next</button>
    </div>
  )
}

export default Pagination