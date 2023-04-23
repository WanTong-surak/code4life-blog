import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { IoMenu } from 'react-icons/io5/index.js'
import DropdownMenuItem from './DropdownMenuItem'

export default function DropdownMenu() {
  return (
    <Menu as="div" className="md:hidden relative inline-block text-left mx-4">
      <div>
        <Menu.Button className="inline-flex justify-center rounded-md border boder-zinc-400 dark:border-zinc-700 p-2 text-sm font-medium shadow-sm hover:bg-red-600 dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-gray-100 transition-all" aria-label='Menu'>
          <IoMenu className='h-5 w-5' />
        </Menu.Button>
      </div>
      <Transition as={Fragment} enter='transition ease-out duration-100' enterFrom='transform opacity-0 scale-95' enterTo='transform opacity-100 scale-100' leave='transition ease-in duration-75' leaveFrom='transform opacity-100 scale-100' leaveTo='transform opacity-0 scale-95'>
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md border border-zinc-400 dark:border-zinc-700 bg-orange-50 dark:bg-zinc-800 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none divide-zinc-400 dark:divide-zinc-700">
          <div className='py-1'>
            <DropdownMenuItem href="/posts">Posts</DropdownMenuItem>
            <DropdownMenuItem href="/works">Works</DropdownMenuItem>
            <DropdownMenuItem href="/about">About</DropdownMenuItem>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
