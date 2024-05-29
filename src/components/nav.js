import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import FullLogo from '../../public/_assets/images/FullLogo.png';
import NotificationIcon from '../../public/_assets/icons/notification-all.svg';
import MenuIcon from '../../public/_assets/icons/Menu.svg';
import CloseIcon from '../../public/_assets/icons/close-x.svg';
import { usePathname } from 'next/navigation';
import { menu } from '../_constants/enum.constants';
import dynamic from 'next/dynamic';

const LetteredAvatar = dynamic(() => import('lettered-avatar'), { ssr: false });

const Navbar = () => {
  const pathname = usePathname();
  const name = "Michael";
  const [isClick, setIsClick] = useState(false);

  const toggleNavbar = () => {
    setIsClick(!isClick);
  };

  const renderMenuItems = () => {
    return menu.map((item) => {
      const isActive = pathname?.startsWith(item.link);
      return (
        <Link key={item.val} href={item.link} onClick={() => setIsClick(false)} className={isActive ? "font-bold text-[#34A853]" : "text-[#808080] font-extralight hover:text-[#34A853]"}>
          <li className="menu-item mx-4 py-4">{item.label}</li>
        </Link>
      );
    });
  };

  return (
    <nav className="bg-[#F1E9DB]">
      <div className="max-w-7xl mx-auto py-1 md:py-4">
        <div className="flex items-center justify-between mx-10 h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/home" className="text-white">
                <Image src={FullLogo} alt="..." width={100} className="img-width" height={100} />
              </Link>
            </div>
            <div className="-mx-1 md:mx-3 relative top-right">
              <NotificationIcon className="scale-75 md:scale-100" />
              <div className="scale-75 md:scale-100 text-xs bg-[#ff4d4f] text-[#fff] alarm_circle flex items-center justify-center rounded-full absolute top-1 md:top-0 -right-1 md:-right-2">
                <p>0</p>
              </div>
            </div>
          </div>
          <div className="flex items-center hidden md:block">
            <div className="flex-shrink-0">
              <ul className="flex items-center">{renderMenuItems()}</ul>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center ">
                <div className="hidden md:block">
                  <p className="text-[#11270B] font-semibold">Hi {name}!</p>
                </div>
                <div className="-mx-2 md:mx-5 scale-50 md:scale-100">
                  <LetteredAvatar
                    name={name}
                    className=""
                    options={{
                      size: 45,
                      font: 5,
                      twoLetter: false,
                      bgColor: '#34A853',
                      imgClass: 'img-fluid',
                    }}
                  />
                </div>
                <div className="relative top-right hidden md:block cursor-pointer">
                  <MenuIcon />
                  <div className=" border border-#F1E9DB rounde-full text-xs bg-[#11270B] notify_circle flex items-center justify-center rounded-full absolute top-0 -right-0"></div>
                </div>
                <div className="top-right md:hidden" onClick={toggleNavbar}>
                  {isClick ? (
                    <CloseIcon className="scale-75 md:scale-100 cursor-pointer" />
                  ) : (
                    <MenuIcon className="scale-50 md:scale-100 cursor-pointer" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isClick && (
        <div className="block md:hidden mx-5">
          <div>
            <ul className="items-center">{renderMenuItems()}</ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
