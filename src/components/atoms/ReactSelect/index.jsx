import React from 'react'
import Select from "react-select";
import "./style.scss";
const ReactSelect = ({
    isMulti,
    isSearchable,
    value,
    onChange,
    placeholder,
    options,
    className,
    classNamePrefix,
    defaultValue,
    isDisabled=false,
    reactSelectref,
    ...rest
}) => {
  return (
    <>
        <Select
            ref={reactSelectref}
            controlShouldRenderValue={true}
            isMulti = {isMulti}
            isDisabled={isDisabled}
            isSearchable={isSearchable}
            value={value}
            onChange={onChange}
            options={options}
            placeholder={placeholder}
            defaultValue={defaultValue}
            className={`${className || "react-select-container"}`}
            classNamePrefix={`${classNamePrefix || "react-select"}`}
            // menuIsOpen={true}
            {...rest}
        />
    </>
  )
}

export default ReactSelect