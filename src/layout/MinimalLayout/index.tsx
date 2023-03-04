import { Outlet } from 'react-router-dom';
import MinimalHeader from './Header';
import MinimalFooter from './Footer';
// ==============================|| MINIMAL LAYOUT ||============================== //

const MinimalLayout = () => (
    <>
        <MinimalHeader />
            <Outlet />
        <MinimalFooter />
    </>
);

export default MinimalLayout;
