import { useEffect, useState } from "react";


const Inputes = ({DivHolder, errors, labelFiled, LabelName, save, ErrorWord, placeHolder, Error, FNfiled, FieldName, VarLoad, PlaceFeild}) => {

    const [value, setValue] = useState(VarLoad);

    return (
        <div className={DivHolder}>
            <label className={labelFiled}>{LabelName}</label>
            <input className={ (save) ? (errors.includes(ErrorWord)) ? `${placeHolder} ${Error}` : `${placeHolder} border-white border-transparent`  : `pointer-events-none ${placeHolder} border-transparent` }
                onChange={(e) => {FNfiled(e, ErrorWord); setValue(e.target.value)}}
                type="text" name={FieldName} value={value} placeholder={PlaceFeild}/>
        </div>
    )
}

export default Inputes;