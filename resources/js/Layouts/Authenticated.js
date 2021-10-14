import React, { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/inertia-react';

export default function Authenticated({ auth, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [isAdmin, SetIsAdmin] = useState(false);

    return (
        <div className="min-h-screen">
            <nav className="bg-black fixed w-full z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <Link href="/" className={"text-white"}>
                                    <div className={"text-lg font-bold"}>
                                        <span>Addv</span>
                                        <span className={"p-2 bg-indigo-600 text-white"}>Crowd</span>
                                    </div>
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <NavLink href={route('accueil')} active={route().current('accueil') || route().current('home')}>
                                    Accueil
                                </NavLink>
                                {
                                    auth.user &&
                                        <>
                                            <NavLink href={route('user.projet.index',auth.user.id)} active={route().current('user.projet.index')}>
                                                Mes projets
                                            </NavLink>
                                            <NavLink href={route('user.contribution.index',auth.user.id)} active={route().current('user.contribution.index')}>
                                                Mes contributions
                                            </NavLink>
                                            {
                                                auth?.admin &&
                                                <NavLink href={route('admin.projet.index',auth.user.id)} active={route().current('admin.projet.index')}>
                                                    Administration
                                                </NavLink>
                                            }
                                        </>
                                }
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                            <div className="ml-3 relative">
                                {auth.user?
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-indigo-600 text-sm leading-4 font-medium rounded-md text-white hover:text-gray-400 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {auth.user.name}

                                                <svg
                                                    className="ml-2 -mr-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link href={route('logout')} method="post" as="button">
                                                Deconnexion
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>:
                                    <>
                                        <Link href={route('login')} className="text-sm text-white">
                                            connexion
                                        </Link>

                                        <Link href={route('register')} className="ml-4 text-sm text-white">
                                            Inscription
                                        </Link>
                                    </>
                                }
                            </div>
                        </div>

                        <div className="-mr-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('accueil')} active={route().current('accueil')||route().current('home')}>
                            Accueil
                        </ResponsiveNavLink>
                        {auth.user &&
                            <>
                                <ResponsiveNavLink href={route('user.projet.index',[auth.user.id])} active={route().current('projet.index')}>
                                    Mes projets
                                </ResponsiveNavLink>
                                <ResponsiveNavLink href={route('user.contribution.index',auth.user.id)} active={route().current('user.contribution.index')}>
                                    Mes contributions
                                </ResponsiveNavLink>
                            </>
                        }
                    </div>
                    {auth.user ?
                        <div className="pt-4 pb-1 border-t border-gray-200">
                            <div className="px-4">
                                <div className="font-medium text-base text-white">{auth.user.name}</div>
                                <div className="font-medium text-sm text-white">{auth.user.email}</div>
                            </div>

                            <div className="mt-3 space-y-1 z-20">
                                <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                    Deconnexion
                                </ResponsiveNavLink>
                            </div>
                        </div>:
                        <div className={"z-20"}>
                            <ResponsiveNavLink href={route('login')} as="button">
                                Connexion
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route('register')} as="button">
                                Inscription
                            </ResponsiveNavLink>
                        </div>
                    }
                </div>
            </nav>
            <div style={{paddingTop:64}}>{children}</div>
        </div>
    );
}
