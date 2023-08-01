import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useStateProvider } from "@/context/StateContext";
import Input from "@/components/common/Input";
import Avatar from "@/components/common/Avatar";
import axios from "axios";
import { ONBOARD_USER_ROUTE } from "@/utils/ApiRoutes";
import { useRouter } from "next/router";
function onboarding() {
  const router = useRouter();
  const[{userInfo, newUser}, dispatch]  = useStateProvider();
  const[name, setName] = useState(userInfo?.name || "");
  const[about, setAbout] = useState("");
  const[image, setImage] = useState("/default_avatar.png");

  useEffect(() => {
      if(!newUser  && !userInfo?.email) router.push("/login");
      else if(!newUser  && userInfo?.email) router.push("/");
  }, [newUser, userInfo, router])

  const onboardUserHandle = async() =>{
    if (validateDetails()) {
      const email = userInfo.email;
      try{
        const {data} = await axios.post(ONBOARD_USER_ROUTE, 
          {
            email,
            name, 
            about, 
            image
          }
          )
        if(data.status){
          dispatch({type: reducerCases.SET_NEW_USER, newUser: false})
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo:{
              id: data.user.id,
              name,
              email,
              profileImage : image,
              status: about,
            }
          });
          router.push("/");
          
        }

      }catch(err){
        console.log(err);
      }
    }
  }

  const validateDetails = () => {
    if (name.length < 3) {
      return false;
    };
    return true;
  }

  return (
    <div className="bg-panel-header-background h-screen w-screen text-white flex flex-col items-center justify-center">
    <div className="flex items-center justify-center gap-2 text-white">
      <Image src="/whatsapp.gif" alt="whatsapp" width={300} height={300}></Image>
      <span className="text-7xl">Who talking chat</span>
    </div>
    <h2 className="text-2xl">Create your profile</h2>
    <div className="flex gap-6 mt-6">
      <div className="flex flex-col items-center justify-center mt-5 gap-6">
      <Input name="Display name" state={name} setState={setName} label></Input>
      <Input name="About" state={about} setState={setAbout} label></Input>
      <div className="flex items-center justify-center">
        <button className="flex items-center justify-center gap-7
         bg-search-input-container-background p-5 rounded-lg first-letter"
         onClick={onboardUserHandle} >
          Create Profile
        </button>
      </div>
      </div>
      <div>
        <Avatar type="xl" image={image} setImage={setImage}></Avatar>
      </div>
    </div>
    </div>
  );
}

export default onboarding;
