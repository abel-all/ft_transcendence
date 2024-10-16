import { useState } from 'react'
import Edit from '../../../assets/imgs/edit.svg'
import Inputes from './InputesComp'
import { twMerge } from 'tailwind-merge'
import axios from 'axios'

function AddressInformation({ SettingsData, className }) {
  const [save, setSave] = useState(false)
  const [errors, setErrors] = useState([])
  const { country, city, address, zip_code } = SettingsData
  const [Country, setCountry] = useState(country)
  const [City, setCity] = useState(city)
  const [Address, setAddress] = useState(address)
  const [Zip, setZip] = useState(zip_code)

  const placeHolder = `bg-transparent focus-visible:outline-0 border-b-[1px] pb-[5px] pl-[4px] placeholder:text-[#FFFFFF] placeholder:font-[400] placeholder:font-[Outfit] mt-[5px] mb-[20px]`
  const Error = `border-rose-600`
  const labelFiled = 'text-[#FFFFFF] opacity-60 my-[7px]'
  const DivHolder = 'FiledHolder flex flex-col'

  function HandelSave() {
    setSave(!save)
  }

  const handelErrors = (str) => {
    if (!errors.includes(str)) setErrors((prevErrors) => [...prevErrors, str])
  }

  const removeErrors = (str) => {
    if (errors.includes(str)) setErrors(errors.filter((item) => item !== str))
  }

  const FNfiled = (e, str) => {
    e.preventDefault()
    str == 'CN' && setCountry(e.target.value)
    str == 'CT' && setCity(e.target.value)
    str == 'AD' && setAddress(e.target.value)
    str == 'ZP' && setZip(e.target.value)
  }

  const HandelSubmet = (e) => {
    e.preventDefault()
    const NamesRegix = /^[a-zA-Z\s]+$/
    const ZipForma = /^[1-9]\d{1,14}$/

    if (!NamesRegix.test(Country)) handelErrors('CN')
    else {
      removeErrors('CN')
      if (!NamesRegix.test(City)) handelErrors('CT')
      else {
        removeErrors('CT')
        if (!NamesRegix.test(Address)) handelErrors('AD')
        else {
          removeErrors('AD')
          if (!ZipForma.test(Zip)) handelErrors('ZP')
          else {
            removeErrors('ZP')
            axios
              .post('https://fttran.tech/api/profile/edit/address/', {
                country: country != Country ? Country : 'None',
                city: city != City ? City : 'None',
                address: address != Address ? Address : 'None',
                Code: zip_code != Zip ? Zip : 'None',
              })
              .then((res) => {
                console.log(res)
              })
              .catch((err) => {
                console.log(err)
              })
            console.log('All Is Right Ready To Send ')
          }
        }
      }
    }
  }

  return (
    <div
      className={twMerge(
        'border-[#626262] bg-[#15262a] px-[25px] py-[40px] mb-[120px] border-[1px]',
        className
      )}
    >
      <form>
        <div className="flex flex-row justify-between">
          <div className="font-[600] font-[Outfit]">Address</div>
          {!save && (
            <div className="flex flex-row justify-end  px-[10px] py-[3px] rounded-full border-[1px] border-solid border-[#626262]">
              <button
                onClick={HandelSave}
                className="px-[2px] font-[500] font-[Outfit] text-[#626262]"
              >
                Edit
              </button>
              <img className="px-[2px]" src={Edit} alt="" />
            </div>
          )}

          {save && (
            <div className="flex flex-row justify-end  px-[10px] py-[3px] rounded-full border-[1px] border-solid border-[#e0dada]">
              <button
                onClick={HandelSubmet}
                className="px-[2px] font-[500] font-[Outfit] text-[#d3caca]"
              >
                Save
              </button>
            </div>
          )}
        </div>
        <div className="CountryCity flex md:justify-between md:flex-row flex-col">
          <Inputes
            DivHolder={DivHolder}
            errors={errors}
            labelFiled={labelFiled}
            LabelName="Country"
            save={save}
            ErrorWord="CN"
            placeHolder={placeHolder}
            Error={Error}
            FNfiled={FNfiled}
            FieldName="Country"
            VarLoad={Country}
            PlaceFeild={country}
          />
          <Inputes
            DivHolder={DivHolder}
            errors={errors}
            labelFiled={labelFiled}
            LabelName="City"
            save={save}
            ErrorWord="CT"
            placeHolder={placeHolder}
            Error={Error}
            FNfiled={FNfiled}
            FieldName="City"
            VarLoad={City}
            PlaceFeild={city}
          />
        </div>
        <div className="AddressZip flex md:justify-between md:flex-row flex-col">
          <Inputes
            DivHolder={DivHolder}
            errors={errors}
            labelFiled={labelFiled}
            LabelName="Address"
            save={save}
            ErrorWord="AD"
            placeHolder={placeHolder}
            Error={Error}
            FNfiled={FNfiled}
            FieldName="Address"
            VarLoad={Address}
            PlaceFeild={address}
          />
          <Inputes
            DivHolder={DivHolder}
            errors={errors}
            labelFiled={labelFiled}
            LabelName="Zip code"
            save={save}
            ErrorWord="ZP"
            placeHolder={placeHolder}
            Error={Error}
            FNfiled={FNfiled}
            FieldName="Zip code"
            VarLoad={Zip}
            PlaceFeild={zip_code}
          />
        </div>
      </form>
    </div>
  )
}

export default AddressInformation
