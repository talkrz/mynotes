import React, { PropTypes } from 'react'

const BoardList = ({ boards }) => (
    <div>
        {boards.map((board, key) => (
            <p key={key}>{board.name}</p>
        ))}
    </div>
)

BoardList.propTypes = {
    boards: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired
        })
    )
}

export default BoardList
