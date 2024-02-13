import React from "react";
import Button from "../buttons/button";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import useLogOut from "../../auth/useLogout";
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Navbar() {
  const [isActive, setIsActive] = React.useState<boolean>(true);

  const { isLogged, user } = useContext(UserContext);
  const { logout } = useLogOut();


  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <nav className="bg-bgSecondary flex items-center justify-between p-3 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5 text-textWhite">
              <Link to="/"> <h2 className="text-xl">Filmazia</h2></Link>

            </a>
          </div>
          <div className="flex lg:hidden" onClick={() => setIsActive(true)}>
            <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-textWhite">
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {!isLogged ? <>
              <Link to="/login">
                <Button text="LogIn" />
              </Link>
              <Link to="/signup">
                <Button text="SignUp" />
              </Link>
            </>
              :
              <>
                <div className="flex items-center">
                  <p className="inline-flex items-center mr-3 text-sm text-textWhite dark:text-white font-semibold">
                    <div className='flex items-center'>
                      <FontAwesomeIcon
                        icon={faUser}
                        className="mr-2 w-4 h-4 rounded-full bg-textIndigo p-2"
                        height={12}
                        color='black'
                      /> {user?.name}
                    </div>
                  </p>
                </div>
                <Button text="LogOut" onClick={logout} />
              </>}

          </div>
        </nav>

        {isActive &&
          <div className="lg:hidden" role="dialog" >
            <div className="fixed inset-0 z-2147483647"></div>
            <div className="fixed inset-y-0 right-0 z-2147483647 bg-bgPrimary w-full overflow-y-auto bg-navbar px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">Your Company</span>
                  <h2>Fimalzia</h2>
                </a>
                <button type="button" className="-m-2.5 rounded-md p-2.5 text-textWhite" onClick={() => setIsActive(false)}>
                  <span className="sr-only">Close menu</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                  </div>
                  <div className="py-6">
                  {!isLogged ? <>
                    <Link to="/login"><a href="#" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-textWhite hover:bg-gray-50">Log in</a> </Link>
                    <Link to="/signup"><a href="#" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-textWhite hover:bg-gray-50">Sign Up</a></Link>
                  </>: <>
                  <a onClick={logout} href="#" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-textWhite hover:bg-gray-50">{user?.name}</a>
                  <a onClick={logout} href="#" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-textWhite hover:bg-gray-50">Log Out</a>
                  </>}
                   
                  </div>
                </div>
              </div>
            </div>
          </div>}
      </header>
    </>
  )
}

export default Navbar


