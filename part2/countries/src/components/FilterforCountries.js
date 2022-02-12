import React from "react";
import Countries from "./Countries"

const FilerforCountries = ( {onChange, countries} ) => {
    return (
        <>
            Find countries <input onChange={onChange} />
            <Countries countries={ countries} />
        </>
    )
}

export default FilerforCountries