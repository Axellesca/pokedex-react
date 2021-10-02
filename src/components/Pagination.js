import React from 'react'
import { LeftArrow, RightArrow } from './ArrowsSvg'

const Pagination = ({onLeftClick, onRightClick, page, totalPages}) => {
    return (
        <div className="pagination">
            <button onClick={onLeftClick} className="pagination-btn"><div className="icon"><LeftArrow/></div></button>
            <div>{page} de {totalPages}</div>
            <button onClick={onRightClick} className="pagination-btn"><div className="icon"><RightArrow/></div></button>
        </div>
    )
}

export default Pagination
