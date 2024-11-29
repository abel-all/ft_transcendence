import UserIcon from '../../../assets/imgs/defualtImg.jpg'
import Edit from '../../../assets/imgs/edit.svg'
import { useEffect, useState } from 'react'
import upload from '../../../assets/imgs/upload.svg'
import userbg from '../../../assets/imgs/userbg.png'
import axios from 'axios'
import Alert from '../../../components/Alert'



const CheckPath = (file) => {
  const Exarray = ['jpeg', 'jpg', 'png', 'gif']
  const extantion = file.split('.')
  if (!Exarray.includes(extantion[extantion.length - 1]))
  return Exarray.includes(extantion[extantion.length - 1])
}

function Badge({ SettingsData }) {
  const [save, setSave] = useState(false)
  const [badge, setBadge] = useState("BRONZE")
  const [image, setImage] = useState(null)
  const [imagefile, setimagefile] = useState(null)
  const [background, setBackground] = useState(null)
  const [backgroundfile, setbackgroundfile] = useState(null)
  const [showNotification, setShowNotification] = useState(false)
  const [NotificationAllert, setNotificationAllert] = useState({message:"", color:""})
  const { first_name, last_name, background_picture, picture } = SettingsData
  const ClassStyle =
    'flex flex-row lg:right-[-463px] xl:right-[-673px] 2xl:right-[-883px] md:relative md:top-[-220px] md:right-[-248px] bg-[#15262a] justify-center m-auto px-[10px] py-[6px] rounded-full border-[1px] border-solid border-[#626262]'

  function HandelSave(e) {
    e.preventDefault();
    if (save) {
      imagefile && handelUpload(imagefile, 'picture')
      backgroundfile && handelUpload(backgroundfile, 'background_picture')
    }
    setSave(!save)
  }

  const HandelImage = (event) => {
    const imagefile = event.target.files[0]

    if (imagefile && CheckPath(imagefile.name)) {
      const readimage = new FileReader()
      readimage.onloadend = () => {
        setImage(readimage.result)
        setimagefile(imagefile)
      }
      readimage.readAsDataURL(imagefile)
    }
  }

  useEffect(() => {
    setShowNotification(true);
    if (NotificationAllert.message) {
      const time = setTimeout(() => {
        setNotificationAllert((prevState) => {return {message:"", color:""}});
        setShowNotification(false);
        return clearTimeout(time);
      }, 3000)
    }
    }, [NotificationAllert]);

  const handelUpload = async (file, endPoint) => {
    if (file) {
      const formData = new FormData()

      formData.append(endPoint, file)
      try {
        const sendFile = await axios.post(
          `http://localhost:8800/api/profile/upload-${endPoint}/`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        const res = await sendFile.data
				setNotificationAllert(prev => {return {message:`Your ${endPoint} has been successfully uploaded.`, color:"green"}});
      } catch (Error) {
				setNotificationAllert(prev => {return {message:`An error occurred while uploading your ${endPoint}. Please try again later.`, color:"red"}});
      }
    }
  }

  const HandelBackground = (event) => {
    const backgroundfile = event.target.files[0]

    if (backgroundfile && CheckPath(backgroundfile.name)) {
      const readbackground = new FileReader()
      readbackground.onloadend = () => {
        setBackground(readbackground.result)
        setbackgroundfile(backgroundfile)
      }
      readbackground.readAsDataURL(backgroundfile)
    }
  }

  useEffect(() => {
    axios.get('http://localhost:8800/api/profile/data/')
      .then((response) => {
        setBadge(response.data.badge)
      })
      .catch((err) => {
      })
  }, [])

  return (
    <div>
      	{showNotification && NotificationAllert.message && <Alert message={NotificationAllert.message} color={NotificationAllert.color}/>}
      {!save && (
        <div className="flex relative justify-center top-[310px] md:justify-end z-10 h-0 md:top-6 md:right-6">
          <div className="Holder flex h-[40px] justify-end items-center w-[80px] bg-[#15262b] px-[10px] py-[6px] rounded-full border-[1px] border-solid border-[#626262]">
            <button
              onClick={HandelSave}
              className="px-[2px] font-[500] font-[Outfit] text-[#626262] md:text-white md:opacity-60"
            >
              Edit
            </button>
            <img className="px-[2px] size-[22px]" src={Edit} alt="" />
          </div>
        </div>
      )}
      {save && (
        <div className="flex relative justify-center top-[310px] md:justify-end z-10 h-0 md:top-6 md:right-6">
          <div className="Holder flex h-[40px] justify-center items-center w-[80px] bg-[#15262b] px-[10px] py-[6px] rounded-full border-[1px] border-solid border-[#626262]">
            <button
              onClick={HandelSave}
              className="px-[2px] font-[500] font-[Outfit] text-[#626262] md:text-white md:opacity-60"
            >
              Save
            </button>
          </div>
        </div>
      )}
      <div className=" relative">
        <img
          className="rounded-t-lg h-[182px] w-full"
          src={
            background == null
              ? background_picture
                ? `http://localhost:8888${background_picture}`
                : userbg
              : background
          }
          alt=""
        />
        <input
          type="file"
          id="changeBackground"
          onChange={HandelBackground}
          name="changeBackground"
          className="hidden absolute top-[-6px] left-[11px]"
        />
        <label
          className={
            (save ? 'flex flex-row' : 'hidden') +
            ' bg-white w-[190px] rounded-md absolute top-[10px] left-[11px] cursor-pointer'
          }
          htmlFor="changeBackground"
        >
          <img className="" src={upload} alt="" />
          <span className="text-[#000] p-[5px] font-Outfit">
            Uplaod Background
          </span>
        </label>
      </div>
      <div className="Badge relative md:static bg-[#15262A] h-[182px] md:h-[73px] w-full border-x-[1px] mb-[10px] border-b-[1px] border-[#626262] flex flex-col md:flex-row items-center">
        <img
          className=" rounded-full md:ml-[25px] w-[107.69px] h-[107.69px] top-[-57px] absolute md:relative "
          src={image == null ? (picture ? 
            `http://localhost:8888${picture}`
            : UserIcon) : image}
          alt=""
        ></img>
        <div className="relative">
          <input
            type="file"
            id="changeProfile"
            onChange={HandelImage}
            name="changeProfile"
            className="hidden absolute top-[-6px] left-[11px]"
          />
          <label
            className={
              (save ? 'flex flex-row' : 'hidden') +
              ' bg-white w-[100px] rounded-md absolute left-[60px] top-[-35px] md:top-[-71px] md:left-[11px] cursor-pointer'
            }
            htmlFor="changeProfile"
          >
            <img className="" src={upload} alt="" />
            <span className="text-[#000] p-[5px] font-Outfit">Uplaod</span>
          </label>
        </div>
        <div className="InfoHolder flex flex-col relative md:static top-[57px]">
          <span className="text-[25px] ml-[10px] font-normal text-[#d0d4d4] font-Outfit">
            {first_name} {last_name}
          </span>
          <div className="flex flex-row ml-[10px] justify-center md:justify-normal">
            <span className="trendup-icon-white"></span>
            <span className="Rank text-[12px] text-[#FFFFFF] text-center font-semibold font-Outfit">
              {' '}
              {badge}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Badge
