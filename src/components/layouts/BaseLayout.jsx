import Header from '../shared/Header';
import { ToastContainer } from 'react-toastify';

const BaseLayout = props => {
    const { children } = props;
    return (
        <div className="layout-container">
            <Header />
            <main>
                <div style={{ marginLeft: '50px', marginTop: '20px' }}>
                    {children}
                </div>
            </main>
            <ToastContainer />
        </div>
    )
}

export default BaseLayout;