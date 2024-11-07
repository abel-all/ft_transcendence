import { useEffect, useState } from 'react'
import Edit from '../../../assets/imgs/edit.svg'
import Inputes from './InputesComp'
import axios from 'axios'

function PersonalInformation({ SettingsData, className }) {
  const [save, setSave] = useState(false)
  const [errors, setErrors] = useState([])
  const { first_name, last_name, email } = SettingsData
  const [Firstname, setFirstname] = useState(first_name)
  const [Lastname, setLastname] = useState(last_name)
  const [Email, setEmail] = useState(email)

  function HandelSave() {
    setSave(!save)
  }

  const handelErrors = (str) => {
    if (!errors.includes(str)) {
      setErrors((prevErrors) => [...prevErrors, str])
    }
  }

  const removeErrors = (str) => {
    if (errors.includes(str)) setErrors(errors.filter((item) => item !== str))
  }

  const FNfiled = (e, str) => {
    e.preventDefault()
    str == 'FN' && setFirstname(e.target.value)
    str == 'LN' && setLastname(e.target.value)
    str == 'EM' && setEmail(e.target.value)
  }

  const HandelSubmet = (e) => {
    e.preventDefault()
    const NamesRegix = /^[a-zA-Z-]{2,16}$/
    const EmailRegix = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!NamesRegix.test(Firstname)) handelErrors('FN')
    else {
      removeErrors('FN')
      if (!NamesRegix.test(Lastname)) handelErrors('LN')
      else {
        removeErrors('LN')
        if (!EmailRegix.test(Email)) handelErrors('EM')
        else {
          removeErrors('EM')
          axios
            .post('http://localhost:8800/api/profile/edit/personal-data/', {
              firstName: first_name != Firstname ? Firstname : 'None',
              lastName: last_name != Lastname ? Lastname : 'None',
            })
            .then((res) => {
              console.log(res)
            })
            .catch((err) => {
              console.log(err)
            })
        }
      }
    }
  }

  const placeHolder = `bg-transparent focus-visible:outline-0 border-b-[1px] pb-[5px] pl-[4px] placeholder:text-[#FFFFFF] placeholder:font-[400] placeholder:font-[Outfit] mt-[5px] mb-[20px]`
  const Error = `border-rose-600`
  const labelFiled = 'text-[#FFFFFF] opacity-60 my-[7px]'
  const DivHolder = 'FiledHolder flex flex-col'

  return (
    <div
      className={
        'border-[#626262] bg-[#15262a] px-[25px] py-[40px] mb-[10px] border-[1px]' +
        (className.className ? ` ${className.className}` : '')
      }
    >
      <form action="" method="POST">
        <div className="flex flex-row justify-between">
          <div className="font-[600] font-[Outfit]">Personal Information</div>
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
        <div className="FullnameHolder flex flex-col  md:justify-between md:flex-row">
          <Inputes
            DivHolder={DivHolder}
            errors={errors}
            labelFiled={labelFiled}
            LabelName="First Name"
            save={save}
            ErrorWord="FN"
            placeHolder={placeHolder}
            Error={Error}
            FNfiled={FNfiled}
            FieldName="FirstName"
            VarLoad={Firstname}
            PlaceFeild={first_name}
          />
          <Inputes
            DivHolder={DivHolder}
            errors={errors}
            labelFiled={labelFiled}
            LabelName="Last Name"
            save={save}
            ErrorWord="LN"
            placeHolder={placeHolder}
            Error={Error}
            FNfiled={FNfiled}
            FieldName="LastName"
            VarLoad={Lastname}
            PlaceFeild={last_name}
          />
        </div>
        <div className="ContacInfo flex flex-col md:justify-between md:flex-row">
          <Inputes
            DivHolder={DivHolder}
            errors={errors}
            labelFiled={labelFiled}
            LabelName="Email Address"
            save={save}
            ErrorWord="EM"
            placeHolder={placeHolder}
            Error={Error}
            FNfiled={FNfiled}
            FieldName="EmailAddress"
            VarLoad={Email}
            PlaceFeild={email}
          />
        </div>
      </form>
    </div>
  )
}

export default PersonalInformation
