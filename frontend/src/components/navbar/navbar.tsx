import React from "react";
import Button from "../buttons/button";
import { Link } from "react-router-dom";

function Navbar() {
  const [isActive, setIsActive] = React.useState<boolean>(true);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <nav className="bg-bgSecondary flex items-center justify-between p-3 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5 text-textWhite">
              <Link to="/"> <h2 className="text-xl">Filmalzia</h2></Link>
              
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
            {/* <a href="#" className="text-sm font-semibold leading-6 text-textWhite">Home</a> */}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {/* <a href="#" className="text-sm font-semibold leading-6 text-textWhite">Log in <span aria-hidden="true">&rarr;</span></a> */}
            <Link to="/login">
              <Button text="LogIn" />
            </Link>
            <Link to="/signup">
              <Button text="SignUp" />
            </Link>
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
                    {/* <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-textWhite hover:bg-gray-50">Home</a> */}

                  </div>
                  <div className="py-6">
                    <a href="#" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-textWhite hover:bg-gray-50">Log in</a>
                    <a href="#" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-textWhite hover:bg-gray-50">Sign Up</a>
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


