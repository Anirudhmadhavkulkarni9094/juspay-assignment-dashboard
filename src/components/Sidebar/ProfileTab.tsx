import Image from 'next/image'
import React from 'react'
import Profile from "../assets/profile.png"
import { useTheme } from '@/context/ThemeContext';

function ProfileTab() {
    const { theme, resolvedTheme, toggleTheme, themeStyles } = useTheme();

  return (
    <div className={`flex items-center gap-3 ${themeStyles.background} ${themeStyles.text} p-4`}>
        <Image src={"/IconSet.png"} alt='profile' width={20} height={20}></Image>
        <h1>ByWind</h1>
    </div>
  )
}

export default ProfileTab