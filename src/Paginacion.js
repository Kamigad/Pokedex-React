import React from "react";

const Paginacion = (props) => {
    const {onLeftClick, onRightClick, page, totalPages} = props;
    const buttonLeft = "⬅️";
    const buttonRight = "➡️";

    return (
        <div className="Paginacion">
            <button className="Click-Left" onClick={onLeftClick}>
                <div className="img-click-left"><img src={buttonLeft} alt="button-left"></img></div>
            </button>
            <div>{page} de {totalPages}</div>
            <button className="Click-Right" onClick={onRightClick}>
                <div className="img-click-right"> <img src={buttonRight} alt="button-rigth"></img></div>
            </button>
        </div>
    )
}

export default Paginacion;