import { Outlet } from 'react-router-dom';

import { Navbar } from './navbar';
import { Sidebar } from './sidebar';

export function LayoutsPrivate() {
  return (
    <div className='overflow-hidden h-screen'>
      <Navbar>
        <Sidebar>
          <Outlet />
        </Sidebar>
      </Navbar>
    </div>
  );
}
