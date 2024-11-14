import { useEffect, useState } from "react";


const Inputes = ({DivHolder, errors, labelFiled, LabelName, save, ErrorWord, placeHolder, Error, FNfiled, FieldName, VarLoad, PlaceFeild}) => {

    return (
        <div className={DivHolder}>
            <label className={labelFiled}>{LabelName}</label>
            <input className={ (save) ? (errors.includes(ErrorWord)) ? `${placeHolder} ${Error}` : `${placeHolder} border-white border-transparent ${FieldName == "EmailAddress" ? "pointer-events-none" : ""}`  : `pointer-events-none ${placeHolder} border-transparent` }
                onChange={(e) => {FNfiled(e, ErrorWord);}}
                type="text" name={FieldName} value={VarLoad || ""} placeholder={PlaceFeild}/>
        </div>
    )
}

export default Inputes;